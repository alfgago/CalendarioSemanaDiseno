import { dehydrate } from "react-query/hydration"
import {queryClient } from "@/utils"
import { CalendarComponents, TodayComponents } from "@/components"

export default function Calendario() {
  return (
    <CalendarComponents/>
  )
}

export const getServerSideProps = async (context: any) => {
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
