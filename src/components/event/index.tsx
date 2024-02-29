import Link from "next/link"
import { Time } from ".."
import { EventStyles } from "./EventStyles"

export const Event = ({ date, group, day }: any) => {

  return (
    <EventStyles>
      <Link href={`calendario/${day}`}>
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
                <div data-aos="fade-up" data-aos-delay={ 200 + (50 * index) }  key={index} className="chip">
                  <p>
                    {fields.Title}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Link>
    </EventStyles>
  )
}
