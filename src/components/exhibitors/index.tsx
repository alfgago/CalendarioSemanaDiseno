import { fetchData } from "@/pages/api/data"
import { ExhibitorsStyles } from "./ExhibitorsStyles"
import { useQuery } from "react-query"
import Image from "next/image"
import { Tooltip } from "react-tooltip"

export const Exhibitors = ({ id }: any) => {

  if (!id) {
    return <></>
  }

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
                src={fields.Foto && fields.Foto.length > 0 ? fields.Foto[0].url : DEFAULT_IMAGE.src}
                width={fields.Foto && fields.Foto.length > 0 ? fields.Foto[0].width : DEFAULT_IMAGE.width}
                height={fields.Foto && fields.Foto.length > 0 ? fields.Foto[0].height : DEFAULT_IMAGE.height}
                alt="Exhibitor"
              />
            </div>
            <Tooltip id={fields.Nombre} />
          </div>
        ))}
    </ExhibitorsStyles>
  )
}

const DEFAULT_IMAGE = {
  src: "/user-default.png", 
  width: 32, 
  height: 32, 
};