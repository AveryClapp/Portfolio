#!/usr/bin/env node
// Quick script to check subscribers in KV
// Run with: node scripts/check-subscribers.js

const { kv } = require("@vercel/kv");

async function checkSubscribers() {
  try {
    const subscribers = await kv.get("blog:subscribers");

    if (!subscribers || subscribers.length === 0) {
      console.log("\n📭 No subscribers yet\n");
    } else {
      console.log(`\n📧 Total subscribers: ${subscribers.length}\n`);
      subscribers.forEach((email, index) => {
        console.log(`${index + 1}. ${email}`);
      });
      console.log("");
    }
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.log("Make sure you have KV environment variables set up locally\n");
  }

  process.exit(0);
}

checkSubscribers();
