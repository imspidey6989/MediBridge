import express from "express";
import { authenticateToken } from "../auth/auth.js";
import { db } from "../config/database.js";

const router = express.Router();

// Get comprehensive dashboard overview
router.get("/overview", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get basic statistics
    const stats = await db.getDashboardStats(userId);
    
    // Get recent health records
    const recentRecords = await db.getHealthRecordsByUserId(userId, 5, 0);
    
    // Get medical history summary
    const medicalHistory = await db.getMedicalHistoryByUserId(userId);
    
    // Get active medications
    const activeMedications = await db.getMedicationsByUserId(userId);
    
    // Get records by month (last 6 months)
    const monthlyStatsQuery = `
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as record_count,
        record_type
      FROM health_records 
      WHERE user_id = $1 
        AND created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at), record_type
      ORDER BY month DESC
    `;
    const monthlyStats = await db.query(monthlyStatsQuery, [userId]);
    
    // Get verification status breakdown
    const verificationStatsQuery = `
      SELECT 
        verification_status,
        COUNT(*) as count
      FROM health_records 
      WHERE user_id = $1
      GROUP BY verification_status
    `;
    const verificationStats = await db.query(verificationStatsQuery, [userId]);
    
    // Get severity distribution
    const severityStatsQuery = `
      SELECT 
        severity,
        COUNT(*) as count
      FROM health_records 
      WHERE user_id = $1
      GROUP BY severity
    `;
    const severityStats = await db.query(severityStatsQuery, [userId]);

    res.json({
      success: true,
      data: {
        overview: stats,
        recentRecords,
        medicalHistory: medicalHistory.slice(0, 5), // Latest 5
        activeMedications: activeMedications.filter(med => med.status === 'active').slice(0, 5),
        charts: {
          monthlyRecords: monthlyStats.rows,
          verificationStatus: verificationStats.rows,
          severityDistribution: severityStats.rows
        },
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("❌ Dashboard Overview Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard overview",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// Get detailed analytics
router.get("/analytics", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '30d', metric } = req.query;
    
    let dateFilter = "created_at >= NOW() - INTERVAL '30 days'";
    if (period === '7d') dateFilter = "created_at >= NOW() - INTERVAL '7 days'";
    if (period === '90d') dateFilter = "created_at >= NOW() - INTERVAL '90 days'";
    if (period === '1y') dateFilter = "created_at >= NOW() - INTERVAL '1 year'";
    
    // Records over time
    const timeSeriesQuery = `
      SELECT 
        DATE_TRUNC('day', created_at) as date,
        COUNT(*) as count,
        record_type
      FROM health_records 
      WHERE user_id = $1 AND ${dateFilter}
      GROUP BY DATE_TRUNC('day', created_at), record_type
      ORDER BY date ASC
    `;
    const timeSeries = await db.query(timeSeriesQuery, [userId]);
    
    // Top conditions (ICD-11 codes)
    const topConditionsQuery = `
      SELECT 
        icd11_code,
        icd11_title,
        COUNT(*) as frequency
      FROM health_records 
      WHERE user_id = $1 
        AND icd11_code IS NOT NULL 
        AND ${dateFilter}
      GROUP BY icd11_code, icd11_title
      ORDER BY frequency DESC
      LIMIT 10
    `;
    const topConditions = await db.query(topConditionsQuery, [userId]);
    
    // Hospital/Doctor visits
    const providerStatsQuery = `
      SELECT 
        COALESCE(hospital_name, 'Unknown Hospital') as provider,
        COUNT(*) as visit_count
      FROM health_records 
      WHERE user_id = $1 AND ${dateFilter}
      GROUP BY hospital_name
      ORDER BY visit_count DESC
      LIMIT 5
    `;
    const providerStats = await db.query(providerStatsQuery, [userId]);

    res.json({
      success: true,
      data: {
        period,
        timeSeries: timeSeries.rows,
        topConditions: topConditions.rows,
        providerStats: providerStats.rows,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("❌ Dashboard Analytics Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// Get health trends
router.get("/trends", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Health score trend (based on severity and verification status)
    const healthScoreQuery = `
      SELECT 
        DATE_TRUNC('week', created_at) as week,
        AVG(
          CASE 
            WHEN severity = 'mild' AND verification_status = 'verified' THEN 4
            WHEN severity = 'mild' AND verification_status = 'pending' THEN 3
            WHEN severity = 'moderate' AND verification_status = 'verified' THEN 2
            WHEN severity = 'severe' THEN 1
            ELSE 2
          END
        ) as health_score
      FROM health_records 
      WHERE user_id = $1 
        AND created_at >= NOW() - INTERVAL '12 weeks'
      GROUP BY DATE_TRUNC('week', created_at)
      ORDER BY week ASC
    `;
    const healthTrend = await db.query(healthScoreQuery, [userId]);
    
    // Medication adherence trend
    const medicationTrendQuery = `
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        COUNT(*) as total_medications,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_medications
      FROM medications 
      WHERE user_id = $1 
        AND created_at >= NOW() - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month ASC
    `;
    const medicationTrend = await db.query(medicationTrendQuery, [userId]);

    res.json({
      success: true,
      data: {
        healthTrend: healthTrend.rows,
        medicationTrend: medicationTrend.rows,
        lastCalculated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("❌ Dashboard Trends Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trend data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// Get upcoming appointments/reminders
router.get("/reminders", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Medication reminders (ending soon)
    const medicationReminders = await db.query(`
      SELECT 
        id,
        medication_name,
        end_date,
        dosage,
        frequency,
        (end_date - CURRENT_DATE) as days_remaining
      FROM medications 
      WHERE user_id = $1 
        AND status = 'active'
        AND end_date IS NOT NULL
        AND end_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
      ORDER BY end_date ASC
    `, [userId]);
    
    // Follow-up reminders (records that need attention)
    const followUpReminders = await db.query(`
      SELECT 
        id,
        title,
        record_type,
        created_at,
        verification_status
      FROM health_records 
      WHERE user_id = $1 
        AND verification_status = 'pending'
        AND created_at <= NOW() - INTERVAL '7 days'
      ORDER BY created_at ASC
      LIMIT 5
    `, [userId]);

    res.json({
      success: true,
      data: {
        medicationReminders: medicationReminders.rows,
        followUpReminders: followUpReminders.rows,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("❌ Dashboard Reminders Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reminders",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// Export health data
router.get("/export", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { format = 'json', includeAttachments = false } = req.query;
    
    // Get all user health data
    const healthRecords = await db.getHealthRecordsByUserId(userId, 1000, 0);
    const medicalHistory = await db.getMedicalHistoryByUserId(userId);
    const medications = await db.getMedicationsByUserId(userId);
    
    const exportData = {
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
      },
      exportDate: new Date().toISOString(),
      healthRecords,
      medicalHistory,
      medications,
      totalRecords: healthRecords.length
    };
    
    // Remove attachments if not requested (for privacy/size)
    if (!includeAttachments) {
      exportData.healthRecords = healthRecords.map(record => {
        const { attachments, ...recordWithoutAttachments } = record;
        return recordWithoutAttachments;
      });
    }
    
    if (format === 'csv') {
      // Convert to CSV format (simplified)
      const csv = healthRecords.map(record => 
        `"${record.title}","${record.record_type}","${record.created_at}","${record.status}"`
      ).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=health_records.csv');
      res.send(`"Title","Type","Date","Status"\n${csv}`);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=health_data.json');
      res.json(exportData);
    }
  } catch (error) {
    console.error("❌ Dashboard Export Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to export data",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

export default router;