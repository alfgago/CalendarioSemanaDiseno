import { CalendarComponents } from "@/components"
import Head from "next/head"

export default function Calendario() {
  return (
    <>
      <Head>
        <title>Calendario - Semana del diseño</title>
      </Head>
      <CalendarComponents />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 7200, // Revalida cada 1 hora
  }
}