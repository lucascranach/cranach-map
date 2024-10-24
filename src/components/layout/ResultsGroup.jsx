import { useState } from "react"
import styled, { keyframes, css } from "styled-components"
import { LocationItem, List } from "./List"
import Card from "./Card"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

export function LocationGroup({ location, index }) {
  const [open, setOpen] = useState(true)

  function handleClick(e) {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <div className="location-group">
      <LocationItem index={index} onClick={handleClick}>
        <span className="results-amount">
          <span className="pound">#</span>
          <span className="number">{location.artworks.length}</span>
          <span>Werke gefunden</span>
        </span>
        <span className="results-location">
          <h3 className="results-location-name">{location.name}</h3>
          {!open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </LocationItem>
      {open && (
        <List>
          {location.artworks.map((data, index) => {
            return <Card key={index} data={data} properties={data.properties} />
          })}
        </List>
      )}
    </div>
  )
}

export default LocationGroup
