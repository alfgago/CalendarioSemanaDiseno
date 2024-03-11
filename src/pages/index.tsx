import { dehydrate } from "react-query/hydration"
import { getEvents, queryClient } from "@/utils"
import { TodayComponents } from "@/components"
import { useContext, useEffect, useState } from "react"
import { contextData } from "@/context/context"
import Head from "next/head"
import moment from "moment"

interface Day {
  date: Date
}

export default function Home() {
  const { today, days } = useContext(contextData) as any

  const [events, setEvents] = useState<any[]>([])
  const [nextDate, setNextDate] = useState<Date | undefined>()

  useEffect(() => {
    if (today.length === 0) {
      const next: Day = Object.values(days)[0] as Day
      setNextDate(next.date)
      const nextEvents = getEvents(next)
      const sortedEvents = nextEvents.sort((a, b) => {
        const horaInicioA = a.fields["Hora Inicio"].replace('MD', 'PM');
        const horaInicioB = b.fields["Hora Inicio"].replace('MD', 'PM');
        const startTimeA = moment("2024-03-03 " + horaInicioA, "YYYY-MM-DD h:mm A");
        const startTimeB = moment("2024-03-03 " + horaInicioB, "YYYY-MM-DD h:mm A");
        return startTimeA.valueOf() - startTimeB.valueOf();
      })
      setEvents(sortedEvents)
    } else {
      const sortedToday = today.sort((a, b) => {
        const horaInicioA = a.fields["Hora Inicio"].replace('MD', 'PM');
        const horaInicioB = b.fields["Hora Inicio"].replace('MD', 'PM');
        const startTimeA = moment("2024-03-03 " + horaInicioA, "YYYY-MM-DD h:mm A");
        const startTimeB = moment("2024-03-03 " + horaInicioB, "YYYY-MM-DD h:mm A");
        return startTimeA.valueOf() - startTimeB.valueOf();
      })
      console.log("sortedToday")
      console.log(sortedToday)
      setEvents(sortedToday)
    }
  }, [days, today])

  return (
    <>
      <Head>
        <title>Hoy - Semana del diseño</title>
      </Head>
      <TodayComponents data={events} nextDate={nextDate} />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600, // Revalida cada 1 hora
  }
}