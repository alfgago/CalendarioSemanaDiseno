import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const EventStyles = styled.section`
  border: 0.5px solid #000;
  padding: 0.81rem 0 1rem 1.06rem;
  width: 100%;
  min-height: 10rem;
  .list {
    flex: 1;
  }
  a {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    height: 100%;
    text-decoration: none !important;
  }
  .group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0.5rem;
    border-top: 0.5px solid #000;
    padding-bottom: 1rem;
    &:last-child {
      padding-bottom: 0rem;
    }
    .hour {
      span {
        font-weight: 400;
      }
    }
    .chip {
      display: flex;
      padding: 0.5rem 0.75rem;
      align-items: flex-start;
      gap: 0.625rem;
      border-radius: 6.25rem;
      background: #E2E2E2;
      width: 93%;
      p {
        font-size: 0.75rem;
        font-weight: 300;
        line-height: 1;
      }
    }
  }
`
