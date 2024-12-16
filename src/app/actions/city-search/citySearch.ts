'use server';

import { trace } from "@opentelemetry/api";

export async function searchCities(query: string): Promise<string[]> {
  try {
    const response = trace
      .getTracer('city-searcher')
      .startActiveSpan('fetch-city', async (span) => {
        try {
          console.log(`Getting city with query: ${query}`);
          const request = await fetch(`http://localhost:3001/cities/city?search=${query}`, { cache: 'no-store' });
          const data = await request.json();
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

