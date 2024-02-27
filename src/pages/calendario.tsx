import { dehydrate } from "react-query/hydration"
import {queryClient } from "@/utils"
import { fetchData } from "./api/data"
import { TodayComponents } from "@/components"

export default function Calendario({ page }: any) {
  return (
    <TodayComponents/>
  )
}

export const getServerSideProps = async (context: any) => {
  const page = await fetchData("Eventos", 100);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      page
    },
  }
}
