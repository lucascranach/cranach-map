import { useEffect, useRef, useState } from "react"

import { useAtom } from "jotai"

import { mapDataAtom, clusterAtom } from "@/store/store.jsx"

import { Results } from "@/components/layout/Results"
import MapGl from "@/components/map/Map"

function App() {
  const [resultsArr, setResultsArr] = useAtom(clusterAtom)

  // entry point

  const mapContainerRef = useRef(null)

  return (
    <div id="map" ref={mapContainerRef}>
      <Results resultsArr={resultsArr} />
      <MapGl />
    </div>
  )
}

export default App
