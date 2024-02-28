import { Time } from ".."
import { EventStyles } from "./EventStyles"

export const Event = ({ date, group }: any) => {

  return (
    <EventStyles>
      <div className="time">
        <Time eventTime={date} />
      </div>
      <div className="list">
        {group.map(({ events, hour}:any, index:any) => (
          <div key={index} className="group">
            <div className="hour">
              <span>
                { hour }
              </span>
            </div>
            {events.map(({ fields}:any, index:any) => (
              <div key={index} className="chip">
                <p>
                  {fields.Title}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </EventStyles>
  )
}
