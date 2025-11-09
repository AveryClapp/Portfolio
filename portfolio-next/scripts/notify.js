#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const https = require("https");
const http = require("http");

// Load environment variables from .env file
function loadEnvFile() {
  // Check if --prod flag is passed
  const isProd = process.argv.includes("--prod");
  const envFile = isProd ? ".env.production" : ".env.local";
  const envPath = path.join(process.cwd(), envFile);

  if (!fs.existsSync(envPath)) {
    console.error(`\n❌ Error: ${envFile} file not found`);
    console.log(`Make sure you have a ${envFile} file in the project root`);
    if (isProd) {
      console.log("\nTip: Create .env.production with your production settings");
    }
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const lines = envContent.split("\n");

  lines.forEach((line) => {
    // Skip comments and empty lines
    if (line.trim().startsWith("#") || !line.trim()) return;

    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim();
      process.env[key.trim()] = value;
    }
  });

  if (isProd) {
    console.log("📡 Using production environment\n");
  }
}

// Load env vars before anything else
loadEnvFile();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function makeRequest(url, data, followRedirects = true) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === "https:";
    const lib = isHttps ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };

    const req = lib.request(options, (res) => {
      // Handle redirects
      if (followRedirects && (res.statusCode === 307 || res.statusCode === 308)) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          console.log(`Following redirect to: ${redirectUrl}`);
          return makeRequest(redirectUrl, data, false)
            .then(resolve)
            .catch(reject);
        }
      }

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(body), headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, body, headers: res.headers });
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log("\n📧 Notify Blog Subscribers\n");

  const slug = await question("Blog post slug (e.g., my-post-name): ");
  const title = await question("Blog post title: ");
  const preview = await question("Preview text (optional, press enter to skip): ");

  const secret = process.env.NOTIFY_SECRET;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!secret) {
    console.error(
      "\n❌ Error: NOTIFY_SECRET not found in environment variables"
    );
    console.log("Make sure .env.local contains NOTIFY_SECRET");
    rl.close();
    process.exit(1);
  }

  console.log("\nSending notifications...");
  console.log(`Target: ${siteUrl}/api/notify-subscribers\n`);

  const payload = JSON.stringify({
    secret,
    slug,
    title,
    preview: preview || undefined,
  });

  try {
    const result = await makeRequest(`${siteUrl}/api/notify-subscribers`, payload);

    if (result.status === 200) {
      console.log(`\n✅ Success! ${result.body.message}`);
    } else if (result.status === 307 || result.status === 308) {
      console.error(`\n❌ Error: Redirect loop detected (Status: ${result.status})`);
      console.log("This usually means:");
      console.log("1. Your production site might need redeployment");
      console.log("2. Environment variables aren't set in Vercel");
      console.log("3. The API route might not be deployed yet");
      console.log("\nTry testing locally first with: npm run notify");
    } else {
      console.error(`\n❌ Error: ${result.body.error || result.body || "Failed to send"}`);
      console.log(`Status: ${result.status}`);
    }
  } catch (error) {
    console.error("\n❌ Request failed:", error.message);
  }

  rl.close();
}

main();
