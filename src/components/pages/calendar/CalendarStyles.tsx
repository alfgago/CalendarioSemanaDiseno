import styled from "styled-components"

import { COLORS, DEVICE } from "@/styles/variables"

export const CalendarStyles = styled.section`
  padding: 0 0.5rem;
  .selector {
    height: 4.5rem;
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
    border-top: 0.5px solid #000;
    padding-top: 1rem;
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

  .swiper-slide.swiper-slide-prev,
  .swiper-slide.swiper-slide-active,
  .swiper-slide.swiper-slide-next,
  .swiper-slide.swiper-slide-next + .swiper-slide {
    opacity: 1;
  }
`
