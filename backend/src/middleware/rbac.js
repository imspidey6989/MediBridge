import { db } from "../config/database.js";

// Role definitions
export const ROLES = {
  PATIENT: "patient",
  DOCTOR: "doctor",
  ADMIN: "admin",
  VERIFIER: "verifier",
};

// Permission definitions
export const PERMISSIONS = {
  READ_OWN_RECORDS: "read_own_records",
  WRITE_OWN_RECORDS: "write_own_records",
  READ_ALL_RECORDS: "read_all_records",
  WRITE_ALL_RECORDS: "write_all_records",
  VERIFY_RECORDS: "verify_records",
  MANAGE_USERS: "manage_users",
  VIEW_ANALYTICS: "view_analytics",
  EXPORT_DATA: "export_data",
};

// Role-permission mapping
const rolePermissions = {
  [ROLES.PATIENT]: [
    PERMISSIONS.READ_OWN_RECORDS,
    PERMISSIONS.WRITE_OWN_RECORDS,
    PERMISSIONS.EXPORT_DATA,
  ],
  [ROLES.DOCTOR]: [
    PERMISSIONS.READ_OWN_RECORDS,
    PERMISSIONS.WRITE_OWN_RECORDS,
    PERMISSIONS.READ_ALL_RECORDS,
    PERMISSIONS.WRITE_ALL_RECORDS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_DATA,
  ],
  [ROLES.VERIFIER]: [
    PERMISSIONS.READ_ALL_RECORDS,
    PERMISSIONS.VERIFY_RECORDS,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.READ_ALL_RECORDS,
    PERMISSIONS.WRITE_ALL_RECORDS,
    PERMISSIONS.VERIFY_RECORDS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_DATA,
  ],
};

// Check if user has specific permission
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  return rolePermissions[userRole]?.includes(permission) || false;
};

// Check if user can access specific resource
export const canAccessResource = (userRole, resourceOwnerId, currentUserId) => {
  // Admin and verifiers can access all resources
  if (userRole === ROLES.ADMIN || userRole === ROLES.VERIFIER) {
    return true;
  }

  // Doctors can access all records (in a real system, this would be more restricted)
  if (userRole === ROLES.DOCTOR) {
    return true;
  }

  // Patients can only access their own resources
  if (userRole === ROLES.PATIENT) {
    return resourceOwnerId === currentUserId;
  }

  return false;
};

// Middleware to check permissions
export const requirePermission = (permission) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role || ROLES.PATIENT;

      if (!hasPermission(userRole, permission)) {
        return res.status(403).json({
          success: false,
          message: "Insufficient permissions",
          required: permission,
          userRole,
        });
      }

      next();
    } catch (error) {
      console.error("Permission check error:", error);
      res.status(500).json({
        success: false,
        message: "Permission validation failed",
      });
    }
  };
};

// Middleware to check resource ownership
export const requireResourceAccess = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user?.role || ROLES.PATIENT;
      const currentUserId = req.user?.id;

      // Get resource owner ID using the provided function
      const resourceOwnerId = await getResourceOwnerId(req);

      if (!canAccessResource(userRole, resourceOwnerId, currentUserId)) {
        return res.status(403).json({
          success: false,
          message: "Access denied to this resource",
        });
      }

      next();
    } catch (error) {
      console.error("Resource access check error:", error);
      res.status(500).json({
        success: false,
        message: "Resource access validation failed",
      });
    }
  };
};

// Helper function to get health record owner ID
export const getHealthRecordOwnerId = async (req) => {
  const recordId = req.params.id;
  if (!recordId) throw new Error("Record ID not provided");

  const query = "SELECT user_id FROM health_records WHERE id = $1";
  const result = await db.query(query, [recordId]);

  if (!result.rows[0]) {
    throw new Error("Health record not found");
  }

  return result.rows[0].user_id;
};

// Middleware for different role requirements
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role || ROLES.PATIENT;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Insufficient role privileges",
          required: allowedRoles,
          userRole,
        });
      }

      next();
    } catch (error) {
      console.error("Role check error:", error);
      res.status(500).json({
        success: false,
        message: "Role validation failed",
      });
    }
  };
};

// Data filtering based on user role
export const filterDataByRole = (data, userRole, currentUserId) => {
  if (
    userRole === ROLES.ADMIN ||
    userRole === ROLES.VERIFIER ||
    userRole === ROLES.DOCTOR
  ) {
    return data; // Full access
  }

  if (userRole === ROLES.PATIENT) {
    // Filter to only show user's own data
    return data.filter((item) => item.user_id === currentUserId);
  }

  return []; // No access
};

// Audit logging for sensitive operations
export const auditLog = async (
  action,
  userId,
  resourceType,
  resourceId,
  details = {}
) => {
  try {
    const auditQuery = `
      INSERT INTO audit_logs (action, user_id, resource_type, resource_id, details, timestamp)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
    `;

    await db.query(auditQuery, [
      action,
      userId,
      resourceType,
      resourceId,
      JSON.stringify(details),
    ]);
  } catch (error) {
    console.error("Audit logging failed:", error);
    // Don't throw error to avoid breaking the main operation
  }
};

// Create audit logs table if it doesn't exist
export const createAuditTable = async () => {
  const createAuditTableQuery = `
    CREATE TABLE IF NOT EXISTS audit_logs (
      id SERIAL PRIMARY KEY,
      action VARCHAR(100) NOT NULL,
      user_id INTEGER REFERENCES users(id),
      resource_type VARCHAR(50) NOT NULL,
      resource_id VARCHAR(100),
      details JSONB,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
    CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
    CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
  `;

  try {
    await db.query(createAuditTableQuery);
    console.log("✅ Audit logs table initialized successfully");
  } catch (error) {
    console.error("❌ Error creating audit logs table:", error);
  }
};

export default {
  ROLES,
  PERMISSIONS,
  hasPermission,
  canAccessResource,
  requirePermission,
  requireResourceAccess,
  requireRole,
  filterDataByRole,
  auditLog,
  createAuditTable,
  getHealthRecordOwnerId,
};
