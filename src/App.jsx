import { useEffect, useRef, useState } from "react"
import Map, {
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
} from "react-map-gl"
import { useAtom } from "jotai"

import { mapDataAtom } from "@/store/store.jsx"
import { fetchData } from "@/helpers/fetchData.js"
import { groupArtworksByLocation } from "@/helpers/groupArtworksByLocation.js"

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "@/components/map/Layers.jsx"
import { Aside } from "@/components/layout/Aside"
import { List } from "@/components/layout/List"
import ResultsGroup from "./components/layout/ResultsGroup"

function App() {
  const [mapData, setMapData] = useAtom(mapDataAtom)

  const [resultsArr, setResultsArr] = useState()
  const [currentCluster, setCurrentCluster] = useState()

  // entry point
  const [viewport, setViewport] = useState({
    long: 1,
    lat: 50,
    zoom: 4,
    bearing: 0,
    pitch: 0,
  })
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)

  let hoveredClusterId = null // Define hoveredClusterId here

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

  // cluster click
  const handleClick = (e) => {
    // Clear results
    setResultsArr([])

    console.log(e)

    const features = mapRef.current.queryRenderedFeatures(e.point, {
      layers: ["unclustered-point", "clusters", "cluster-count"],
    })

    console.log(features)

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

  // fetch Data from Api
  useEffect(() => {
    const fetchDataAndParse = async () => {
      const data = await fetchData(
        import.meta.env.VITE_GEODATA_URL,
        import.meta.env.VITE_GEODATA_LOGIN,
        import.meta.env.VITE_GEODATA_PASSWORD
      )
      setMapData(data.data)
    }
    fetchDataAndParse()
  }, [])

  // cluster effects
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap()

      // Zoom in
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

      // Zoom in
      map.on("click", "unclustered-point", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        map.flyTo({
          center: coordinates,
          zoom: 15,
        })
      })

      map.on("mousemove", "clusters", (e) => {
        map.getCanvas().style.cursor = "pointer"
        if (e.features.length > 0) {
          if (hoveredClusterId) {
            map.setFeatureState(
              { source: "paintings", id: hoveredClusterId },
              { hover: false }
            )
          }
          hoveredClusterId = e.features[0].id
          map.setFeatureState(
            { source: "paintings", id: hoveredClusterId },
            { hover: true }
          )
        }
      })

      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = ""
        if (hoveredClusterId) {
          map.setFeatureState(
            { source: "paintings", id: hoveredClusterId },
            { hover: false }
          )
        }
        hoveredClusterId = null
      })

      map.on("mousemove", "unclustered-point", () => {
        map.getCanvas().style.cursor = "pointer"
      })

      map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = ""
      })
    }
  }, [mapRef.current])

  return (
    <>
      <div id="map" ref={mapContainerRef}>
        <Aside>
          {resultsArr && resultsArr[0] ? (
            <List animate={resultsArr}>
              {groupArtworksByLocation(resultsArr).map((location, index) => {
                return (
                  <ResultsGroup key={index} location={location} index={index} />
                )
              })}
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
          maxZoom={14}
          ref={mapRef}
          mapStyle={import.meta.env.VITE_MAPBOX_STYLE}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
          projection="mercator"
        >
          <NavigationControl position="top-right" />
          <ScaleControl />
          {
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
          }
        </Map>
      </div>
    </>
  )
}

export default App
