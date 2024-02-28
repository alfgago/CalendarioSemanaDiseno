import moment from 'moment';

export const parseEvents = (data: any) => {
  const { records } = data;

  let todayEvents: any[] = [];
  let weekDaysEvents: { [key: string]: any[] } = {};

  records.forEach((record: any) => {
    if (record.fields && Object.keys(record.fields).length > 0) {
      const eventDate = moment(record.fields.Fecha);
      const today = moment();
      const dayOfWeek = eventDate.format('dddd').toLowerCase(); // "monday", "tuesday", ...
      const monthDayYear = eventDate.format("MM-DD-YYYY"); // "MM-DD-YYYY"
      const startTime = record.fields['Hora Inicio'];

      if (eventDate.isSame(today, 'day')) {
        todayEvents.push(record);
      }

      if (!weekDaysEvents[dayOfWeek]) weekDaysEvents[dayOfWeek] = [];
      const dateEventKey = `${monthDayYear}`;
      let dayEvents = weekDaysEvents[dayOfWeek].find(item => item.date === dateEventKey);
      if (!dayEvents) {
        dayEvents = { date: dateEventKey, events: {} };
        weekDaysEvents[dayOfWeek].push(dayEvents);
      }
      if (!dayEvents.events[startTime]) dayEvents.events[startTime] = [];
      dayEvents.events[startTime].push(record);
    }
  });

  // Ordenar los días de la semana según su orden natural y los items dentro de cada día por fecha
  Object.keys(weekDaysEvents).forEach(day => {
    weekDaysEvents[day].sort((a, b) => moment(a.date, "MM-DD-YYYY").diff(moment(b.date, "MM-DD-YYYY")));
  });

  const orderedWeekDaysEvents = Object.keys(weekDaysEvents).sort((a, b) => 
    moment().day(a).day() - moment().day(b).day()
  ).reduce((obj: any, key: any) => {
    obj[key] = weekDaysEvents[key];
    return obj;
  }, {});

  return {
    today: todayEvents,
    days: orderedWeekDaysEvents,
  };
};

export const prepareDaysForRendering = (days:any) => {
  return Object.entries(days).map(([day, events]:any) => ({
    day,
    events: Object.entries(events).map(([monthDayYear, details]:any) => {
      const correctDate = details.date; 
      const hours = details.events ? Object.entries(details.events).map(([hour, events]) => ({
        hour,
        events
      })) : [];

      return {
        date: correctDate,
        hours
      };
    })
  }));
};
