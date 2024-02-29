import { fetchData } from "@/pages/api/data"
import { ExhibitorsStyles } from "./ExhibitorsStyles"
import { useQuery } from "react-query"
import Image from "next/image"
import { Tooltip } from "react-tooltip"

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

  return (
    <ExhibitorsStyles>
      {data &&
        data.map(({ fields }: any, index: any) => (
          <div key={index} className="wrapper">
            <div 
              className="item" 
              style={{ zIndex: data.length - index }}
              data-tooltip-id={fields.Nombre} 
              data-tooltip-content={fields.Nombre}
            >
              <Image
                src={fields.Foto[0].url}
                width={fields.Foto[0].width}
                height={fields.Foto[0].height}
                alt="Exhibitor"
              />
            </div>
            <Tooltip id={fields.Nombre} />
          </div>
        ))}
    </ExhibitorsStyles>
  )
}
