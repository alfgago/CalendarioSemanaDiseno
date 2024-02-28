import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const TaskStyles = styled.section`
  border: 0.5px solid #000; 
  .task {
    padding: 1rem 1.06rem 1.06rem 1rem;
    .data{
      display:flex;
      padding-bottom: 1rem;
      .title {
        width: clamp(1rem, 70%, 13.4375rem);
        h2 {
          font-size: 1.125rem;
          font-style: normal;
          font-weight: 600;
          line-height: 1.5rem; /* 133.333% */
          letter-spacing: -0.02rem;
        }
      }
      .exhibitors {
        flex: 1;
      }
    }
    .info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span {
        font-size: 0.875rem;
        font-weight: 300;
      } 
    }
  }
  .cover {
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
