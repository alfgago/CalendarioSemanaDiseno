//@ts-ignore

import { useState } from "react"
import { TaskStyles } from "./TaskStyle"
import Image from "next/image"
import { Exhibitors, Location } from ".."
import ical from "ical-generator"
import moment from "moment"
import { ReactSVG } from 'react-svg'

export const Task = ({ data }: any) => {
  
  const { fields } = data

  const [locationData, setLocationData] = useState([])

  const startDate = moment(fields["Fecha"], "YYYY-MM-DD").toDate();
  const endDate = moment(fields["Hora Fin"], "YYYY-MM-DD").toDate(); 

  const handleDownload = () => {
    const calendar = ical({
      events: [
        {
          start: startDate,
          end: endDate,
          summary: fields.Title,
          location: locationData[0].fields.Name,
        },
      ],
    })
    const link = document.createElement("a")
    link.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(
      calendar.toString()
    )}`
    link.download = "calendar.ics"
    link.click()
  }

  return (
    <TaskStyles>
      <div className="task">
        <div className="data">
          <div className="title">
            <h2>{fields.Title}</h2>
          </div>
          <div className="exhibitors">
            <Exhibitors id={fields.Expositores} />
          </div>
        </div>
        <div className="info">
          <div className="address">
            <Location id={fields["Ubicación"]} setLocationData={setLocationData} />
          </div>
          <div className="time">
            <span>{fields["Hora Inicio"]}</span>
          </div>
        </div>
      </div>
      <div className="cover">
        <Image
          alt="cover"
          src={fields.Imagen[0].url}
          width={359}
          height={239}
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
