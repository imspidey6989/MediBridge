-- MediBridge Database Test Queries
-- These are the actual SQL queries you can run directly in your PostgreSQL client
-- Replace USER_ID_HERE with an actual user ID from your users table

-- 1. First, let's check if tables exist and have data
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'health_records', COUNT(*) FROM health_records
UNION ALL
SELECT 'medical_history', COUNT(*) FROM medical_history
UNION ALL
SELECT 'medications', COUNT(*) FROM medications
UNION ALL
SELECT 'verification_logs', COUNT(*) FROM verification_logs;

-- 2. Get all users to see available user IDs
SELECT id, email, first_name, last_name, role, created_at 
FROM users 
ORDER BY created_at DESC 
LIMIT 10;

-- 3. Dashboard Statistics (replace '1' with actual user ID)
-- Total health records for user
SELECT COUNT(*) as total_records 
FROM health_records 
WHERE user_id = 1;

-- Recent records (last 30 days)
SELECT COUNT(*) as recent_records 
FROM health_records 
WHERE user_id = 1 
AND created_at >= NOW() - INTERVAL '30 days';

-- Verified records
SELECT COUNT(*) as verified_records 
FROM health_records 
WHERE user_id = 1 
AND verification_status = 'verified';

-- Active medical conditions
SELECT COUNT(*) as active_conditions 
FROM medical_history 
WHERE user_id = 1 
AND status = 'active';

-- Active medications
SELECT COUNT(*) as active_medications 
FROM medications 
WHERE user_id = 1 
AND status = 'active';

-- 4. Complete dashboard stats in one query (replace user_id = 1 with actual ID)
SELECT 
  (SELECT COUNT(*) FROM health_records WHERE user_id = 1) as total_records,
  (SELECT COUNT(*) FROM health_records WHERE user_id = 1 AND created_at >= NOW() - INTERVAL '30 days') as recent_records,
  (SELECT COUNT(*) FROM health_records WHERE user_id = 1 AND verification_status = 'verified') as verified_records,
  (SELECT COUNT(*) FROM medical_history WHERE user_id = 1 AND status = 'active') as active_conditions,
  (SELECT COUNT(*) FROM medications WHERE user_id = 1 AND status = 'active') as active_medications;

-- 5. Sample data for testing (uncomment and run if tables are empty)
/*
-- Insert a test user
INSERT INTO users (google_id, email, first_name, last_name, role) 
VALUES ('test-google-id', 'test@example.com', 'Test', 'User', 'patient')
ON CONFLICT (email) DO NOTHING;

-- Get the user ID
WITH test_user AS (
  SELECT id FROM users WHERE email = 'test@example.com'
)
-- Insert sample health record
INSERT INTO health_records (user_id, record_type, title, description, icd11_code)
SELECT id, 'diagnosis', 'Test Diagnosis', 'Sample health record for testing', 'XM68M6'
FROM test_user;

-- Insert sample medical history
INSERT INTO medical_history (user_id, condition_name, icd11_code, diagnosis_date, status)
SELECT id, 'Hypertension', 'BA00', '2024-01-01', 'active'
FROM test_user;

-- Insert sample medication
INSERT INTO medications (user_id, medication_name, dosage, frequency, start_date, status)
SELECT id, 'Lisinopril', '10mg', 'once daily', '2024-01-01', 'active'
FROM test_user;
*/

-- 6. Check verification logs
SELECT 
  vl.id,
  vl.record_id,
  vl.verifier_id,
  vl.status,
  vl.notes,
  vl.created_at,
  hr.title as record_title,
  u.first_name || ' ' || u.last_name as verifier_name
FROM verification_logs vl
JOIN health_records hr ON vl.record_id = hr.id
JOIN users u ON vl.verifier_id = u.id
ORDER BY vl.created_at DESC
LIMIT 10;

-- 7. Health records with verification status
SELECT 
  hr.id,
  hr.title,
  hr.record_type,
  hr.verification_status,
  hr.created_at,
  u.first_name || ' ' || u.last_name as patient_name
FROM health_records hr
JOIN users u ON hr.user_id = u.id
ORDER BY hr.created_at DESC
LIMIT 10;