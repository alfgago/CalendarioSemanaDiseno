import React from 'react';
import moment from 'moment';
import { TimeStyles } from './TimeStyles';

export const Time = ({ eventTime }: any) => {
  const currentDate = eventTime ? moment(eventTime) : moment();

  const data = {
    day: currentDate.format('dddd'),
    dayOfMonth: currentDate.format('DD'),
    month: currentDate.format('MMM'),
    monthNumber: currentDate.format('MM')
  };

  return (
    <TimeStyles>
      <div className="day">
        <p>{data.day}</p>
      </div>
      <div className="day-month">
        <h3>
          {
            (!eventTime ? ( `${data.dayOfMonth} . ${data.monthNumber}` )  : data.dayOfMonth)
          }
        </h3>
      </div>
      <div className="month">
        <h4>{data.month}</h4> 
      </div>
    </TimeStyles>
  );
};
