// Quick test to check environment variables
import dotenv from "dotenv";

dotenv.config();

console.log("🔍 Environment Variables Check:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log(
  "DATABASE_URL:",
  process.env.DATABASE_URL ? "✅ Set" : "❌ Not set"
);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Not set");

if (process.env.DATABASE_URL) {
  console.log(
    "Database URL starts with:",
    process.env.DATABASE_URL.substring(0, 30) + "..."
  );
}
