import { useEffect, useRef, useState } from "react"
import Map, { Source, Layer, Marker } from "react-map-gl"
import { useControls } from "leva"
import { useAtom } from "jotai"

import { mapDataAtom } from "@/store/store.jsx"
import { fetchData } from "@/helpers/fetchData.js"
import { parseToGeoJson } from "@/helpers/parseToGeojson.js"
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "@/components/map/Layers.jsx"
import { Aside } from "@/components/layout/Aside"
import { List } from "@/components/layout/List"
import { Button } from "@/components/layout/Button"
import Card from "@/components/layout/Card"
import Nav from "./components/layout/Nav"

function App() {
  const [mapData, setMapData] = useAtom(mapDataAtom)
  const [resultsArr, setResultsArr] = useState()
  const [isMounted, setIsMounted] = useState(false)

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

  const fetchClusterChildren = (clusterId, sourceId, results) => {
    mapRef.current
      .getSource(sourceId)
      .getClusterChildren(clusterId, (error, features) => {
        if (!error) {
          features.forEach((feature) => {
            if (feature.properties.cluster) {
              // If the feature is a cluster, fetch its children
              fetchClusterChildren(
                feature.properties.cluster_id,
                sourceId,
                results
              )
            } else {
              // If the feature is not a cluster, add it to the results
              results.push(feature)
            }
          })
          setResultsArr([...results])
        }
      })
  }

  const handleClick = (e) => {
    // Clear results
    setResultsArr([])

    const features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ["unclustered-point", "clusters", "cluster-count"],
    })

    if (features.length) {
      const feature = features[0]
      const clusterId = feature.properties.cluster_id
      const sourceId = "paintings"

      if (feature.properties.cluster) {
        // If the feature is a cluster, fetch its children
        fetchClusterChildren(clusterId, sourceId, [])
      } else {
        // If the feature is not a cluster, add it to the results
        setResultsArr([feature])
      }
    }
  }

  useEffect(() => {
    const fetchDataAndParse = async () => {
      const data = await fetchData(
        import.meta.env.VITE_GEODATA_URL,
        import.meta.env.VITE_GEODATA_LOGIN,
        import.meta.env.VITE_GEODATA_PASSWORD
      )
      console.log(data)
      // setMapData(parseToGeoJson(data))
      setMapData(data.data)
    }
    fetchDataAndParse()
  }, [])

  return (
    <>
      {/* <Nav /> */}
      <div id="map" ref={mapContainerRef}>
        <Aside>
          {resultsArr && resultsArr[0] ? (
            <List animate={resultsArr}>
              {resultsArr &&
                resultsArr.map((data, index) => (
                  <Card key={index} data={data} properties={data.properties} />
                ))}
            </List>
          ) : null}
        </Aside>

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
    </>
  )
}

export default App
