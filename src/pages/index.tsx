import { dehydrate } from "react-query/hydration"
import { getEvents, queryClient } from "@/utils"
import { TodayComponents } from "@/components"
import { useContext, useEffect, useState } from "react"
import { contextData } from "@/context/context"
import Head from "next/head"

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
      setEvents(getEvents(next))
    } else {
      setEvents(today)
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
    revalidate: 86400,
  }
}
