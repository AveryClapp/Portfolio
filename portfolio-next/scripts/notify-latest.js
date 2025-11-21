#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const https = require("https");
const http = require("http");

// Load environment variables from .env file
function loadEnvFile() {
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

function parseDate(dateString) {
  // Handle MM-DD-YYYY format
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return new Date(`${year}-${month}-${day}`);
  }
  // Fallback to standard date parsing
  return new Date(dateString);
}

function getLatestBlogPost() {
  const blogsDir = path.join(process.cwd(), "src", "Blogs");

  if (!fs.existsSync(blogsDir)) {
    console.error(`\n❌ Error: Blogs directory not found at ${blogsDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(blogsDir).filter(file => file.endsWith(".md"));

  if (files.length === 0) {
    console.error("\n❌ Error: No blog posts found");
    process.exit(1);
  }

  let latestPost = null;
  let latestDate = null;

  files.forEach(file => {
    const filePath = path.join(blogsDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);

    if (!data.date || !data.title || !data.slug) {
      console.warn(`⚠️  Skipping ${file}: missing required frontmatter (date, title, or slug)`);
      return;
    }

    const postDate = parseDate(data.date);

    if (!latestDate || postDate > latestDate) {
      latestDate = postDate;
      latestPost = {
        title: data.title,
        slug: data.slug,
        preview: data.preview || "",
        date: data.date,
        file: file
      };
    }
  });

  if (!latestPost) {
    console.error("\n❌ Error: No valid blog posts found with required frontmatter");
    process.exit(1);
  }

  return latestPost;
}

async function main() {
  console.log("\n📧 Notify Subscribers About Latest Blog Post\n");

  const latestPost = getLatestBlogPost();

  console.log("📝 Latest blog post found:");
  console.log(`   File: ${latestPost.file}`);
  console.log(`   Title: ${latestPost.title}`);
  console.log(`   Slug: ${latestPost.slug}`);
  console.log(`   Date: ${latestPost.date}`);
  console.log(`   Preview: ${latestPost.preview.substring(0, 80)}${latestPost.preview.length > 80 ? "..." : ""}`);

  const secret = process.env.NOTIFY_SECRET;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!secret) {
    console.error("\n❌ Error: NOTIFY_SECRET not found in environment variables");
    console.log("Make sure .env.local contains NOTIFY_SECRET");
    process.exit(1);
  }

  console.log("\n📤 Sending notifications...");
  console.log(`   Target: ${siteUrl}/api/notify-subscribers\n`);

  const payload = JSON.stringify({
    secret,
    slug: latestPost.slug,
    title: latestPost.title,
    preview: latestPost.preview || undefined,
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
      console.log("\nTry testing locally first with: npm run notify:latest");
    } else {
      console.error(`\n❌ Error: ${result.body.error || result.body || "Failed to send"}`);
      console.log(`Status: ${result.status}`);
    }
  } catch (error) {
    console.error("\n❌ Request failed:", error.message);
  }
}

main();
