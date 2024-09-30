import React from "react"
import styled from "styled-components"
import { trimText } from "@/helpers/trimText.js"

const StyledCard = styled.div`
  width: 100%;
  display: flex;
  padding: 1rem;
  background-color: #e5e5e5;
  gap: 1rem;
  border-bottom: 3px solid #ffcc00;
  border-radius: 0.15rem;
  img {
    width: 5rem;
    aspect-ratio: auto;
    object-fit: cover;
  }
  .description {
    &::after {
      content: "...";
    }
  }
`

function Card(props) {
  return (
    <StyledCard>
      {props.data.properties.imgSrc ? (
        <img src={props.data.properties.imgSrc} alt="" />
      ) : null}
      <div>
        <h3>{props.data.properties.title}</h3>
        {props.data.properties.description && (
          <p className="description">
            {trimText(props.data.properties.description, 80)}
          </p>
        )}
      </div>
    </StyledCard>
  )
}

export default Card
