#!/usr/bin/env node
// Quick script to check subscribers in KV
// Run with: node scripts/check-subscribers.js
// Options:
//   --pending    Show only pending subscribers
//   --verified   Show only verified subscribers (default shows both)
require("dotenv").config({ path: ".env.local" });
const { kv } = require("@vercel/kv");

const args = process.argv.slice(2);
const showPending = args.includes("--pending");
const showVerified = args.includes("--verified");
const showBoth = !showPending && !showVerified;

async function checkSubscribers() {
  try {
    // Get verified subscribers
    const subscribers = await kv.get("blog:subscribers");
    const verifiedCount = subscribers?.length || 0;

    // Get pending subscribers
    const pending = await kv.get("blog:pending");
    const pendingCount = pending ? Object.keys(pending).length : 0;

    // Show verified subscribers
    if (showVerified || showBoth) {
      if (verifiedCount === 0) {
        console.log("\n📭 No verified subscribers yet\n");
      } else {
        console.log(`\n✅ Verified subscribers: ${verifiedCount}\n`);
        subscribers.forEach((email, index) => {
          console.log(`${index + 1}. ${email}`);
        });
        console.log("");
      }
    }

    // Show pending subscribers
    if (showPending || showBoth) {
      if (pendingCount === 0) {
        console.log("⏳ No pending verifications\n");
      } else {
        console.log(`⏳ Pending verifications: ${pendingCount}\n`);
        Object.entries(pending).forEach(([token, data], index) => {
          const createdDate = new Date(data.createdAt).toLocaleString();
          console.log(`${index + 1}. ${data.email}`);
          console.log(`   Created: ${createdDate}`);
          console.log(`   Token: ${token.substring(0, 12)}...`);
          console.log("");
        });
      }
    }

    // Summary
    if (showBoth) {
      console.log(`📊 Total: ${verifiedCount} verified, ${pendingCount} pending\n`);
    }
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.log("Make sure you have KV environment variables set up locally\n");
  }
  process.exit(0);
}

checkSubscribers();
