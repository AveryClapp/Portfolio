import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory storage (you'll want to replace this with a database)
// For now, we'll store in a JSON file
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "data", "subscribers.json");

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(SUBSCRIBERS_FILE)) {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([]));
  }
};

// Read subscribers
const getSubscribers = () => {
  ensureDataDir();
  const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf8");
  return JSON.parse(data);
};

// Add subscriber
const addSubscriber = (email) => {
  const subscribers = getSubscribers();
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
    return true;
  }
  return false;
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
    const isNew = addSubscriber(email);
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
