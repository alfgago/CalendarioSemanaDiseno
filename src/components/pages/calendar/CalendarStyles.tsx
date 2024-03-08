import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const CalendarStyles = styled.section`
  padding: 0 0.5rem;
  color: #000;
  .selector {
    height: 4rem;
    display: flex;
    align-items: center;
  }
  .days-wrapper {
    position: relative;
  }
  .day {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    width: 100%;
  }
  .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-vertical {
    display: none;
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 0.6rem;
    color: black;
  }
  .day-selector-item {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }
  .swiper-button-next {
    right: 7rem;
  }
  .swiper-button-prev {
    left: 7rem;
  }

  .swiper-slide {
    opacity: 0;
    transition: opacity .5s ease;
  }

  .selector .swiper-slide.swiper-slide-prev,
  .swiper-slide.swiper-slide-active,
  .swiper-slide.swiper-slide-next {
    opacity: 1;
  }

  .selector .swiper-slide.swiper-slide-active {
      color: #FF501B;
  }
`
