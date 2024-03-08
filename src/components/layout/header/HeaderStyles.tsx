import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const HeaderStyles = styled.header`
  display: flex;
  padding: 0.75rem 0.5rem;
  height: auto;
  align-items: center;
  position: fixed;
  top: 0;
  max-width: 23.4375rem;
  width: 100%;
  z-index: 1000;
  background: #ffff;
  .header-wrapper{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .controls {
    display: flex;
    gap: 1rem;
    a {
      display: inline-flex;
      padding: 0.25rem 2.0625rem;
      flex-direction: column;
      align-items: flex-start;
      text-align: center;
      font-family: "Messina Sans";
      font-size: 0.875rem;
      font-weight: 300;
      line-height: 1.3125rem;
      letter-spacing: -0.02rem;
      border-radius: 6.25rem;
      border: 0.5px solid #000;
      background: ${COLORS.white};
      color:  ${COLORS.black};
      text-decoration:none;
      transition: ease all 0.3s;
      &.active {
        background: ${COLORS.black};
        color:  ${COLORS.white};
      }
      &:hover {
        background: ${COLORS.black};
        color:  ${COLORS.white};
      }
    }
  }
`

