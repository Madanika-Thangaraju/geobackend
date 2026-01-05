export function mapProperty(row) {
  const priceValue = row.listing_type === "Rent"
    ? row.rent_price
    : row.price;

  return {
    id: row.id,
    price: priceValue
      ? `₹${Number(priceValue).toLocaleString("en-IN")}`
      : "Price on request",

    type: `${row.bhk} BHK`,
    title: row.title,

    description:
      row.description ||
      "Beautiful property with modern amenities in a prime location.",

    size: row.sqft ? `${row.sqft} sqft` : "N/A",

    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,

    dist: "1.5 km",
    address: row.address,

    match: "90% AI Match",

    status: row.is_available ? "Available" : "Sold Out",

    image: {
      uri: "https://images.unsplash.com/photo-1600596542815-e32c11e3b38c"
    },

    owner: {
      name: "Property Owner",
      image: {
        uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      rating: 4.6,
      reviews: 10,
      responseTime: "30 minutes"
    },

    highlights: [
      { icon: "bed-outline", label: `${row.bedrooms} Bedrooms` },
      { icon: "water-outline", label: `${row.bathrooms} Bathrooms` },
      { icon: "resize-outline", label: `${row.sqft} sqft` }
    ]
  };
}
