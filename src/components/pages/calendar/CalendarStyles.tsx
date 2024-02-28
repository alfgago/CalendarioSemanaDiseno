import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const CalendarStyles = styled.section`
  padding: 0 0.5rem;
  .selector {
    height: 4.5rem;
    display: flex;
    align-items: center;
    padding-bottom: 1rem
  }
  .days-wrapper,
  .day {
    display: flex;
    flex-wrap: wrap; 
    gap: 1.5rem;
    width: 100%;
  }
`
