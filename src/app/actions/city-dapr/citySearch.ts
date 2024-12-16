'use server';

import { trace } from "@opentelemetry/api";
//import { daprInstance } from "@/dapr";
import { HttpMethod } from "@dapr/dapr";
import { DaprClient } from '@dapr/dapr';

const client = new DaprClient({
  daprHost: 'localhost', // Replace with your Dapr sidecar's host
  daprPort: '3500',
});

export async function searchCitiesDapr(query: string): Promise<string[]> {
  try {
    const response = trace
      .getTracer('city-searcher')
      .startActiveSpan('fetch-city', async (span) => {
        try {
          console.log(`[Dapr] Getting city with query: ${query}`);
          const requestDapr = client.invoker.invoke(
            "animals",
            `/cities/city?search=${query}`,
            HttpMethod.GET
          );
          return requestDapr;
        } finally {
          span.end();
        }
      })
    console.log(response);
    return [];
  } catch (error) {
    console.error('Error fetching city suggestions', error);
    return [];
  }
}

