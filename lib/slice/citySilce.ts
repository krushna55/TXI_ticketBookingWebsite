import { fetchcities } from "@/api/city/cityApi";
import { Tables } from "@/database.types";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
type cities = Tables<"cities">;
export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fakeBaseQuery(),
  endpoints:(build)=>( {
    fetchcity: build.query<cities[], void>({
      queryFn: async () => {
        try {
          const data = await fetchcities();
          return {data : data as cities[]}
        } catch (e) {
            return {error : {status : 'failed to fetch city' , error : e as Error}}
        }
      },
    })
  })
});


export const {useFetchcityQuery}  = cityApi
