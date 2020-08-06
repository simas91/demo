CREATE TABLE IF NOT EXISTS vehicle (
    vehicle_id UUID PRIMARY KEY NOT NULL,
    registration VARCHAR(7) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    hpiClear VARCHAR(3) NOT NULL
            CHECK (
                hpiClear = 'NO' OR
                hpiClear = 'YES' OR
                hpiClear = 'no' OR
                hpiClear = 'yes')
);