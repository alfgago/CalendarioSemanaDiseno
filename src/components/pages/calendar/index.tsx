import React, { useContext, useEffect, useRef, useState } from "react";
import { contextData } from "@/context/context";
import { CalendarStyles } from "./CalendarStyles";
import { prepareDaysForRendering } from "@/utils/parseData";
import { Event } from "@/components/event";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation'; 

import { Pagination, Controller, Navigation } from "swiper/modules"

export const CalendarComponents = () => {
  const { days } = useContext(contextData) as any;
  const parseData = prepareDaysForRendering(days);
  const horizontalSwiperRef = useRef(null);
  const verticalSwiperRef = useRef(null);

  const syncSwipers = (current, target) => {
    if (current && target && target.swiper 
      && target?.swiper?.realIndex !== current.realIndex
      && target?.swiper?.activeIndex !== current.activeIndex) {
      target.swiper.slideToLoop(current.realIndex);
    }
  }
  
  return (
    <CalendarStyles>
      <div className="selector">
        <Swiper
          slidesPerView={3}
          loop={true}
          modules={[Controller, Navigation]}
          navigation={true}
          centeredSlides={true}
          onSlideChange={(swiper) => syncSwipers(swiper, verticalSwiperRef.current)}
          ref={horizontalSwiperRef} 
        >
          {parseData.map(({ day }, index) => (
            <SwiperSlide key={'events-'+index}>
              <div className="day-selector-item">
                {dayShortName(day)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="days-wrapper">
        <Swiper
          direction={"vertical"}
          pagination={{ clickable: true }}
          slidesPerView={'auto'}
          spaceBetween={30}
          loop={true}
          modules={[Pagination, Controller]}
          style={{ height: "calc(100vh - 10rem)" }}
          ref={verticalSwiperRef} 
          onSlideChange={(swiper) => syncSwipers(swiper, horizontalSwiperRef.current)}
        >
          {parseData.map(({ day, events }, dayIndex) => (
            <SwiperSlide key={'events-day-'+dayIndex}>
              <div id={day} className="day">
                {events.map(({ date, hours }, index) => (
                  <Event key={index} date={date} day={day} group={hours} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </CalendarStyles>
  );
};

const dayShortName = (dayName: string): string => {
  const daysMap: { [key: string]: string } = {
    lunes: 'Lun',
    martes: 'Mar',
    miércoles: 'Mié',
    jueves: 'Jue',
    viernes: 'Vie',
    sábado: 'Sáb',
    domingo: 'Dom'
  };
  return daysMap[dayName.toLowerCase()] || dayName;
};
