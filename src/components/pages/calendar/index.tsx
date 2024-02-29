import { useContext, useEffect, useState } from "react"
import { contextData } from "@/context/context"
import { CalendarStyles } from "./CalendarStyles"
import { prepareDaysForRendering } from "@/utils/parseData"
import { Event } from "@/components/event"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import 'swiper/css/navigation'; 

import { Pagination, Controller, Navigation } from "swiper/modules"
import moment from "moment"

export const CalendarComponents = () => {
  const { days } = useContext(contextData) as any
  const parseData = prepareDaysForRendering(days)

  const [swiperInstance, setSwiperInstance] = useState(null)
  const [firstSwiper, setFirstSwiper] = useState(null);

  useEffect(() => {
    if (swiperInstance) {
      const adjustTransform = () => {
        if (!swiperInstance.wrapperEl) return
        swiperInstance.wrapperEl.style.transition = "transform 0.5s ease-in-out"

        let totalHeight = 0
        for (let i = 0; i < swiperInstance.activeIndex; i++) {
          totalHeight +=
            swiperInstance.slides[i].offsetHeight +
            swiperInstance.params.spaceBetween
        }
        swiperInstance.wrapperEl.style.transform = `translate3d(0px, ${-totalHeight}px, 0px)`
      }
      swiperInstance.on("slideChange", adjustTransform)
      adjustTransform()
      return () => {
        if (swiperInstance) {
          swiperInstance.off("slideChange", adjustTransform)
        }
      }
    }
  }, [swiperInstance])

  return (
    <CalendarStyles>
      <div className="selector">
        <Swiper
          onSwiper={setFirstSwiper}
          controller={{ control: swiperInstance }}
          slidesPerView={3}
          loop={true}
          modules={[Controller, Navigation]} 
          navigation={true} 
          allowTouchMove={false} 
        >
          {parseData.map(({ day }, index) => (
            <SwiperSlide key={index}>
              <div className="day-selector-item">
                {dayShortName(day)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="days-wrapper">
        <Swiper
          onSwiper={setSwiperInstance}
          controller={{ control: firstSwiper }}
          direction={"vertical"}
          pagination={{ clickable: true }}
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          modules={[Pagination, Controller]}
          style={{ height: "calc(100vh - 10rem)" }}
          onSlideChange={() => console.log("slide change")}
        >
          {parseData.map(({ day, events }, dayIndex) => (
            <SwiperSlide key={dayIndex}>
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
  )
}

const dayShortName = (dayName: string): string => {
  const daysMap: { [key: string]: string } = {
    lunes: 'Lun.',
    martes: 'Mar.',
    miércoles: 'Mié.',
    jueves: 'Jue.',
    viernes: 'Vie.',
    sábado: 'Sáb.',
    domingo: 'Dom.'
  };
  return daysMap[dayName.toLowerCase()] || dayName;
};
