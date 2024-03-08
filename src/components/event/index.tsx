import Link from "next/link"
import { Time } from ".."
import { EventStyles } from "./EventStyles"

export const Event = ({ date, group, day }: any) => {
  let totalEvents = 0;

  return (
    <EventStyles className="daily-events">
      <Link href={`calendario/${day}`}>
        <div className="time">
          <Time eventTime={date} />
        </div>
        <div className="list">
          {group.map(({ events, hour}:any, index:any) => {
              if (totalEvents < 3) {
                totalEvents++;
                return (
                    <div key={index} className="group">
                      <div className="hour">
                        <span>
                          { hour }
                        </span>
                      </div>
                      {events.map(({ fields}:any, index:any) => (
                        <div key={index} className="chip">
                          <span>
                            {fields.Title}
                          </span>
                        </div>
                      ))}
                      {totalEvents == 3 && <div key={index} className="chip mas">
                          <span>
                            +
                          </span>
                        </div>}
                    </div>
                  )
              }else{
                return <></>
              }
            }
          )}
        </div>
      </Link>
    </EventStyles>
  )
}
