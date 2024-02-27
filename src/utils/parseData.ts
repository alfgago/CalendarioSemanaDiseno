import moment from 'moment';

export const parseEvents = (data: any) => {
  const { records } = data;

  let todayEvents: any[] = [];
  let weekDaysEvents: { [key: string]: { item: any[] } } = {};

  records.forEach((record: any) => {
    if (record.fields && Object.keys(record.fields).length > 0) {
      const eventDate = moment(record.fields.Fecha);
      const today = moment();

      const dayOfWeek = eventDate.format('dddd').toLowerCase(); // "monday", "tuesday", ...
      const dateKey = eventDate.format("YYYY-MM-DD"); // Formato "mes-dia"

      const startTime = record.fields['Hora Inicio'];

      // Agregar al array de eventos de hoy si corresponde
      if (eventDate.isSame(today, 'day')) {
        todayEvents.push(record);
      }

      // Inicializar el día de la semana si aún no existe
      if (!weekDaysEvents[dayOfWeek]) {
        weekDaysEvents[dayOfWeek] = { item: [] };
      }

      // Buscar si ya existe un 'item' para esta fecha
      let itemIndex = weekDaysEvents[dayOfWeek].item.findIndex(item => item.date === dateKey);

      if (itemIndex === -1) {
        // Si no existe, crear un nuevo 'item'
        weekDaysEvents[dayOfWeek].item.push({
          date: dateKey,
          events: {}
        });
        itemIndex = weekDaysEvents[dayOfWeek].item.length - 1; // El índice del nuevo 'item' creado
      }

      // Inicializar el grupo de horas dentro de los eventos si aún no existe
      if (!weekDaysEvents[dayOfWeek].item[itemIndex].events[startTime]) {
        weekDaysEvents[dayOfWeek].item[itemIndex].events[startTime] = [];
      }

      // Agregar el evento al grupo de horas correspondiente
      weekDaysEvents[dayOfWeek].item[itemIndex].events[startTime].push(record);
    }
  });

  // Objeto final
  const parsedData = {
    today: todayEvents,
    days: weekDaysEvents
  };

  return parsedData;
};
