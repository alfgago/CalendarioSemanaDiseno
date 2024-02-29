import { Time } from "@/components"
import { TodayStyles } from "./TodayStyles"
import { Task } from "@/components/task"

export const TodayComponents = ({ data, date = null }: any) => {
  return (
    <TodayStyles>
      <div className="current-day">
        <div className="time">
          <Time eventTime={date} />
        </div>
        <div className="upcoming-events">
          {data.slice(0, 2).map(({ fields }: any, index: any) => (
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
          {data.map((item: any, index: any) => (
            <div key={index} className="wrapper" data-aos="custom-fade-in">
              <Task  data={item} />
            </div>
          ))}
        </div>
      </div>
    </TodayStyles>
  )
}
