import styled, { keyframes, css } from "styled-components"

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
  gap: 0.5rem;
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
