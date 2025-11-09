import { NextResponse } from "next/server";
import { Resend } from "resend";
import { kv } from "@vercel/kv";

const resend = new Resend(process.env.RESEND_API_KEY);

// Vercel KV key for storing subscribers
const SUBSCRIBERS_KEY = "blog:subscribers";

// Read subscribers from KV
const getSubscribers = async () => {
  try {
    const subscribers = await kv.get(SUBSCRIBERS_KEY);
    return subscribers || [];
  } catch (error) {
    console.error("Error reading subscribers from KV:", error);
    return [];
  }
};

// Add subscriber to KV
const addSubscriber = async (email) => {
  try {
    const subscribers = await getSubscribers();
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      await kv.set(SUBSCRIBERS_KEY, subscribers);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error adding subscriber to KV:", error);
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

    // Check if already subscribed
    const isNew = await addSubscriber(email);
    if (!isNew) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 400 }
      );
    }

    // Send confirmation email using Resend
    try {
      await resend.emails.send({
        from: "Avery Clapp <onboarding@resend.dev>", // You'll update this with your domain
        to: email,
        subject: "Confirmed: You're subscribed to Avery's blog",
        html: `
          <p>Thanks for subscribing to my blog!</p>
          <p>You'll receive an email whenever I publish a new post.</p>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Don't want these emails? Reply to unsubscribe.
          </p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Still return success since they're subscribed
    }

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
