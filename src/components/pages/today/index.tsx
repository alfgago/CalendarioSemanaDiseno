import { Time } from "@/components";
import { TodayStyles } from "./TodayStyles";
import { useContext } from "react";
import { contextData } from "@/context/context";
import { Task } from "@/components/task";

export const TodayComponents = () => {

  const { today } = useContext(contextData) as any;

  return (
    <TodayStyles>
      <div className="current-day">
        <div className="time">
          <Time/>
        </div>
      </div>
      <div className="container-tasks">
        <div className="heading">
          <p>
            Eventos de hoy
          </p>
        </div>
        <div className="task-wrapper">
          {today.map((item:any, index:any) => (
            <Task key={index}  data={item}/>
          ))}
        </div>
      </div>
    </TodayStyles> 
  );
}
