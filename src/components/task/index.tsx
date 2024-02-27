import React from 'react'
import { TaskStyles } from './TaskStyle'
import Image from 'next/image'

export const Task = () => {

  return (
    <TaskStyles>
      <div className="data">
        <div className="title">
          Evento Lorem ipsum dolor amet consectetur.
        </div>
        <div className="exhibitors">

        </div>
      </div>
      <div className="info">
        <div className="address">
          Lugar del evento (Mapa)
        </div>
        <div className="time">
          00:00 PM
        </div>
      </div>
      <div className="cover">
        {/* <Image 
          
        /> */}
      </div>
    </TaskStyles>
  )
}
