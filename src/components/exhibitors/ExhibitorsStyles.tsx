import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const ExhibitorsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 0.5rem;
  .item {
    width: 2rem;
    height: 2rem;
    border-radius: 2rem;
    border: 0.5px solid #000;
    margin-right: -0.5rem;
    img {
      display: block;
      border-radius: 2rem;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
