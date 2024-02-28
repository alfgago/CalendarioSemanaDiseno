import { fetchData } from "@/pages/api/data"
import { useQuery } from "react-query"
import { LocationStyles } from "./LocationStyles"

export const Location = ({ id }: any) => {
  const fetchLocation = () => {
    const ids = Array.isArray(id) ? id : [id]
    return Promise.all(
      ids.map((singleId) => fetchData(`Expositores/${singleId}`))
    )
  }

  const { data, isLoading, error } = useQuery(["location", `Expositores/${id}`], fetchLocation)

  if (isLoading) return <div>Loading...</div>;

  return (
    <LocationStyles>
      {data &&
        data.map(({ fields }: any, index: any) => (
          <div key={index} className="item">
            <span>{fields.Name}</span>
            <a target="_blank" href={fields["Map Link"]}> (Mapa)</a>
          </div>
        ))}
    </LocationStyles>
  )
}