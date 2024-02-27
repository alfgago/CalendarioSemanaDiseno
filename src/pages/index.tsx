import { dehydrate } from "react-query/hydration"
import {queryClient } from "@/utils"
import { fetchData } from "./api/data"
import { TodayComponents } from "@/components"
import { parseEvents } from "@/utils/parseData"

export default function Home({}: any) {
  return (
    <TodayComponents/>
  )
}

export const getServerSideProps = async (context: any) => {
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
