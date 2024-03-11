import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 7200 * 1000, // 60 segundos por defecto en cache 
    },
  },
});
