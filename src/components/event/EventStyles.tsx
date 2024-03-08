import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const EventStyles = styled.section`
  border: 0.5px solid #000;
  padding: 0.81rem 0 1rem 1.06rem;
  width: 100%;
  min-height: 15rem;
  color: #000;
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
    color: #000;
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
  }
  .chip {
    display: flex;
    padding: 0.5rem 0.75rem;
    align-items: flex-start;
    gap: 0.625rem;
    border-radius: 6.25rem;
    background: #E2E2E2;
    color: #000;
    width: 93%;
    span {
      display: block;
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1;
      color: inherit;
      text-align: left;
    }

    &.mas {    
      background: #000;
      color: #fff;
      display: inline-flex;
      width: 5rem;
      height: 1.6rem;
      padding: 0;
      align-items: center;
      justify-content: center;
      span {
        display: inline-block;
        font-size: 0.65rem;
      }
    }
  }
`
