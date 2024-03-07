import { fetchData } from "@/pages/api/data"
import { useQuery } from "react-query"
import { LocationStyles } from "./LocationStyles"
import { useEffect } from "react"

export const Location = ({ id, setLocationData }: any) => {
  if (!id) {
    return <></>
  }

  const fetchLocation = async (id) => {
    const ids = Array.isArray(id) ? id : [id];
    return Promise.all(ids.map((singleId) => fetchData(`Expositores/${singleId}`)));
  };


  const { data, isLoading, error } = useQuery(
    ["location", `Expositores/${id}`], 
    () => fetchLocation(id), 
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (!isLoading && data) {
      setLocationData(data);
    }
  }, [data, isLoading, setLocationData]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <LocationStyles>
      {data &&
        data.map(({ fields }: any, index: any) => (
          <div key={index} className="item">
            <span>{fields.Name}</span>
            {
              fields["Map Link"] &&
              <a target="_blank" href={fields["Map Link"]}> (Mapa)</a>
            }
          </div>
        ))}
    </LocationStyles>
  )
}
