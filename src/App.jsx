import { useEffect, useRef, useState } from "react"
import Map, { Source, Layer, Marker } from "react-map-gl"
import { useAtom } from "jotai"

import { mapDataAtom, demoMapDataAtom } from "@/store/store.jsx"
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
  const [demoMapData, setDemoMapData] = useAtom(demoMapDataAtom)
  const [resultsArr, setResultsArr] = useState()
  const [isMounted, setIsMounted] = useState(false)

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
      setMapData(data.data)
    }
    fetchDataAndParse()
  }, [])

  // highlight current cluster and non cluster
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
        >
          {
            <Source
              id="paintings"
              type="geojson"
              data={mapData ? mapData : demoMapData}
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
            >
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source>
          }

          <Marker latitude={viewport.lat} longitude={viewport.long} />
        </Map>
      </div>
    </>
  )
}

export default App
