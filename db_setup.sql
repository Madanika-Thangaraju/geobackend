CREATE TABLE IF NOT EXISTS property_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_like (property_id, user_id)
);

CREATE TABLE IF NOT EXISTS saved_properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  user_id INT NOT NULL,
  notes TEXT,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_save (property_id, user_id)
);

CREATE TABLE IF NOT EXISTS recently_viewed_properties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  property_id INT NOT NULL,
  user_id INT NOT NULL,
  ip_address VARCHAR(45),
  session_id VARCHAR(255),
  last_viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_view (property_id, user_id)
);

CREATE TABLE IF NOT EXISTS conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  property_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_convo (user1_id, user2_id, property_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT NOT NULL,
  sender_id INT NOT NULL,
  content TEXT NOT NULL,
  type ENUM('text', 'image', 'location') DEFAULT 'text',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  sender_id INT,
  property_id INT,
  type ENUM('like', 'save', 'view', 'message') NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

