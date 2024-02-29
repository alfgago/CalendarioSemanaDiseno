import moment from "moment"
import 'moment/locale/es'; // Importa la localización en español

moment.locale('es');

export const parseEvents = (data: any) => {
  const { records } = data;

  let todayEvents: any[] = [];
  let weekDaysEvents: { [key: string]: any[] } = {};

  records.forEach((record: any) => {
    if (record.fields && Object.keys(record.fields).length > 0) {
      const startDate = moment(record.fields.Fecha);
      const endDate = record.fields['Fecha Fin'] ? moment(record.fields['Fecha Fin']) : startDate;
      const startTime = record.fields["Hora Inicio"];
 
      let currentDate = startDate.clone();
      while (currentDate.diff(endDate, 'days') <= 0) {
        const dayOfWeek = currentDate.format("dddd").toLowerCase();
        const monthDayYear = currentDate.format("YYYY-MM-DD");

        if (currentDate.isSame(moment(), "day")) {
          todayEvents.push({ ...record, fields: { ...record.fields, Fecha: currentDate.format("YYYY-MM-DD") } });
        }

        if (!weekDaysEvents[dayOfWeek]) weekDaysEvents[dayOfWeek] = [];
        let dayEvent = weekDaysEvents[dayOfWeek].find(item => item.date === monthDayYear);

        if (!dayEvent) {
          dayEvent = { date: monthDayYear, events: {} };
          weekDaysEvents[dayOfWeek].push(dayEvent);
        }

        if (!dayEvent.events[startTime]) dayEvent.events[startTime] = [];
        dayEvent.events[startTime].push({ ...record, fields: { ...record.fields, Fecha: currentDate.format("YYYY-MM-DD") } });

        currentDate.add(1, 'days');
      }
    }
  });

  // Ordenar los días de la semana y los eventos dentro de cada día
  Object.keys(weekDaysEvents).forEach(day => {
    weekDaysEvents[day].forEach(dayEvent => {
      // Obtener las claves de horas (ejemplo: "8 AM", "2 PM", etc.) y ordenarlas
      const sortedTimes = Object.keys(dayEvent.events).sort((a, b) => {
        // Convertir las horas a formato 24 horas para comparación
        const timeA = convertTo24HourFormat(a);
        const timeB = convertTo24HourFormat(b);
        return moment(timeA, "HH:mm").diff(moment(timeB, "HH:mm"));
      });

      // Crear un nuevo objeto de eventos ordenados
      const sortedEvents = {};
      sortedTimes.forEach(time => {
        sortedEvents[time] = dayEvent.events[time];
      });

      // Actualizar los eventos del día con los eventos ordenados
      dayEvent.events = sortedEvents;
    });
  });


  const orderedWeekDaysEvents = Object.keys(weekDaysEvents)
    .sort((a, b) => {
      // Convertir los nombres de los días a valores numéricos, tratando el domingo como 7 en vez de 0
      const dayA = moment().day(a).day() || 7;
      const dayB = moment().day(b).day() || 7;
      return dayA - dayB;
    })
    .reduce((obj, key) => {
      obj[key] = weekDaysEvents[key];
      return obj;
    }, {});

  return {
    today: todayEvents,
    days: orderedWeekDaysEvents,
  };
};
export const prepareDaysForRendering = (days: any) => {
  return Object.entries(days).map(([day, events]: any) => ({
    day,
    events: Object.entries(events).map(([monthDayYear, details]: any) => {
      const correctDate = details.date
      const hours = details.events
        ? Object.entries(details.events).map(([hour, events]) => ({
            hour,
            events,
          }))
        : []

      return {
        date: correctDate,
        hours,
      }
    }),
  }))
}

export const getEvents = ( day:any ) => {
  const allEvents = Object.keys(day.events).reduce((acc, hour) => {
    return acc.concat(day.events[hour]);
  }, []);
  return allEvents
}

const convertTo24HourFormat = (timeString) => {
  // Considera "MD" como "12 PM" para propósitos de comparación
  if (timeString === "12MD") {
    timeString = "12 PM";
  }
  // Convierte la hora a formato 24 horas usando moment.js
  return moment(timeString, ["h A", "h:mm A"]).format("HH:mm");
};

