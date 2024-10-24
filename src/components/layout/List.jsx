import { useState } from "react"

import styled, { keyframes, css } from "styled-components"

import { colors } from "@/base/variables"

export const LocationItem = styled.li`
  /* outline: 1px solid red; */

  width: 32rem;
  border-bottom: 1px solid ${colors.accent};
  position: sticky;
  top: 0;
  /* top: ${({ index }) =>
    index * 3.5}rem; // Adjust the multiplier as needed */
  background-color: ${colors.lighter};
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
    svg {
      color: ${colors.accent};
    }
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
`

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

// Scroll Container
export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  overflow-y: scroll;
  /* padding: 0.75rem; */
  /* padding: 1.2rem; */
  /* padding: 0.45rem; */
  gap: 0.45rem;

  /* background-color: white; */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  ${({ animate }) =>
    animate &&
    css`
      animation: ${slideInFromLeft} 0.3s ease-out forwards;
    `}
`
