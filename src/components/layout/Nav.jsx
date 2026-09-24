import React from "react"
import styled from "styled-components"
import { useAtom, useAtomValue } from "jotai"

import { sizes, colors, transitions } from "@/base/variables"

import CDALogo from "@/assets/cda-logo-bw.svg"

import { languageAtom, darkModeAtom } from "@/store/store.jsx"

const StyledNav = styled.nav`
  display: flex;
  width: 100%;
  padding: ${sizes.m} 0 ${sizes.m} ${sizes.l};
  background-color: ${p => p.$isDark ? colors.dark : colors.lightest};
  transition: background-color ${transitions.fast} ease;

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
      filter: ${p => p.$isDark ? "invert(1)" : "none"};
    }
  }
  .apps-icon-wrap {
    display: flex;
    align-items: center;
    column-gap: ${sizes.s};
    text-decoration: none;
    color: ${p => p.$isDark ? colors.lightest : colors.darkest};
    transition: opacity ${transitions.fast} ease;
    &:hover {
      opacity: 0.7;
    }
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

  .theme-toggle-item {
    margin-left: auto;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: ${p => p.$isDark ? colors.lightest : colors.darkest};
    padding: 0;
    display: flex;
    align-items: center;
    transition: opacity ${transitions.fast} ease;

    &:hover {
      opacity: 0.7;
    }
  }
`


const Nav = () => {
  const lang = useAtomValue(languageAtom)
  const [isDark, setIsDark] = useAtom(darkModeAtom)

  const translations = {
    en: "go to works search",
    de: "zur Werksuche",
  }

  return (
    <StyledNav $isDark={isDark}>
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
        <li className="theme-toggle-item">
          <button
            aria-label="Toggle theme"
            className="theme-toggle"
            onClick={() => setIsDark(v => !v)}
          >
            <span className="material-icons">{isDark ? "light_mode" : "dark_mode"}</span>
          </button>
        </li>
      </ul>
    </StyledNav>
  )
}

export default Nav
