import { fetchData } from "@/pages/api/data"
import { ExhibitorsStyles } from "./ExhibitorsStyles"
import { useQuery } from "react-query"
import Image from "next/image"

export const Exhibitors = ({ id }: any) => {
  const fetchExhibitors = () => {
    const ids = Array.isArray(id) ? id : [id]
    return Promise.all(
      ids.map((singleId) => fetchData(`Expositores/${singleId}`))
    )
  }

  const { data, isLoading, error } = useQuery(
    ["exhibitors", `Expositores/${id}`],
    fetchExhibitors
  )

  if (!isLoading) console.log(data)

  return (
    <ExhibitorsStyles>
      {data &&
        data.map(({ fields }: any, index: any) => (
          <div key={index} className="item" style={{ zIndex: data.length - index }}>
            <Image
              src={fields.Foto[0].url}
              width={fields.Foto[0].width}
              height={fields.Foto[0].height}
              alt="Exhibitor"
            />
          </div>
        ))}
    </ExhibitorsStyles>
  )
}
