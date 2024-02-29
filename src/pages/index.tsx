import { dehydrate } from "react-query/hydration"
import {queryClient } from "@/utils"
import { TodayComponents } from "@/components"
import { useContext } from "react"
import { contextData } from "@/context/context"

export default function Home() {
  
  const { today } = useContext(contextData) as any

  return (
    <TodayComponents data={today}/>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 86400, 
  }
}
