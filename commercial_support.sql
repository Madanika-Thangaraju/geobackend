-- SQL to support Commercial Properties
-- Run this if your property_type or listing_type columns are restricted.
-- In the current setup, these are VARCHAR(270), so this is mainly for documentation.

-- Ensure the listing_type and property_type columns have enough length
ALTER TABLE properties MODIFY COLUMN listing_type VARCHAR(270);
ALTER TABLE properties MODIFY COLUMN property_type VARCHAR(270);

-- If you using ENUMs instead, use this:
-- ALTER TABLE properties MODIFY COLUMN listing_type ENUM('Sell', 'Rent', 'PG/Co-living', 'Commercial');
-- ALTER TABLE properties MODIFY COLUMN property_type ENUM('house', 'apartment', 'villa', 'plot', 'office', 'cafe', 'shop');
