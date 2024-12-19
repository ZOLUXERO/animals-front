'use server';

import { trace } from "@opentelemetry/api";
import cityApiPrivate from "@/api/cityprivate/cityApi";

export async function searchCities(query: string): Promise<string[]> {
  try {
    const response = trace
      .getTracer('city-searcher')
      .startActiveSpan('fetch-city', async (span) => {
        try {
          console.log(`Getting city with query: ${query}`);
          const request = await cityApiPrivate.get(`/cities/city`, {
            params: { search: query }
          });
          //const request = await fetch(`http://localhost:3001/cities/city?search=${query}`, {
          //  cache: 'no-store',
          //},
          //);
          const data = await request.data;
          console.log(data);
          return data.sugg;
        } finally {
          span.end();
        }
      })
    return response;
  } catch (error) {
    console.error('Error fetching city suggestions', error);
    return [];
  }
}

