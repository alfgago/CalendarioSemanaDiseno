import { useContext } from "react"
import { dehydrate } from "react-query/hydration"
import { getEvents, queryClient } from "@/utils"
import { contextData } from "@/context/context"
import { TodayComponents } from "@/components"
import Head from "next/head"
import moment from "moment"

export default function Child({ slug }: any) {
  const { days } = useContext(contextData) as any
  const selected = days[slug]

  if (!selected || !selected.events) {
    return <div>No hay eventos disponibles</div>
  }

  const events = getEvents(selected)
  const { date } = selected
  const formattedDate = moment(date).format('MMMM D').replace(/^\w/, (c) => c.toUpperCase());

  return (
    <>
      <Head>
        <title>{formattedDate} - Semana del diseño</title>
      </Head>
      <TodayComponents data={events} date={date} />
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  const { slug } = context.params

  return {
    props: {
      slug,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
