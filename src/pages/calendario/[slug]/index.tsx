import { useContext } from "react"
import { dehydrate } from "react-query/hydration"
import {getEvents, queryClient } from "@/utils"
import { contextData } from "@/context/context"
import { TodayComponents } from "@/components"

export default function Child({ slug }: any) {
  
  const { days } = useContext(contextData) as any;
  const selected = days[slug];

  if (!selected || !selected.events) {
    return <div>No hay eventos disponibles</div>;
  }

  const events = getEvents(selected);
  const { date } = selected;
  
  return (
    <TodayComponents data={events} date={date}/>
  );
}


export const getServerSideProps = async (context: any) => {
  const { slug } = context.params;

  return {
    props: {
      slug,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
