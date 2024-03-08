import Link from "next/link"
import { Time } from ".."
import { EventStyles } from "./EventStyles"

export const Event = ({ events, slug }: any) => {
  const { date } = events[0]
  return (
    <EventStyles className="daily-events">
      <Link href={`calendario/${slug}`}>
        <div className="time">
          <Time eventTime={date} />
        </div>
        <div className="list">
          {events.slice(0, 3).map(({ group }: any, index: any) => {
            return (
              <div key={index} className="group">
                <div className="hour">
                  <span>{group.hour}</span>
                </div>
                {group.events
                  .slice(0, 2)
                  .map(({ fields }: any, innerIndex: any) => {
                    return (
                      <div key={innerIndex} className="chip">
                        <span>{fields.Title}</span>
                      </div>
                    )
                  })}
              </div>
            )
          })}
          {events.length > 3 && (
            <div className="chip mas">
              <span>+ &nbsp;&nbsp;Ver más</span>
            </div>
          )}
        </div>
      </Link>
    </EventStyles>
  )
}
