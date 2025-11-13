import { NextResponse } from "next/server";
import { Resend } from "resend";
import { kv } from "@vercel/kv";
import { randomBytes } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

// Vercel KV keys
const SUBSCRIBERS_KEY = "blog:subscribers";
const PENDING_KEY = "blog:pending";

// Generate verification token
const generateToken = () => {
  return randomBytes(32).toString("hex");
};

// Read subscribers from KV (verified only)
const getSubscribers = async () => {
  try {
    const subscribers = await kv.get(SUBSCRIBERS_KEY);
    return subscribers || [];
  } catch (error) {
    console.error("Error reading subscribers from KV:", error);
    return [];
  }
};

// Read pending subscribers from KV
const getPendingSubscribers = async () => {
  try {
    const pending = await kv.get(PENDING_KEY);
    return pending || {};
  } catch (error) {
    console.error("Error reading pending subscribers from KV:", error);
    return {};
  }
};

// Add subscriber to pending list with token
const addPendingSubscriber = async (email, token) => {
  try {
    const pending = await getPendingSubscribers();
    pending[token] = {
      email,
      createdAt: new Date().toISOString(),
    };
    await kv.set(PENDING_KEY, pending);
    return true;
  } catch (error) {
    console.error("Error adding pending subscriber to KV:", error);
    throw error;
  }
};

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Check if already verified
    const subscribers = await getSubscribers();
    if (subscribers.includes(email)) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 400 }
      );
    }

    // Check if already pending verification
    const pending = await getPendingSubscribers();
    const existingToken = Object.keys(pending).find(
      (token) => pending[token].email === email
    );
    if (existingToken) {
      return NextResponse.json(
        { error: "Verification email already sent. Please check your inbox." },
        { status: 400 }
      );
    }

    // Generate verification token
    const token = generateToken();
    await addPendingSubscriber(email, token);

    // Send verification email using Resend
    const verifyUrl = `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/api/verify?token=${token}`;

    try {
      const result = await resend.emails.send({
        from: "Avery Clapp <onboarding@resend.dev>",
        to: email,
        subject: "Verify your subscription to Avery's blog",
        html: `
          <p>Thanks for subscribing to my blog!</p>
          <p>Please verify your email address by clicking the link below:</p>
          <p>
            <a href="${verifyUrl}" style="color: #000; text-decoration: underline;">
              Verify email address →
            </a>
          </p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        `,
      });
      console.log("Email sent successfully:", result);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      console.error("Email error details:", {
        message: emailError.message,
        statusCode: emailError.statusCode,
        name: emailError.name,
      });
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Please check your email to verify your subscription" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
