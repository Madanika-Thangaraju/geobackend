export function mapProperty(row) {
  const priceValue = row.listing_type === "Rent"
    ? row.rent_price
    : row.price;

  return {
    id: row.id,
    price: priceValue
      ? `₹${Number(priceValue).toLocaleString("en-IN")}`
      : "Price on request",

    type: row.bhk ? `${row.bhk} BHK` : row.property_type,
    title: row.title,

    description:
      row.description ||
      "Beautiful property with modern amenities in a prime location Beautiful property with modern amenities in a prime location Beautiful property with modern amenities in a prime location  Beautiful property with modern amenities in a prime location. ",

    size: row.sqft ? `${row.sqft} sqft` : "N/A",

    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,

    dist: row.distance ? `${row.distance.toFixed(1)} km` : "Nearby",
    address: row.address,
    location: {
      lat: row.latitude,
      lng: row.longitude
    },

    match: "90% AI Match",

    status: row.is_available === 0 ? "Sold Out" : "Available",

    images: (row.all_images || "").split("|||").filter(Boolean).map(url => ({ uri: url })),
    image: {
      uri: (row.all_images || "").split("|||")[0] || row.image_url || row.main_image || "https://images.unsplash.com/photo-1600596542815-e32c11e3b38c"
    },

    owner: {
      id: row.owner_id,
      name: row.owner_name || "Property Owner",
      image: {
        uri: row.owner_image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      phone: row.owner_phone || "",
      email: row.owner_email || "",
      rating: 4.6,
      reviews: 10,
      responseTime: "30 minutes"
    },

    highlights: [
      { icon: "bed-outline", label: `${row.bedrooms || 0} Bedrooms` },
      { icon: "water-outline", label: `${row.bathrooms || 0} Bathrooms` },
      { icon: "resize-outline", label: `${row.sqft || 0} sqft` }
    ]
  };
}
