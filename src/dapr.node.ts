import { DaprClient, DaprServer, HttpMethod, CommunicationProtocolEnum } from "@dapr/dapr";

const daprHost = "127.0.0.1"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port of this Example Server
const serverHost = "127.0.0.1"; // App Host of this Example Server
const serverPort = "50051"; // App Port of this Example Server

const daprClient = new DaprClient({ daprHost, daprPort });

/** TODO: probar si la peticion de dapr se puede hacer usando el sdk directamente
 *  hasta el momento la peticion solo funciono con el endpoint directo del Sidecar
 *  de dapr, recordar que el micro de animals como no esta escuchando puede usar
 *  el mismo puerto de la aplicacion. */
export async function getDapr() {
  //const test = daprClient.invoker.invoke(
  //  "animals",
  //  `/cities/city?search=bogo`,
  //  HttpMethod.GET
  //)
  //const request = await fetch(`http://localhost:3500/v1.0/invoke/animals-food/method/hello-world`, { cache: 'no-store' });
  const request = await fetch(`http://localhost:3500/v1.0/invoke/animals/method/cities/city?search=bogo`, { cache: 'no-store' });
  const data = await request.json();
  console.log(data);
}
