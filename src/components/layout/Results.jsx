import styled from "styled-components"

const Results = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  // outline: 1px solid red;
  width: 28rem;
  height: 100vh;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`

export default Results
