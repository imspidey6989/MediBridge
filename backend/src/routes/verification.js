import express from "express";
import { authenticateToken } from "../auth/auth.js";
import { db } from "../config/database.js";

const router = express.Router();

// ICD-11 API integration helper
const searchICD11 = async (searchTerm) => {
  try {
    // This would integrate with actual ICD-11 API
    // For now, return mock data structure
    const mockResults = [
      {
        code: "KB2Y",
        title: "Other specified diseases of the respiratory system",
        definition: "Respiratory system diseases not elsewhere classified",
        parent: "KB2",
      },
      {
        code: "KB23",
        title: "Allergic rhinitis",
        definition: "Inflammation of nasal mucosa due to allergens",
        parent: "KB2",
      },
    ];

    return mockResults.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error("ICD-11 Search Error:", error);
    return [];
  }
};

// Namaste TM2 verification simulation
const verifyWithNamasteTM2 = async (recordData) => {
  try {
    // This would integrate with actual Namaste TM2 API
    // For now, simulate verification process
    const verificationResult = {
      verified: Math.random() > 0.3, // 70% success rate simulation
      confidence: Math.random() * 100,
      timestamp: new Date().toISOString(),
      verificationId: `TM2_${Date.now()}`,
      details: {
        documentIntegrity: Math.random() > 0.2,
        medicalTerminology: Math.random() > 0.1,
        providerCredentials: Math.random() > 0.15,
        dataConsistency: Math.random() > 0.25,
      },
    };

    return verificationResult;
  } catch (error) {
    console.error("Namaste TM2 Verification Error:", error);
    return {
      verified: false,
      confidence: 0,
      error: "Verification service unavailable",
    };
  }
};

// Search ICD-11 codes
router.get("/icd11/search", authenticateToken, async (req, res) => {
  try {
    const { query: searchQuery, limit = 10 } = req.query;

    if (!searchQuery || searchQuery.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters long",
      });
    }

    const results = await searchICD11(searchQuery);

    res.json({
      success: true,
      data: results.slice(0, limit),
      query: searchQuery,
      count: results.length,
    });
  } catch (error) {
    console.error("❌ ICD-11 Search Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search ICD-11 codes",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Get ICD-11 code details
router.get("/icd11/:code", authenticateToken, async (req, res) => {
  try {
    const { code } = req.params;

    // Mock ICD-11 code details
    const mockCodeDetail = {
      code: code,
      title: "Sample Condition",
      definition: "Detailed definition of the medical condition",
      synonyms: ["Alternative name 1", "Alternative name 2"],
      parent: "Parent Category",
      children: ["Child condition 1", "Child condition 2"],
      relatedCodes: ["Related1", "Related2"],
      lastUpdated: "2024-01-15",
    };

    res.json({
      success: true,
      data: mockCodeDetail,
    });
  } catch (error) {
    console.error("❌ ICD-11 Code Details Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ICD-11 code details",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Verify health record with Namaste TM2
router.post("/verify/:recordId", authenticateToken, async (req, res) => {
  try {
    const { recordId } = req.params;
    const { verificationType = "full" } = req.body;

    // Get the health record
    const record = await db.getHealthRecordById(recordId, req.user.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Health record not found",
      });
    }

    // Check if already verified
    if (record.verification_status === "verified") {
      return res.status(400).json({
        success: false,
        message: "Record is already verified",
      });
    }

    // Perform verification with Namaste TM2
    const verificationResult = await verifyWithNamasteTM2({
      recordId: record.id,
      title: record.title,
      diagnosis: record.diagnosis,
      icd11Code: record.icd11_code,
      doctorName: record.doctor_name,
      hospitalName: record.hospital_name,
      verificationType,
    });

    // Update record verification status
    const verificationStatus = verificationResult.verified
      ? "verified"
      : "failed";
    await db.updateHealthRecord(recordId, req.user.id, {
      verification_status: verificationStatus,
      verification_data: verificationResult,
    });

    // Create verification log
    await db.createVerificationLog({
      recordId: record.id,
      verificationType: `namaste_tm2_${verificationType}`,
      status: verificationStatus,
      verificationData: verificationResult,
      verifiedBy: "Namaste TM2 System",
      notes: `Automatic verification with confidence: ${verificationResult.confidence?.toFixed(
        2
      )}%`,
    });

    res.json({
      success: true,
      message: `Verification ${
        verificationResult.verified ? "successful" : "failed"
      }`,
      data: {
        recordId: record.id,
        verificationStatus,
        verificationResult,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Record Verification Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify health record",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Get verification history for a record
router.get("/history/:recordId", authenticateToken, async (req, res) => {
  try {
    const { recordId } = req.params;

    // Verify user owns the record
    const record = await db.getHealthRecordById(recordId, req.user.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Health record not found",
      });
    }

    // Get verification history
    const historyQuery = `
      SELECT * FROM verification_logs 
      WHERE record_id = $1 
      ORDER BY verified_at DESC
    `;
    const history = await db.query(historyQuery, [recordId]);

    res.json({
      success: true,
      data: {
        recordId: record.id,
        recordTitle: record.title,
        currentStatus: record.verification_status,
        verificationHistory: history.rows,
      },
    });
  } catch (error) {
    console.error("❌ Verification History Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch verification history",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Bulk verify multiple records
router.post("/verify-batch", authenticateToken, async (req, res) => {
  try {
    const { recordIds, verificationType = "full" } = req.body;

    if (!Array.isArray(recordIds) || recordIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Record IDs array is required",
      });
    }

    if (recordIds.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Cannot verify more than 10 records at once",
      });
    }

    const results = [];

    for (const recordId of recordIds) {
      try {
        const record = await db.getHealthRecordById(recordId, req.user.id);

        if (!record) {
          results.push({
            recordId,
            success: false,
            message: "Record not found",
          });
          continue;
        }

        if (record.verification_status === "verified") {
          results.push({
            recordId,
            success: true,
            message: "Already verified",
            status: "verified",
          });
          continue;
        }

        const verificationResult = await verifyWithNamasteTM2({
          recordId: record.id,
          title: record.title,
          diagnosis: record.diagnosis,
          verificationType,
        });

        const verificationStatus = verificationResult.verified
          ? "verified"
          : "failed";
        await db.updateHealthRecord(recordId, req.user.id, {
          verification_status: verificationStatus,
          verification_data: verificationResult,
        });

        await db.createVerificationLog({
          recordId: record.id,
          verificationType: `namaste_tm2_${verificationType}`,
          status: verificationStatus,
          verificationData: verificationResult,
          verifiedBy: "Namaste TM2 System (Batch)",
          notes: `Batch verification with confidence: ${verificationResult.confidence?.toFixed(
            2
          )}%`,
        });

        results.push({
          recordId,
          success: true,
          status: verificationStatus,
          confidence: verificationResult.confidence,
          verified: verificationResult.verified,
        });
      } catch (error) {
        results.push({
          recordId,
          success: false,
          message: "Verification failed",
          error: error.message,
        });
      }
    }

    const successCount = results.filter((r) => r.success && r.verified).length;

    res.json({
      success: true,
      message: `Batch verification completed. ${successCount}/${recordIds.length} records verified successfully.`,
      data: {
        results,
        summary: {
          total: recordIds.length,
          successful: successCount,
          failed: recordIds.length - successCount,
        },
      },
    });
  } catch (error) {
    console.error("❌ Batch Verification Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to perform batch verification",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Get verification statistics
router.get("/stats", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Overall verification stats
    const overallStatsQuery = `
      SELECT 
        verification_status,
        COUNT(*) as count
      FROM health_records 
      WHERE user_id = $1
      GROUP BY verification_status
    `;
    const overallStats = await db.query(overallStatsQuery, [userId]);

    // Recent verification activity
    const recentActivityQuery = `
      SELECT 
        vl.*,
        hr.title as record_title
      FROM verification_logs vl
      JOIN health_records hr ON vl.record_id = hr.id
      WHERE hr.user_id = $1
      ORDER BY vl.verified_at DESC
      LIMIT 10
    `;
    const recentActivity = await db.query(recentActivityQuery, [userId]);

    // Verification success rate by type
    const successRateQuery = `
      SELECT 
        verification_type,
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'verified' THEN 1 END) as successful
      FROM verification_logs vl
      JOIN health_records hr ON vl.record_id = hr.id
      WHERE hr.user_id = $1
      GROUP BY verification_type
    `;
    const successRates = await db.query(successRateQuery, [userId]);

    res.json({
      success: true,
      data: {
        overallStats: overallStats.rows,
        recentActivity: recentActivity.rows,
        successRates: successRates.rows.map((row) => ({
          type: row.verification_type,
          total: parseInt(row.total),
          successful: parseInt(row.successful),
          successRate: (
            (parseInt(row.successful) / parseInt(row.total)) *
            100
          ).toFixed(2),
        })),
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Verification Stats Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch verification statistics",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
