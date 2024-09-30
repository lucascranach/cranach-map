import React from "react"
import styled from "styled-components"
import { trimText } from "@/helpers/trimText.js"

const StyledCard = styled.li`
  width: 32rem;
  height: 14rem;
  display: flex;

  background-color: white;

  // border-radius: 0.3rem;
  position: relative;

  &:hover {
    cursor: pointer;
    .img-container {
      // background-color: #666666;
      background-color: #0003;
    }
    .content {
      .title {
        text-decoration: underline;
      }
    }
  }

  .img-container {
    border-bottom: 3px solid #ffcc00;

    // background-color: #e5e5e5;
    background-color: #0000001a;
    transition: background-color 0.2s;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0.5rem;
    width: 10rem;
    min-width: 10rem;
    max-width: 10rem;

    object-fit: contain;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .content {
    font-family: IBMPlexSans, sans-serif;
    padding: 1rem;
    color: #444;
    font-weight: 500;
    line-height: 120%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .title {
      color: black;
      font-weight: 400;
      font-size: 1.1rem;
    }
    .description {
      font-weight: 200;
      &::after {
        content: "...";
      }
    }
  }
`

function Card(props) {
  return (
    <StyledCard>
      <div className="img-container">
        {props.data.properties.imgSrc ? (
          <img src={props.data.properties.imgSrc} alt="" />
        ) : (
          <span>Kein Bild vorhanden</span>
        )}
      </div>
      <div className="content">
        <h2 className="title">{props.data.properties.title}</h2>
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
