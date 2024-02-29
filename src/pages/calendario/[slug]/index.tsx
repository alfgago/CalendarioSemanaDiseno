import { dehydrate } from "react-query/hydration"
import {queryClient } from "@/utils"
import { contextData } from "@/context/context"
import { useContext } from "react"
import { TodayComponents } from "@/components"

const getEvents = ( day:any ) => {
  const allEvents = Object.keys(day.events).reduce((acc, hour) => {
    return acc.concat(day.events[hour]);
  }, []);
  return allEvents
}

export default function Child({ slug }: any) {
  
  const { days } = useContext(contextData) as any;
  const selected = days[slug]?.[0];

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
