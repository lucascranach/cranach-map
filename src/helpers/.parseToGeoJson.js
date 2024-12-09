export function parseToGeoJson(data) {
  // Initialize a GeoJSON structure
  const geojson = {
    type: "FeatureCollection",
    features: [],
  }

  // Iterate over the results and transform them into GeoJSON features
  data.data.results.forEach((result) => {
    const lat = result.geometry.coordinates.lat
    const lng = result.geometry.coordinates.lng
    const description = result.properties.description
    const imgSrc = result.properties.imgSrc
    const title = result.properties.title

    // Only add the feature if both lat and lng are not null
    if (lat !== null && lng !== null) {
      const feature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [lng, lat], // GeoJSON uses [lng, lat] format
        },
        properties: {
          description: description,
          imgSrc: imgSrc,
          title: title,
        },
      }
      geojson.features.push(feature)
    }
  })

  return geojson
}
