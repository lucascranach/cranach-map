import styled from "styled-components"

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  height: auto;
  max-height: 100%;
`

// Scroll Container
export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  overflow-y: scroll;
  padding: 0.75rem;
  padding: 1.2rem;
  gap: 1rem;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`
