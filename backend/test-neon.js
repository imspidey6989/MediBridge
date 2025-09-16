// Simple test to verify Neon database connection works
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

console.log("🔍 Testing direct Neon connection...");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

async function testNeonConnection() {
  try {
    console.log(
      "Connecting to:",
      process.env.DATABASE_URL.substring(0, 50) + "..."
    );

    const client = await pool.connect();
    console.log("✅ Successfully connected to Neon database");

    const result = await client.query(
      "SELECT NOW() as current_time, version()"
    );
    console.log("✅ Query executed successfully");
    console.log("Current time:", result.rows[0].current_time);
    console.log("Database version:", result.rows[0].version.split(" ")[0]);

    // Test if our tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    console.log("\n📋 Existing tables:");
    if (tablesResult.rows.length === 0) {
      console.log("   No tables found");
    } else {
      tablesResult.rows.forEach((row) => {
        console.log(`   - ${row.table_name}`);
      });
    }

    client.release();
    console.log("\n🎉 Neon database connection test successful!");
  } catch (error) {
    console.error("❌ Neon connection test failed:", error.message);
    console.error("Error details:", error);
  } finally {
    await pool.end();
  }
}

testNeonConnection();
