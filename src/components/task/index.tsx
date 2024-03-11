import { useEffect, useRef, useState } from "react"
import { TaskStyles } from "./TaskStyle"
import Image from "next/image"
import { Exhibitors, Location } from ".."
import ical from "ical-generator"
import moment from "moment"
import { ReactSVG } from 'react-svg'
import momentTimezone from "moment-timezone";

export const Task = ({ data }: any) => {
  
  const { fields } = data

  const [locationData, setLocationData] = useState([])

  const startDate = moment(fields["Fecha"], "YYYY-MM-DD").toDate();
  const endDate = moment(fields["Hora Fin"], "YYYY-MM-DD").toDate(); 
  const taskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set the timezone to Costa Rica
    momentTimezone.tz.setDefault('America/Costa_Rica');

    const horaInicio = fields["Hora Inicio"].replace('MD', 'PM')
    const horaFin = fields["Hora Inicio"].replace('MD', 'PM')

    // Check if the task should be marked as active
    const startDate = moment(fields["Fecha"] + " " + horaInicio, "YYYY-MM-DD h:mm A");
    const endDate = moment(fields["Fecha Fin"] + " " + horaFin, "YYYY-MM-DD h:mm A");
    // const now = moment("2024-03-11 10:23 AM", "YYYY-MM-DD h:mm A"); // Para probar los activos
    const now = moment();

    if (now.isBetween(startDate, endDate)) {
      if (taskRef.current) {
        taskRef.current.classList.add('active');

        //@ts-ignore
        if(!window.scrolled){
          // Scroll to the first active task found
          taskRef.current.scrollIntoView({ behavior: 'smooth' });
          //@ts-ignore
          window.scrolled = true
        }
      }
    }
  }, []);

  const handleDownload = async () => {
    try {
      await navigator.share({
        title: fields.Title,
        text: fields.Description, // You can use fields.Description or any other field for event description
        url: 'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:' + moment(startDate).format('YYYYMMDDTHHmmss') + '\nDTEND:' + moment(endDate).format('YYYYMMDDTHHmmss') + '\nSUMMARY:' + fields.Title + '\nLOCATION:' + (locationData[0]?.fields?.Name || '') + '\nEND:VEVENT\nEND:VCALENDAR',
      });
    } catch (error) {
      console.error('Error sharing event:', error);
      // Fallback to downloading .ics file if sharing is not supported
      const calendar = ical({
        events: [
          {
            start: startDate,
            end: endDate,
            summary: fields.Title,
            location: locationData[0]?.fields?.Name || '',
          },
        ],
      });
      const link = document.createElement('a');
      link.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(calendar.toString())}`;
      link.download = 'calendar.ics';
      link.click();
    }
  };
  return (
    <TaskStyles>
      <div ref={taskRef} className="task">
        <div className="data">
          <div data-aos="custom-fade-in" data-aos-delay="200" className="title">
            <h2>{fields.Title}</h2>
          </div>
          <div className="exhibitors">
            <Exhibitors id={fields.Expositores} />
          </div>
        </div>
        <div className="info">
          <div className="address" data-aos="fade-up" data-aos-delay="200">
            <Location id={fields["Ubicación"]} setLocationData={setLocationData} />
          </div>
          <div className="time" data-aos="fade-up" data-aos-delay="200">
            <span>{fields["Hora Inicio"]} {fields["Hora Fin"] ? ' - ' + fields["Hora Fin"] : ''}</span>
          </div>
        </div>
      </div> 
      <div className="cover">
        <Image
          alt="cover"
          src={fields.Imagen[0].url}
          width={359}
          height={239}
          priority={true} 
        />
        <div className="wrapper-add-to-cal">
          <button onClick={handleDownload}>
            <ReactSVG  src="/calendar.svg" />
          </button>
        </div>
      </div>
    </TaskStyles>
  )
}
