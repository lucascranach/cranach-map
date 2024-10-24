import React from "react"
import styled from "styled-components"
import { colors } from "@/base/variables"

const StyledNav = styled.nav`
  width: 100%;
  min-height: 3.78rem;
  padding: 0.72rem 0;
  background-color: #fff;
  z-index: 2;
  border-bottom: 2px solid ${colors.lighter};
  display: flex;

  .logo {
    font-size: 1.89rem;
    display: block;
    img {
      height: 1rem;
      opacity: 0.3;
      transition: opacity 0.2s;
      padding-left: 1.17rem;
      padding-right: 1.17rem;
    }
  }

  .menu {
    display: flex;
    li {
      a {
        display: block;
        margin: 0 1.17rem;
        padding: 0.72rem 0;
        border-bottom: solid 2px transparent;
        color: #222;
        font-family: IBMPlexSans, sans-serif;
        font-size: 0.9rem;
        font-weight: 200;
      }
    }
  }
`

const Nav = () => {
  return (
    <StyledNav>
      <div className="logo">
        <img src={"./cda-logo-bw.svg"} alt="cda logo" />
      </div>
      <ul class="menu">
        <li>
          <a>Alle Werke</a>
        </li>
        <li>
          <a>Gemälde</a>
        </li>
        <li>
          <a>Archivalien</a>
        </li>
        <li>
          <a>Literatur</a>
        </li>
      </ul>
    </StyledNav>
  )
}

export default Nav
