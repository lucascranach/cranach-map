import React from "react"
import styled from "styled-components"
import { useAtom, useAtomValue } from "jotai"

import { sizes } from "@/base/variables"

import CDALogo from "@/assets/cda-logo-bw.svg"

import { languageAtom } from "@/store/store.jsx"

const StyledNav = styled.nav`
  display: flex;
  width: 100%;
  padding: ${sizes.m} ${sizes.l};

  ul {
    width: 100%;
    display: flex;
    column-gap: ${sizes.xxl};
    align-items: center;
    li {
    }
  }

  .cda-logo-wrap {
    width: 12.6rem;
    padding: 0;
    margin-right: -3px;
    .cda-logo {
      height: 1.2rem;
      opacity: 0.3;
    }
  }
  .apps-icon-wrap {
    display: flex;
    align-items: center;
    column-gap: ${sizes.s};
    text-decoration: none;
    color: black;
    .apps-icon {
      height: 1.2rem;
      opacity: 1;

      margin-right: auto 0.36rem;
    }
    .text {
      font-family: IBMPlexSans;
      font-size: 0.9rem;
    }
  }
`

const Nav = () => {
  const lang = useAtomValue(languageAtom)

  const translations = {
    en: "go to works search",
    de: "zur Werksuche",
  }

  return (
    <StyledNav>
      <ul>
        <li>
          <a href="https://lucascranach.org/" className="cda-logo-wrap">
            <img className="cda-logo" src={CDALogo} alt="CDA Logo" />
          </a>
        </li>
        <li>
          <a
            href={`https://lucascranach.org/${lang}/search?kind=works&loadLatestSearchConfiguration=true`}
            className="apps-icon-wrap"
          >
            <span className="material-icons">apps</span>
            <span className="text">{translations[lang]}</span>
          </a>
        </li>
      </ul>
    </StyledNav>
  )
}

export default Nav
