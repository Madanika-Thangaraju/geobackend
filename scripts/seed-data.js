import db from "../src/config/db.js";

const properties = [
    // --- RENTALS (Residential) ---
    {
        title: "Cozy 2BHK Apartment in Peelamedu",
        description: "A well-maintained 2BHK apartment perfect for families. Close to PSG Tech and Fun Mall.",
        listing_type: "Rent",
        listing_category: "Residential",
        property_type: "apartment",
        rent_price: 15000,
        price: 15000,
        deposit: 50000,
        bedrooms: 2,
        bathrooms: 2,
        bhk: 2,
        sqft: "1200",
        furnishing: "semi-furnished",
        address: "12, Avinashi Rd, Peelamedu, Coimbatore",
        location: "Peelamedu",
        latitude: 11.0250,
        longitude: 77.0000,
        floor_no: 2,
        parking_capacity: 1,
        is_main_road_facing: 0,
        washrooms: 2
    },
    {
        title: "Luxury 3BHK Villa with Garden",
        description: "Spacious independent villa with private garden and covered parking. Pet friendly.",
        listing_type: "Rent",
        listing_category: "Residential",
        property_type: "villa",
        rent_price: 35000,
        price: 35000,
        deposit: 200000,
        bedrooms: 3,
        bathrooms: 3,
        bhk: 3,
        sqft: "2400",
        furnishing: "fully furnished",
        address: "45, Green Avenue, Saravanampatti, Coimbatore",
        location: "Saravanampatti",
        latitude: 11.0800,
        longitude: 76.9800,
        floor_no: 0,
        parking_capacity: 2,
        is_main_road_facing: 0, // Quiet
        washrooms: 3
    },
    {
        title: "Compact 1BHK Studio near Gandhipuram",
        description: "Budget-friendly studio apartment ideal for bachelors or students. Central location.",
        listing_type: "Rent",
        listing_category: "Residential",
        property_type: "apartment",
        rent_price: 8000,
        price: 8000,
        deposit: 30000,
        bedrooms: 1,
        bathrooms: 1,
        bhk: 1,
        sqft: "600",
        furnishing: "unfurnished",
        address: "8th Cross, Gandhipuram, Coimbatore",
        location: "Gandhipuram",
        latitude: 11.0168,
        longitude: 76.9600, // Near center
        floor_no: 3,
        parking_capacity: 0, // Bike only
        is_main_road_facing: 1,
        washrooms: 1
    },

    // --- SALES (Residential) ---
    {
        title: "Modern 3BHK Flat",
        description: "Brand new flat in a gated community with swimming pool and gym.",
        listing_type: "Sell",
        listing_category: "Residential",
        property_type: "apartment",
        price: "7500000",
        rent_price: 0,
        deposit: 0,
        bedrooms: 3,
        bathrooms: 3,
        bhk: 3,
        sqft: "1550",
        furnishing: "unfurnished",
        address: "Royal Enclave, Vadavalli, Coimbatore",
        location: "Vadavalli",
        latitude: 11.0450,
        longitude: 76.9000,
        floor_no: 4,
        parking_capacity: 1,
        is_main_road_facing: 0,
        washrooms: 3
    },
    {
        title: "Premium Residential Plot",
        description: "2400 sqft plot ready for construction. Clear titles and DTCP approved.",
        listing_type: "Sell",
        listing_category: "Residential",
        property_type: "plot",
        price: "4500000",
        rent_price: 0,
        deposit: 0,
        bedrooms: 0,
        bathrooms: 0,
        bhk: 0,
        sqft: "2400",
        furnishing: "unfurnished",
        address: "Kovaipudur, Coimbatore",
        location: "Kovaipudur",
        latitude: 10.9400,
        longitude: 76.9400,
        floor_no: 0,
        parking_capacity: 0,
        is_main_road_facing: 0,
        washrooms: 0
    },

    // --- COMMERCIAL ---
    {
        title: "Prime Office Space on Avinashi Road",
        description: "1500 sqft office space on 1st floor. Main road facing, ideal for IT or consultancy.",
        listing_type: "Rent",
        listing_category: "Commercial",
        property_type: "office",
        rent_price: 45000,
        price: 45000,
        deposit: 300000,
        bedrooms: 0,
        bathrooms: 2,
        bhk: 0,
        sqft: "1500",
        furnishing: "semi-furnished",
        address: "Avinashi Road Opp. Airport, Coimbatore",
        location: "Avinashi Road",
        latitude: 11.0350,
        longitude: 77.0300,
        floor_no: 1,
        parking_capacity: 3,
        is_main_road_facing: 1,
        washrooms: 2
    },
    {
        title: "Retail Shop in Sai Baba Colony",
        description: "Ground floor shop in busy market area. High footfall.",
        listing_type: "Rent",
        listing_category: "Commercial",
        property_type: "shop",
        rent_price: 20000,
        price: 20000,
        deposit: 150000,
        bedrooms: 0,
        bathrooms: 0,
        bhk: 0,
        sqft: "400",
        furnishing: "unfurnished",
        address: "NSR Road, Sai Baba Colony, Coimbatore",
        location: "Sai Baba Colony",
        latitude: 11.0280,
        longitude: 76.9400,
        floor_no: 0,
        parking_capacity: 0,
        is_main_road_facing: 1,
        washrooms: 0
    }
];

const IMAGES = [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", // Office
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
];

async function seed() {
    try {
        console.log("🌱 Starting seed...");

        // 1. Ensure a default owner exists
        // Using a simple query since we don't have the auth hash utils here easily
        // We'll just check if any user exists, or create one.
        const [users] = await db.query("SELECT id FROM users WHERE email = 'seed_owner@example.com'");
        let ownerId;

        if (users.length === 0) {
            console.log("Creating default owner...");
            // Using a dummy hash for now, assuming bcrypt is handled elsewhere or not critical for seed
            const [res] = await db.query(`
        INSERT INTO users (name, email, password, phone, latitude, longitude)
        VALUES ('Seed Owner', 'seed_owner@example.com', '$2a$10$dummyhash', '9876543210', 11.0168, 76.9558)
      `);
            ownerId = res.insertId;
        } else {
            ownerId = users[0].id;
            console.log(`Using existing owner ID: ${ownerId}`);
        }

        // 2. Insert Properties
        for (const prop of properties) {
            console.log(`Adding: ${prop.title}`);

            const sql = `
        INSERT INTO properties (
          owner_id, title, description, listing_type, property_type,
          address, location, latitude, longitude,
          bhk, bedrooms, bathrooms, sqft, furnishing,
          rent_price, price, deposit,
          floor_no, parking_capacity, is_main_road_facing, washrooms,
          is_available, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'active', NOW())
      `;

            const values = [
                ownerId, prop.title, prop.description, prop.listing_type, prop.property_type,
                prop.address, prop.location, prop.latitude, prop.longitude,
                prop.bhk, prop.bedrooms, prop.bathrooms, prop.sqft, prop.furnishing,
                prop.rent_price, prop.price, prop.deposit,
                prop.floor_no, prop.parking_capacity, prop.is_main_road_facing, prop.washrooms
            ];

            const [res] = await db.query(sql, values);
            const propId = res.insertId;

            // 3. Add Images (1-3 random images per property)
            // We need to flatten the array for bulk insert
            const numImages = Math.floor(Math.random() * 3) + 1;
            const propImages = [];
            for (let i = 0; i < numImages; i++) {
                const randImg = IMAGES[Math.floor(Math.random() * IMAGES.length)];
                propImages.push([propId, randImg]);
            }

            if (propImages.length > 0) {
                await db.query("INSERT INTO property_images (property_id, image_url) VALUES ?", [propImages]);
            }
        }

        console.log("✅ Seed completed successfully!");
        process.exit(0);

    } catch (err) {
        console.error("❌ Seed failed:", err);
        process.exit(1);
    }
}

seed();
