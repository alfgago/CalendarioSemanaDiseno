import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const LocationStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  .item {
    width: 85%;
    a {
      text-decoration: none;
      color: #000;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 300;
      line-height: 1.3125rem;
      letter-spacing: -0.02rem;
    }
  }
`
