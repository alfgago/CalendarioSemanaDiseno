import { fetchData } from "@/pages/api/data"
import { useQuery } from "react-query"
import { LocationStyles } from "./LocationStyles"
import { get } from "http"

export const Location = ({ id, setLocationData }: any) => {
  const fetchLocation = () => {
    const ids = Array.isArray(id) ? id : [id]
    return Promise.all(
      ids.map((singleId) => fetchData(`Expositores/${singleId}`))
    )
  }

  const { data, isLoading, error } = useQuery(["location", `Expositores/${id}`], fetchLocation)

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading) {
    setLocationData(data);
  }

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
