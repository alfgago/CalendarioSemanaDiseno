import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const HeaderStyles = styled.header`
  display: flex;
  padding: 2.19rem 0.5rem 1rem;
  height: 5.5rem;
  align-items: center;
  .header-wrapper {
    display: flex;
    gap: 1.47rem;
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

