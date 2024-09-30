import { useEffect, useRef, useState } from "react"
import Map, { Source, Layer, Marker } from "react-map-gl"
import { useAtom } from "jotai"

import { mapDataAtom } from "@/store/store.jsx"
import { fetchData } from "@/helpers/fetchData.js"
import { parseToGeoJson } from "@/helpers/parseToGeojson.js"
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "@/components/map/Layers.jsx"

function App() {
  const [mapData, setMapData] = useAtom(mapDataAtom)
  // entry point
  const [viewport, setViewport] = useState({
    long: 7,
    lat: 51.07,
    zoom: 9.5,
    bearing: 0,
    pitch: 0,
  })
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)

  const handleClick = (e) => {
    // console.log(mapRef.current)

    const features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ["unclustered-point", "clusters", "cluster-count"],
    })
    if (features.length) {
      const feature = features[0]
      const clusterId = feature.properties.cluster_id
      console.log(feature)
      mapRef.current
        .getSource("paintings")
        .getClusterChildren(clusterId, (error, features) => {
          if (!error) {
            console.log("Cluster children:", features)
          }
        })
    }
  }

  useEffect(() => {
    const fetchDataAndParse = async () => {
      const data = await fetchData(
        import.meta.env.VITE_GEODATA_URL,
        import.meta.env.VITE_GEODATA_LOGIN,
        import.meta.env.VITE_GEODATA_PASSWORD
      )
      setMapData(parseToGeoJson(data))
    }
    fetchDataAndParse()
  }, [])

  return (
    <div id="map" ref={mapContainerRef}>
      <Map
        initialViewState={{
          latitude: viewport.lat,
          longitude: viewport.long,
          zoom: viewport.zoom,
          bearing: viewport.bearing,
          pitch: viewport.pitch,
        }}
        onClick={handleClick}
        ref={mapRef}
        mapStyle={import.meta.env.VITE_MAPBOX_STYLE}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
      >
        {mapData && (
          <Source
            id="paintings"
            type="geojson"
            data={mapData}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
        )}
        <Marker latitude={viewport.lat} longitude={viewport.long} />
      </Map>
    </div>
  )
}

export default App