
import { queryClient } from "@/utils"; 
import { API } from "./base";

const retryWithDelay = (fn, retries = 3, delay = 30000) => {
  return fn().catch(function (error) {
    if (retries === 0 || error.response.status !== 429) {
      throw error;
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(retryWithDelay(fn, retries - 1, delay)), delay);
    });
  });
};

export const fetchData = async (slug: string, staleTime?: number) => {
  const fetchFn = async () => {
    const response = await API.get(`/${slug}`);
    return response.data;
  };

  await queryClient.prefetchQuery(['data', slug], () => retryWithDelay(fetchFn), {
    staleTime: staleTime ? staleTime * 1000 : 10000,
  });

  return queryClient.getQueryData(['data', slug]);
};