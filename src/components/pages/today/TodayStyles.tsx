import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const TodayStyles = styled.section`
  padding-bottom:2.5rem;
  .current-day {
    padding: 0 0.5rem 2.69rem;
    border-bottom: solid 1px ${COLORS.black};
    display: flex;
    align-items: flex-end;
    gap: 3rem;
    position:relative;
    &:before {
      width: 0.5px;
      height: 35%;
      content: '';
      background: black;
      position: absolute;
      top: 50%;
      left: 36%;
      transform: translate(-50%, -50%);
    }
    .upcoming-events {
      display: flex;
      flex-direction: column;
      gap: 0.44rem;
      margin-bottom: -0.5rem;
      .upcoming-item {
        display: flex;
        flex-direction: column;
        strong {
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 600;
          line-height: 1.3125rem; /* 150% */
          letter-spacing: -0.02rem;
        }
        span {
          text-align: left;
          line-height: 1;
          display: block;
          padding-top: 0.2rem;
        }
      }
    }
  }
  .heading {
    padding: 1.5rem 0.5rem 1.81rem;
    p {
      font-style: normal;
      font-weight: 600;
    }
  }
  .task-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 0 0.5rem;
    width: 100%;
    .wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
`
