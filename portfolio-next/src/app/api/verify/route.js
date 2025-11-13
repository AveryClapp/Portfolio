import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const SUBSCRIBERS_KEY = "blog:subscribers";
const PENDING_KEY = "blog:pending";

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

// Add verified subscriber and remove from pending
const verifySubscriber = async (token) => {
  try {
    const pending = await getPendingSubscribers();
    const pendingData = pending[token];

    if (!pendingData) {
      return { success: false, error: "Invalid or expired verification link" };
    }

    // Add to verified subscribers
    const subscribers = await getSubscribers();
    if (!subscribers.includes(pendingData.email)) {
      subscribers.push(pendingData.email);
      await kv.set(SUBSCRIBERS_KEY, subscribers);
    }

    // Remove from pending
    delete pending[token];
    await kv.set(PENDING_KEY, pending);

    return { success: true, email: pendingData.email };
  } catch (error) {
    console.error("Error verifying subscriber:", error);
    throw error;
  }
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Verification Error</title>
            <style>
              body {
                font-family: system-ui, sans-serif;
                max-width: 600px;
                margin: 100px auto;
                padding: 20px;
                text-align: center;
              }
              h1 { color: #ef4444; }
              p { color: #666; }
            </style>
          </head>
          <body>
            <h1>Invalid Link</h1>
            <p>This verification link is invalid.</p>
          </body>
        </html>
        `,
        {
          status: 400,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    const result = await verifySubscriber(token);

    if (!result.success) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Verification Error</title>
            <style>
              body {
                font-family: system-ui, sans-serif;
                max-width: 600px;
                margin: 100px auto;
                padding: 20px;
                text-align: center;
              }
              h1 { color: #ef4444; }
              p { color: #666; }
            </style>
          </head>
          <body>
            <h1>Verification Failed</h1>
            <p>${result.error}</p>
            <p style="margin-top: 30px;">
              <a href="/" style="color: #000; text-decoration: underline;">Return to site</a>
            </p>
          </body>
        </html>
        `,
        {
          status: 400,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Subscription Confirmed</title>
          <style>
            body {
              font-family: system-ui, sans-serif;
              max-width: 600px;
              margin: 100px auto;
              padding: 20px;
              text-align: center;
            }
            h1 { color: #171717; }
            p { color: #666; line-height: 1.6; }
            a {
              color: #000;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <h1>Subscription Confirmed</h1>
          <p>Thanks for verifying your email!</p>
          <p>You'll receive an email whenever a new blog post is published.</p>
          <p style="margin-top: 30px;">
            <a href="/">Return to site</a>
          </p>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { "Content-Type": "text/html" },
      }
    );
  } catch (error) {
    console.error("Verify error:", error);
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body {
              font-family: system-ui, sans-serif;
              max-width: 600px;
              margin: 100px auto;
              padding: 20px;
              text-align: center;
            }
            h1 { color: #ef4444; }
            p { color: #666; }
          </style>
        </head>
        <body>
          <h1>Something went wrong</h1>
          <p>Please try again later.</p>
          <p style="margin-top: 30px;">
            <a href="/" style="color: #000; text-decoration: underline;">Return to site</a>
          </p>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      }
    );
  }
}
