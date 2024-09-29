import { useEffect } from "react"
import Map, { Source, Layer, Marker } from "react-map-gl"
import { useAtom } from "jotai"

import { mapDataAtom } from "@/store/store.jsx"
import { fetchData } from "@/helpers/fetchData.js"
import { parseToGeoJson } from "@/helpers/parseToGeojson.js"
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "@/helpers/layers.js"

function App() {
  const [mapData, setMapData] = useAtom(mapDataAtom)

  // entry point
  const long = 7
  const lat = 51.07
  const zoom = 9.5

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
    <div id="map">
      <Map
        initialViewState={{
          latitude: lat,
          longitude: long,
          zoom: zoom,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle={import.meta.env.VITE_MAPBOX_STYLE}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        {mapData && (
          <Source
            id="earthquakes"
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
        <Marker latitude={lat} longitude={long} />
      </Map>
    </div>
  )
}

export default App
