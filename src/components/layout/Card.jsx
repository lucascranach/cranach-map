import React from "react"
import styled from "styled-components"

import { colors } from "@/base/variables"

const Li = styled.li`
  width: 32rem;
  height: 11rem;
  position: relative;
  display: flex;
  background-color: ${colors.lighter};
  border-bottom: 1px solid ${colors.accent};

  &:first-of-type {
    margin-top: 0.5rem;
  }

  a {
    cursor: pointer;
  }

  /* Image */
  figure {
    transition: background-color 0.2s;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 1rem;
    width: 10rem;
    min-width: 10rem;
    max-width: 10rem;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
    figcaption {
      text-align: center;
    }
  }

  /* Title & Location */

  &:hover .content {
    background-color: ${colors.light};
  }

  .content {
    width: 100%;

    text-decoration: none;
    padding: 1.17rem 1.17rem 1.89rem;
    transition: background-color 0.2s;

    div {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      /* Title */
      h2 {
        font-family: IBMPlexSans, sans-serif;
        color: ${colors.darkest};
        font-weight: 400;
        font-size: 0.9rem;
        line-height: 120%;
      }
      /* Location */
      h3 {
        font-family: IBMPlexSans, sans-serif;
        color: ${colors.dark};
        font-weight: 400;
        font-size: 0.9rem;
        font-weight: 200;
        line-height: 120%;
      }
    }
  }
`

const Card = ({ properties }) => {
  return (
    <Li>
      <figure>
        <a
          href={
            "https://lucascranach.org/intern/artefacts-preview/de/" +
            properties.inventory_number
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={properties.img_src} />
        </a>
        {!properties.img_src && <figcaption>Kein Bild vorhanden</figcaption>}
      </figure>
      <a
        href={
          "https://lucascranach.org/intern/artefacts-preview/de/" +
          properties.inventory_number
        }
        className="content"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <h2 className="title">{properties.title}</h2>
          <h3 className="location">{properties.location}</h3>
        </div>
      </a>
    </Li>
  )
}

export default Card
