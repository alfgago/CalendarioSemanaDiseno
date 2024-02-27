
import { queryClient } from "@/utils"; 
import { API } from "./base";

export const fetchData = async (slug: string, staleTime?: number) => {
  await queryClient.prefetchQuery(
    ['data', slug], 
    async () => {
      const response = await API.get(`/${slug}`);
      console.log('request layout data:', slug);
      return response.data;
    }, 
    { staleTime: staleTime ? staleTime * 1000 : 10000 } 
  );

  return queryClient.getQueryData(['data', slug]);
};
