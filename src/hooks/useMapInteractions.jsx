import { useEffect } from "react"

export const useMapInteractions = (mapRef) => {
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap()

      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        })
        const clusterId = features[0].properties.cluster_id
        map
          .getSource("paintings")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return

            map.flyTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            })
          })
      })

      map.on("click", "unclustered-point", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        map.flyTo({
          center: coordinates,
          zoom: 15,
        })
      })

      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer"
      })

      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = ""
      })

      map.on("mouseenter", "unclustered-point", () => {
        map.getCanvas().style.cursor = "pointer"
      })

      map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = ""
      })
    }
  }, [mapRef.current])
}
