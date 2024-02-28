import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const TodayStyles = styled.section`
  .current-day {
    padding: 0 0.5rem 2.69rem;
    border-bottom: solid 1px ${COLORS.black}
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
  }
`
