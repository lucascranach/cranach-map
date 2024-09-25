import { useEffect } from "react"
import Map, { Source, Layer } from "react-map-gl"
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

  // centering map on Europe
  let long = 13.65
  let lat = 50.9847674

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
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
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
      </Map>
    </div>
  )
}

export default App
