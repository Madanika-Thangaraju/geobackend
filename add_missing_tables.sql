CREATE TABLE IF NOT EXISTS tour_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id INT NOT NULL,
  owner_id INT NOT NULL,
  property_id INT NOT NULL,
  tour_date DATE NOT NULL,
  tour_time VARCHAR(50) NOT NULL,
  message TEXT,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES users(id),
  FOREIGN KEY (owner_id) REFERENCES users(id),
  FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE TABLE IF NOT EXISTS call_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id INT NOT NULL,
  owner_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES users(id),
  FOREIGN KEY (owner_id) REFERENCES users(id)
);
