import { useEffect, useState } from "react"
import { useAtom } from "jotai"
import styled, { keyframes, css } from "styled-components"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { useHover } from "@uidotdev/usehooks"

import { colors } from "@/base/variables"
import { hoverLocationAtom } from "@/store/store"

import { List } from "./List"
import Card from "./Card"

const StyledLocationGroup = styled.div`
  background-color: white;
`

const LocationItem = styled.li`
  width: 28rem;

  border-bottom: 1px solid ${colors.accent};

  position: sticky;
  top: 0;
  /* top: ${({ index }) =>
    index * 3.5}rem; // Adjust the multiplier as needed */
  background-color: ${colors.lighter};
  background-color: ${colors.lightest};

  padding: 1rem;
  display: flex;
  justify-content: space-between;
  z-index: 3;
  font-weight: 200;
  font-size: 0.9rem;
  cursor: pointer;
  .results-location {
    display: flex;
    gap: 0.5rem;
  }
  .results-amount {
    display: flex;
    gap: 0.2rem;

    .number {
      color: ${colors.decoration};
    }
    .pound {
      color: ${colors.light};
    }
  }
  svg {
    color: ${colors.accent};
  }
`

export function LocationGroup({ location, index }) {
  const [open, setOpen] = useState(true)
  const [hoverLocation, setHoverLocation] = useAtom(hoverLocationAtom)
  const [ref, hovering] = useHover()

  function handleClick(e) {
    e.preventDefault()
    setOpen(!open)
  }

  hovering ? console.log(location.name) : ""

  return (
    <StyledLocationGroup ref={ref}>
      <LocationItem index={index} onClick={handleClick}>
        <span className="results-location">
          <h3 className="results-location-name">{location.name}</h3>
        </span>
        <span className="results-amount">
          <span className="pound">#</span>
          <span className="number">{location.artworks.length}</span>
          {location.artworks.length === 1 ? (
            <span>Werk gefunden</span>
          ) : (
            <span>Werke gefunden</span>
          )}

          {!open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </LocationItem>
      {open && (
        <List>
          {location.artworks.map((data, index) => {
            return (
              <Card
                key={index}
                data={data}
                properties={data.properties}
                location={location}
              />
            )
          })}
        </List>
      )}
    </StyledLocationGroup>
  )
}

export default LocationGroup
