# MediBridge Backend - Enhanced Health Management System

## 🏥 Overview

MediBridge Backend is a comprehensive health record management system powered by **ICD-11** integration and **Namaste TM2** verification. This system provides secure, role-based access to health records with advanced analytics and verification capabilities.

## ✨ Key Features

### 🔐 Authentication & Security

- **Google OAuth 2.0** integration
- **JWT token-based** authentication
- **Role-based access control** (RBAC)
- **Rate limiting** and security headers
- **Audit logging** for sensitive operations

### 🏥 Health Records Management

- **Complete CRUD** operations for health records
- **ICD-11 code** integration for standardized medical coding
- **Multi-type records**: consultations, lab results, prescriptions, imaging, etc.
- **Severity tracking** and status management
- **Medical history** and medication tracking

### 🔍 Verification System

- **Namaste TM2** integration for document verification
- **Batch verification** capabilities
- **Verification history** tracking
- **Confidence scoring** for verification results

### 📊 Dashboard & Analytics

- **Comprehensive overview** of health metrics
- **Trend analysis** and health scoring
- **Data visualization** ready endpoints
- **Export functionality** (JSON/CSV)
- **Reminder system** for medications and follow-ups

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL database
- Google Cloud Project with OAuth configured
- Environment variables configured

### Installation

1. **Clone and install dependencies:**

```bash
cd backend
npm install
```

2. **Environment Configuration:**
   Create a `.env` file with:

```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
SESSION_SECRET=your-session-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

3. **Start the server:**

```bash
# Development
npm run dev

# Production
npm start
```

## 📚 API Documentation

### 🔑 Authentication Endpoints

#### POST `/api/auth/google`

Google OAuth authentication

```json
{
  "token": "google-id-token"
}
```

#### GET `/api/auth/profile`

Get current user profile (requires authentication)

#### GET `/api/auth/verify`

Verify JWT token validity

#### POST `/api/auth/logout`

Logout and clear session

### 🏥 Health Records Endpoints

#### GET `/api/health-records`

Get user's health records with pagination and filtering

- Query params: `page`, `limit`, `type`, `status`

#### POST `/api/health-records`

Create new health record

```json
{
  "recordType": "consultation",
  "title": "Annual Checkup",
  "description": "Routine annual physical examination",
  "icd11Code": "QA02",
  "diagnosis": "Normal examination findings",
  "doctorName": "Dr. Smith",
  "hospitalName": "City Hospital",
  "visitDate": "2024-01-15",
  "severity": "mild"
}
```

#### GET `/api/health-records/:id`

Get specific health record

#### PUT `/api/health-records/:id`

Update health record

#### DELETE `/api/health-records/:id`

Delete health record

#### GET `/api/health-records/stats/overview`

Get health records statistics

### 📊 Dashboard Endpoints

#### GET `/api/dashboard/overview`

Comprehensive dashboard data including:

- Statistics overview
- Recent records
- Medical history summary
- Verification status
- Charts data

#### GET `/api/dashboard/analytics`

Advanced analytics with time-series data

- Query params: `period` (7d, 30d, 90d, 1y), `metric`

#### GET `/api/dashboard/trends`

Health trends and scoring

#### GET `/api/dashboard/reminders`

Upcoming medication and follow-up reminders

#### GET `/api/dashboard/export`

Export health data

- Query params: `format` (json, csv), `includeAttachments` (true, false)

### 🔍 Verification Endpoints

#### GET `/api/verification/icd11/search`

Search ICD-11 codes

- Query params: `query`, `limit`

#### GET `/api/verification/icd11/:code`

Get specific ICD-11 code details

#### POST `/api/verification/verify/:recordId`

Verify single health record with Namaste TM2

```json
{
  "verificationType": "full"
}
```

#### POST `/api/verification/verify-batch`

Batch verify multiple records

```json
{
  "recordIds": [1, 2, 3],
  "verificationType": "full"
}
```

#### GET `/api/verification/history/:recordId`

Get verification history for a record

#### GET `/api/verification/stats`

Get verification statistics

## 🔐 Role-Based Access Control

### Roles

- **Patient**: Can manage own records
- **Doctor**: Can view/edit all records
- **Verifier**: Can verify records and view analytics
- **Admin**: Full system access

### Permissions

- `read_own_records`: Read user's own records
- `write_own_records`: Create/edit user's own records
- `read_all_records`: Read all records in system
- `write_all_records`: Create/edit any records
- `verify_records`: Perform record verification
- `manage_users`: User management operations
- `view_analytics`: Access analytics dashboards
- `export_data`: Export user data

## 🗄️ Database Schema

### Core Tables

- **users**: User profiles and authentication
- **health_records**: Main health record storage
- **medical_history**: Chronic conditions and history
- **medications**: Current and past medications
- **verification_logs**: Verification audit trail
- **analytics**: Metrics and dashboard data
- **audit_logs**: System audit trail

### Key Features

- **Automated indexing** for performance
- **JSON fields** for flexible data storage
- **Audit trails** for compliance
- **Referential integrity** with foreign keys

## 🔒 Security Features

### Authentication Security

- **JWT tokens** with configurable expiration
- **HTTP-only cookies** option
- **Session management** with secure settings
- **CORS protection** with whitelist

### API Security

- **Rate limiting** (100 requests/15min, 5 auth/15min)
- **Helmet.js** security headers
- **Input validation** and sanitization
- **Role-based authorization** on all endpoints

### Data Security

- **Encrypted sensitive fields**
- **Audit logging** for all operations
- **Data anonymization** options
- **GDPR compliance** ready

## 📈 Performance & Monitoring

### Database Optimization

- **Connection pooling** with configurable limits
- **Query optimization** with indexes
- **Pagination** for large datasets
- **Caching strategies** ready

### Monitoring

- **Request logging** with timing
- **Error tracking** and reporting
- **Health check** endpoints
- **Audit trail** for compliance

## 🧪 Testing & Development

### Development Scripts

```bash
npm run dev      # Start development server
npm run start    # Start production server
npm run test     # Run test suite (to be implemented)
```

### Development Features

- **Hot reload** with nodemon
- **Environment-based** configuration
- **Detailed error** messages in development
- **SQL query logging** for debugging

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure secure database connection
- [ ] Set up SSL/TLS certificates
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies

### Environment Variables

Ensure all required environment variables are set:

- Database connection string
- JWT secrets
- Google OAuth credentials
- CORS origins
- Rate limiting settings

## 🔧 Integration Points

### ICD-11 Integration

The system is designed to integrate with the official ICD-11 API:

- Search functionality for medical codes
- Code validation and details
- Hierarchical navigation
- Multi-language support ready

### Namaste TM2 Integration

Verification system integration points:

- Document verification API
- Confidence scoring
- Batch processing
- Result tracking

## 📝 API Response Format

All API responses follow a consistent format:

**Success Response:**

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "message": "Operation completed successfully"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

**Paginated Response:**

```json
{
  "success": true,
  "data": [
    /* array of items */
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalRecords": 100,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, email support@medibridge.com or create an issue in the repository.

---

**MediBridge Backend** - Revolutionizing health record management with cutting-edge technology and security. 🏥✨
