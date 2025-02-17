import { useEffect, useRef, useState } from "react"
import { useAtom, useAtomValue } from "jotai"
import { useSearchParams } from "react-router"

import { mapDataAtom, clusterAtom, languageAtom } from "@/store/store.jsx"
import { fetchData } from "@/helpers/fetchData.js"
import { Results } from "@/components/layout/Results"
import MapGl from "@/components/map/Map"
import Nav from "./components/layout/Nav"

function App() {
  const [mapData, setMapData] = useAtom(mapDataAtom)
  const lang = useAtomValue(languageAtom)

  useEffect(() => {
    console.log(lang)
    //
    ;(async () => {
      const data = await fetchData(
        import.meta.env.VITE_GEODATA_URL,
        import.meta.env.VITE_GEODATA_LOGIN,
        import.meta.env.VITE_GEODATA_PASSWORD,
        lang
      )
      setMapData(data.data)
    })()
  }, [])

  return (
    <div id="map">
      <Results />
      <Nav />
      <MapGl />
    </div>
  )
}

export default App
