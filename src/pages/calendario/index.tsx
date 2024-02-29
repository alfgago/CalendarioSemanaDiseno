import { CalendarComponents } from "@/components"

export default function Calendario() {
  return (
    <CalendarComponents/>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 86400, // Revalidar una vez al día
  }
}