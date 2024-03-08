import { dehydrate } from "react-query/hydration"
import { getEvents, queryClient } from "@/utils"
import { TodayComponents } from "@/components"
import { useContext, useEffect, useState } from "react"
import { contextData } from "@/context/context"

export default function Home() {
  const { today, days } = useContext(contextData) as any

  const [events, setEvents] = useState([])
  const [nextDate, setNextDate] = useState()

  console.log(today, days)

  return (
    // <TodayComponents data={events} nextDate={nextDate}/>
    <>

    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 86400,
  }
}
