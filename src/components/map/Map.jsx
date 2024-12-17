import React, { useRef, useState, useEffect } from "react"
import { useAtom } from "jotai"
import Map, {
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
} from "react-map-gl"
import { useMapInteractions } from "@/hooks/useMapInteractions"
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "@/components/map/Layers.jsx"

import { fetchData } from "@/helpers/fetchData.js"
import { mapDataAtom, clusterAtom } from "@/store/store.jsx"

const MapGl = () => {
  const mapRef = useRef(null)

  const [mapData, setMapData] = useAtom(mapDataAtom)
  const [resultsArr, setResultsArr] = useAtom(clusterAtom)

  const [viewport, setViewport] = useState({
    long: 1,
    lat: 50,
    zoom: 4,
    bearing: 0,
    pitch: 0,
  })

  useMapInteractions(mapRef)

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

  return (
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
  )
}

export default MapGl
