import { Time } from "@/components"
import { TodayStyles } from "./TodayStyles"
import { useContext } from "react"
import { contextData } from "@/context/context"
import { Task } from "@/components/task"

export const TodayComponents = () => {
  const { today } = useContext(contextData) as any
  console.log(today)

  return (
    <TodayStyles>
      <div className="current-day">
        <div className="time">
          <Time />
        </div>
        <div className="upcoming-events">
          {today.slice(0,2).map(({ fields }: any, index: any) => (
            <div key={index} className="upcoming-item">
              <strong> {fields["Hora Inicio"]} </strong>
              <span>{fields["Title"]} </span>
            </div>
          ))}
        </div>
      </div>
      <div className="container-tasks">
        <div className="heading">
          <p>Eventos</p>
        </div>
        <div className="task-wrapper">
          {today.map((item: any, index: any) => (
            <Task key={index} data={item} />
          ))}
        </div>
      </div>
    </TodayStyles>
  )
}
