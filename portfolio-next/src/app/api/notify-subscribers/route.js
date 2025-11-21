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

    // Send email to all subscribers in batches to respect Resend rate limits
    // Resend free tier: 2 emails/second, 100 emails/day
    const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/blog/${slug}`;
    const BATCH_SIZE = 2; // Resend free tier limit
    const DELAY_MS = 1000; // 1 second between batches

    let successCount = 0;
    let failureCount = 0;
    const errors = [];

    // Process subscribers in batches
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);

      console.log(`Sending batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(subscribers.length / BATCH_SIZE)} (${batch.length} emails)`);

      const batchPromises = batch.map((email) =>
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
        .then(() => {
          successCount++;
          return { success: true, email };
        })
        .catch((error) => {
          failureCount++;
          errors.push({ email, error: error.message });
          console.error(`Failed to send to ${email}:`, error.message);
          return { success: false, email, error: error.message };
        })
      );

      await Promise.all(batchPromises);

      // Wait before next batch (unless it's the last batch)
      if (i + BATCH_SIZE < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }
    }

    console.log(`Notification complete: ${successCount} succeeded, ${failureCount} failed`);

    return NextResponse.json(
      {
        message: `Notified ${successCount} of ${subscribers.length} subscribers`,
        successCount,
        failureCount,
        totalSubscribers: subscribers.length,
        errors: errors.length > 0 ? errors : undefined,
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
