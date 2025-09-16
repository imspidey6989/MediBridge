-- Create hospitals table for MediBridge hospital authentication
-- This script should be run to add hospital support to the database

-- Create hospitals table
CREATE TABLE IF NOT EXISTS hospitals (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    google_id VARCHAR(255) UNIQUE,
    profile_picture TEXT,
    license_number VARCHAR(100),
    specialties TEXT[], -- Array of medical specialties
    address TEXT,
    phone VARCHAR(20),
    website VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    active BOOLEAN DEFAULT true
);

-- Create hospital_permissions table for role-based access
CREATE TABLE IF NOT EXISTS hospital_permissions (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    permissions TEXT[] DEFAULT ARRAY['read_records', 'create_records', 'verify_records'],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add hospital_id column to health_records table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'health_records' AND column_name = 'hospital_id'
    ) THEN
        ALTER TABLE health_records ADD COLUMN hospital_id INTEGER REFERENCES hospitals(id);
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hospitals_email ON hospitals(email);
CREATE INDEX IF NOT EXISTS idx_hospitals_google_id ON hospitals(google_id);
CREATE INDEX IF NOT EXISTS idx_hospitals_active ON hospitals(active);
CREATE INDEX IF NOT EXISTS idx_health_records_hospital_id ON health_records(hospital_id);
CREATE INDEX IF NOT EXISTS idx_hospital_permissions_hospital_id ON hospital_permissions(hospital_id);

-- Insert default permissions for all existing hospitals
INSERT INTO hospital_permissions (hospital_id, permissions)
SELECT id, ARRAY['read_records', 'create_records', 'verify_records']
FROM hospitals 
WHERE id NOT IN (SELECT hospital_id FROM hospital_permissions);

-- Create a trigger to automatically add permissions for new hospitals
CREATE OR REPLACE FUNCTION create_hospital_permissions()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO hospital_permissions (hospital_id, permissions)
    VALUES (NEW.id, ARRAY['read_records', 'create_records', 'verify_records']);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_create_hospital_permissions ON hospitals;
CREATE TRIGGER trigger_create_hospital_permissions
    AFTER INSERT ON hospitals
    FOR EACH ROW
    EXECUTE FUNCTION create_hospital_permissions();

-- Sample hospital data (optional - for testing)
-- INSERT INTO hospitals (email, name, license_number, specialties, address, phone) VALUES
-- ('admin@cityhospital.com', 'City General Hospital', 'LIC001', ARRAY['General Medicine', 'Emergency'], '123 Main St, City, State', '+1-555-0123'),
-- ('contact@heartcenter.com', 'Heart Care Medical Center', 'LIC002', ARRAY['Cardiology', 'Cardiac Surgery'], '456 Heart Ave, City, State', '+1-555-0456');

COMMENT ON TABLE hospitals IS 'Stores hospital/healthcare provider information for MediBridge system';
COMMENT ON TABLE hospital_permissions IS 'Role-based permissions for hospital users';
COMMENT ON COLUMN health_records.hospital_id IS 'Reference to the hospital that created or manages this record';