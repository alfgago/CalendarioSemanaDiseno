import moment from "moment"
import 'moment/locale/es'; // Importa la localización en español

moment.locale('es');

export const parseEvents = (data: any) => {
  const { records } = data;

  let todayEvents: any[] = [];
  // Cambio: Utilizar un objeto para mantener eventos por fechas exactas
  let datesEvents: { [dateKey: string]: any } = {};

  records.forEach((record: any) => {
    if (record.fields && Object.keys(record.fields).length > 0) {
      const startDate = moment(record.fields.Fecha);
      const endDate = record.fields['Fecha Fin'] ? moment(record.fields['Fecha Fin']) : startDate;
      const startTime = record.fields["Hora Inicio"];

      let currentDate = startDate.clone();
      while (currentDate.diff(endDate, 'days') <= 0) {
        const monthDayYear = currentDate.format("YYYY-MM-DD");

        if (currentDate.isSame(moment(), "day")) {
          todayEvents.push(record);
        }

        // Clave única para cada día
        const dateKey = currentDate.format("dddd-DD"); // Ejemplo: "lunes-11-marzo"

        if (!datesEvents[dateKey]) {
          datesEvents[dateKey] = { date: monthDayYear, events: {} };
        }

        if (!datesEvents[dateKey].events[startTime]) datesEvents[dateKey].events[startTime] = [];
        datesEvents[dateKey].events[startTime].push(record);

        currentDate.add(1, 'days');
      }
    }
  });

  // Ordenar los eventos por la clave de fecha y luego por hora
  const orderedDatesKeys = Object.keys(datesEvents).sort((a, b) => moment(datesEvents[a].date, "YYYY-MM-DD").diff(moment(datesEvents[b].date, "YYYY-MM-DD")));

  let orderedWeekDaysEvents = orderedDatesKeys.reduce((acc, key) => {
    const dayEvents = datesEvents[key];
    // Ordenar eventos por hora dentro de cada fecha
    const sortedTimes = Object.keys(dayEvents.events).sort((a, b) => {
      const timeA = convertTo24HourFormat(a);
      const timeB = convertTo24HourFormat(b);
      return moment(timeA, "HH:mm").diff(moment(timeB, "HH:mm"));
    });

    const sortedEvents = {};
    sortedTimes.forEach(time => {
      sortedEvents[time] = dayEvents.events[time];
    });

    dayEvents.events = sortedEvents;
    acc[key] = dayEvents;
    return acc;
  }, {});

  return {
    today: todayEvents,
    days: orderedWeekDaysEvents,
  };
};

export const prepareDaysForRendering = (days: any) => {
  return Object.keys(days).map((day) => {
    const { date, events } = days[day];
    const eventEntries = Object.entries(events);

    return {
      day,
      events: eventEntries.map(([hour, eventArray]) => {
        return {
          date,
          group: {
            hour,
            events: eventArray,
          },
        };
      }),
    };
  });
};



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

