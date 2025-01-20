import { useEffect, useRef, useState } from "react"
import { useAtom } from "jotai"
import { useSearchParams } from "react-router"

import { mapDataAtom, clusterAtom } from "@/store/store.jsx"
import { fetchData } from "@/helpers/fetchData.js"
import { Results } from "@/components/layout/Results"
import MapGl from "@/components/map/Map"

function App() {
  const [mapData, setMapData] = useAtom(mapDataAtom)

  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1]
    console.log(pathname)
    //
    ;(async () => {
      const data = await fetchData(
        import.meta.env.VITE_GEODATA_URL,
        import.meta.env.VITE_GEODATA_LOGIN,
        import.meta.env.VITE_GEODATA_PASSWORD,
        pathname
      )
      setMapData(data.data)
    })()
  }, [])

  return (
    <div id="map">
      <Results />
      <MapGl />
    </div>
  )
}

export default App
