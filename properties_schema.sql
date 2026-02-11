-- Full Properties Table Schema with Commercial Support
CREATE TABLE IF NOT EXISTS `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `description` text,
  `listing_type` varchar(270) DEFAULT NULL,
  `property_type` varchar(270) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `rent_price` decimal(10,2) DEFAULT NULL,
  `price` varchar(270) DEFAULT NULL,
  `deposit` decimal(10,2) DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `bhk` int DEFAULT NULL,
  `sqft` varchar(270) DEFAULT NULL,
  `furnishing` enum('furnished','semi-furnished','unfurnished') DEFAULT NULL,
  `address` text,
  `location` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT '1',
  `status` enum('active','sold','pending') DEFAULT 'active',
  
  -- Commercial Specific Fields
  `floor_no` int DEFAULT NULL,
  `parking_capacity` int DEFAULT NULL,
  `is_main_road_facing` tinyint(1) DEFAULT '0',
  `washrooms` int DEFAULT NULL,
  
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
