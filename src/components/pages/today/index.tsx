import { Time } from "@/components";
import { TodayStyles } from "./TodayStyles";
import { useContext } from "react";
import { contextData } from "@/context/context";

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
        <p>
          Eventos de hoy
        </p>
        <div className="task-wrapper">

        </div>
      </div>
    </TodayStyles> 
  );
}
