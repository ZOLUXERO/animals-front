'use server';

import { trace } from "@opentelemetry/api";
//import { daprInstance } from "@/dapr";
//import { HttpMethod } from "@dapr/dapr";
//import { DaprClient } from '@dapr/dapr';
import { getDapr } from "@/dapr.node";

//const client = new DaprClient({
//  daprHost: '127.0.0.1', // Replace with your Dapr sidecar's host
//  daprPort: '3500',
//});

/** TODO: probar si la peticion de dapr se puede hacer usando el sdk directamente
 *  hasta el momento la peticion solo funciono con el endpoint directo del Sidecar
 *  de dapr, recordar que el micro de animals como no esta escuchando puede usar
 *  el mismo puerto de la aplicacion. 
 *  
 *  INFO: Aca necesitamos llamar directamente a dapr.node.ts y probar el invoker.
 *  */
export async function searchCitiesDapr(query: string): Promise<string[]> {
  try {
    const response = trace
      .getTracer('city-searcher')
      .startActiveSpan('fetch-city', async (span) => {
        try {
          console.log(`[Dapr] Getting city with query: ${query}`);
          //          const requestDapr = client.invoker.invoke(
          //            "animals",
          //            `/cities/city?search=${query}`,
          //            HttpMethod.GET
          //          );
          //          return requestDapr;
          getDapr();
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

