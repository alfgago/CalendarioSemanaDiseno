import React from "react"
import { TaskStyles } from "./TaskStyle"
import Image from "next/image"
import { Exhibitors, Location } from ".."

export const Task = ({ data }: any) => {
  
  const { fields } = data

  return (
    <TaskStyles>
      <div className="task">
        <div className="data">
          <div className="title">
            <h2>{fields.Title}</h2>
          </div>
          <div className="exhibitors">
            <Exhibitors id={fields.Expositores}/>
          </div>
        </div>
        <div className="info">
          <div className="address">
            <Location id={fields["Ubicación"]}/>
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
      </div>
    </TaskStyles>
  )
}
