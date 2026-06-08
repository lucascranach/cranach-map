import React from "react"
import { useAtom } from "jotai"
import { clusterAtom } from "@/store/store"
import { Aside } from "@/components/styled/Aside"
import { List } from "@/components/styled/List"
import ResultsGroup from "@/components/layout/ResultsGroup"
import { groupArtworksByLocation } from "@/helpers/groupArtworksByLocation.js"

export const Results = () => {
  const [resultsArr, setResultsArr] = useAtom(clusterAtom)
  return (
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
  )
}
