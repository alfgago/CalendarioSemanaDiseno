import React, { useContext } from 'react';
import { contextData } from '@/context/context';
import { CalendarStyles } from './CalendarStyles';
import { prepareDaysForRendering } from '@/utils/parseData';
import { Event } from '@/components/event';

export const CalendarComponents = () => { 
  const { days } = useContext(contextData) as any;
  const parseData = prepareDaysForRendering(days);
  
  console.log(parseData)

  return (
    <CalendarStyles>
      <div className="selector">
        Day Carrousel
      </div>
      <div className="days-wrapper">
        {parseData.map(({ day, events }, dayIndex) => (
          <div key={dayIndex} id={day} className="day">
            {events.map(({ date, hours }, index) => (
              <Event key={index} date={date} group={hours}/>
            ))}
          </div>
        ))}
      </div>
    </CalendarStyles>
  );
};

