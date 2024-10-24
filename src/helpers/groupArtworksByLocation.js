export function groupArtworksByLocation(artworks) {
  const grouped = {}
  for (const artwork of artworks) {
    const location = artwork.properties.location
    if (!grouped[location]) {
      grouped[location] = []
    }
    grouped[location].push(artwork)
  }
  // Convert the object into an array of objects with 'name' instead of 'location'
  return Object.keys(grouped).map((location) => ({
    name: location,
    artworks: grouped[location],
  }))
}
