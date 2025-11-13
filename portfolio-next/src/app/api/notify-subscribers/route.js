import { NextResponse } from "next/server";
import { Resend } from "resend";
import { kv } from "@vercel/kv";

const resend = new Resend(process.env.RESEND_API_KEY);
const SUBSCRIBERS_KEY = "blog:subscribers";

// Get subscribers from KV
const getSubscribers = async () => {
  try {
    const subscribers = await kv.get(SUBSCRIBERS_KEY);
    return subscribers || [];
  } catch (error) {
    console.error("Error reading subscribers from KV:", error);
    return [];
  }
};

export async function POST(request) {
  try {
    // Verify secret key to prevent unauthorized use
    const { secret, title, slug, preview } = await request.json();

    if (secret !== process.env.NOTIFY_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug" },
        { status: 400 }
      );
    }

    const subscribers = await getSubscribers();

    if (subscribers.length === 0) {
      return NextResponse.json(
        { message: "No subscribers to notify" },
        { status: 200 }
      );
    }

    // Send email to all subscribers
    const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog/${slug}`;

    const emailPromises = subscribers.map((email) =>
      resend.emails.send({
        from: "Avery Clapp <subscription@averyclapp.com>",
        to: email,
        subject: `New blog post: ${title}`,
        html: `
          <h2>${title}</h2>
          ${preview ? `<p>${preview}</p>` : ""}
          <p>
            <a href="${blogUrl}" style="color: #000; text-decoration: underline;">
              Read the full post →
            </a>
          </p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            You're receiving this because you subscribed to Avery's blog.<br/>
            Reply to this email to unsubscribe.
          </p>
        `,
      })
    );

    await Promise.all(emailPromises);

    return NextResponse.json(
      {
        message: `Successfully notified ${subscribers.length} subscribers`,
        count: subscribers.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Notify error:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
