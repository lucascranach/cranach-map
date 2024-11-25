import React from "react"
import styled from "styled-components"

import { colors } from "@/base/variables"
import { trimText } from "@/helpers/trimText"

const Li = styled.li`
  width: 28rem;

  min-height: 11rem;
  position: relative;
  display: flex;
  background-color: ${colors.lighter};
  border-bottom: 1px solid ${colors.accent};

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

    /* padding: 0 1rem; */
    padding: 1rem;
    width: 10rem;
    min-width: 10rem;
    max-width: 10rem;
    max-height: 11rem;
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
      gap: 0.27rem;

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

/*
  properties": {
"dating": "1501",
"img_src": "https://lucascranach.org/imageserver-2022/AT_KHM_GG6905_FR001/01_Overall/AT_KHM_GG6905_FR001_2008-08_Overall-s.jpg",
"inventory_number": "AT_KHM_GG6905",
"involved_persons": [
"Lucas Cranach der Ältere"
],
"location": "Wien",
"medium": "Malerei auf Lindenholz (Tilia sp.)\n[Klein, Bericht 2013]\n[P. Klein, Bericht von 1980]",
"owner": "Kunsthistorisches Museum, Wien",
"title": "Kreuzigung Christi, sog. \"Schottenkreuzigung\""
}

*/

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
          <h2 className="title">
            {trimText(properties.title, 80)}, {properties.dating}
          </h2>
          <h3 className="medium">{trimText(properties.medium, 80)}</h3>
          <h3 className="location">{properties.owner}</h3>
        </div>
      </a>
    </Li>
  )
}

export default Card
