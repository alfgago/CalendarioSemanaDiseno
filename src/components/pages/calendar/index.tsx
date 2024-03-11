import React, { useContext, useEffect, useRef } from "react";
import { contextData } from "@/context/context";
import { CalendarStyles } from "./CalendarStyles";
import { prepareDaysForRendering } from "@/utils/parseData";
import { Event } from "@/components/event";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation'; 

import { Pagination, Controller, Navigation } from "swiper/modules"
import moment from "moment";

export const CalendarComponents = () => {
  const { days } = useContext(contextData) as any;
  const parseData = prepareDaysForRendering(days);

  const horizontalSwiperRef = useRef(null);
  const verticalSwiperRef = useRef(null);

  // Obtener el día actual en la zona horaria de Costa Rica
  const currentDate = moment.tz("America/Costa_Rica").format("dddd-DD");
  
  // Encontrar el índice del día actual en parseData
  let currentIndex = parseData.findIndex(item => item.day === currentDate);
  if (currentIndex === -1) {
    const todayIndex = moment.tz("America/Costa_Rica").format("DD");
    currentIndex = parseData.findIndex(item => parseInt(item.day.split("-")[1]) >= parseInt(todayIndex));
  }

  // Función para sincronizar los Swipers
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
          initialSlide={currentIndex} // Establecer el índice activo
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
          style={{ height: "calc(100vh - 7.5rem)" }}
          ref={verticalSwiperRef} 
          initialSlide={currentIndex} // Establecer el índice activo
          onSlideChange={(swiper) => syncSwipers(swiper, horizontalSwiperRef.current)}
        >
          {parseData.map(({ day, events }, dayIndex) => (
            <SwiperSlide key={'events-day-'+dayIndex}>
              <div id={day} className="day">
                <Event 
                  key={dayIndex} 
                  events={events}
                  slug={day}  
                />
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
    lunes: 'LUN',
    martes: 'MAR',
    miércoles: 'MIÉ',
    jueves: 'JUE',
    viernes: 'VIE',
    sábado: 'SÁB',
    domingo: 'DOM'
  };

  const [day, number] = dayName.split('-');
  const abbreviatedDay = daysMap[day.toLowerCase()] || day.toUpperCase();
  
  return number ? `${abbreviatedDay}-${number.trim()}` : abbreviatedDay;
};
