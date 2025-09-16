import { db } from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

const testDatabaseConnection = async () => {
  try {
    console.log("🔄 Testing database connection...");

    // Test basic connection
    const result = await db.query(
      "SELECT NOW() as current_time, version() as db_version"
    );

    console.log("✅ Database connection successful!");
    console.log("📅 Current time:", result.rows[0].current_time);
    console.log(
      "🗄️  Database version:",
      result.rows[0].db_version.split(" ")[0]
    );

    // Test if our tables exist
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;

    const tables = await db.query(tablesQuery);
    console.log(
      "📋 Existing tables:",
      tables.rows.map((row) => row.table_name)
    );

    // Check users table structure
    if (tables.rows.some((row) => row.table_name === "users")) {
      const usersCount = await db.query("SELECT COUNT(*) as count FROM users");
      console.log("👥 Users in database:", usersCount.rows[0].count);
    }

    // Check health_records table structure
    if (tables.rows.some((row) => row.table_name === "health_records")) {
      const recordsCount = await db.query(
        "SELECT COUNT(*) as count FROM health_records"
      );
      console.log("🏥 Health records in database:", recordsCount.rows[0].count);
    }

    console.log("🎉 Database test completed successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("💡 Please check your DATABASE_URL in the .env file");
  } finally {
    // Close the connection
    await db.close();
    process.exit(0);
  }
};

testDatabaseConnection();
