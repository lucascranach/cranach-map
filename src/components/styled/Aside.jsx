import styled from "styled-components"
import { sizes } from "@/base/variables"

// 24px

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: calc(${sizes.l} * 2 + 0.5rem);
  left: 0;
  z-index: 1;
  height: auto;
  max-height: calc(100vh - ${sizes.l} * 2 - 0.5rem);
  /* padding: 0.45rem; */
`
