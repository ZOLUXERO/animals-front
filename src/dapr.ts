import { DaprClient, DaprServer, HttpMethod, CommunicationProtocolEnum } from "@dapr/dapr";

const daprHost = "127.0.0.1"; // Dapr Sidecar Host
const daprPort = "3500"; // Dapr Sidecar Port of this Example Server
const serverHost = "127.0.0.1"; // App Host of this Example Server
const serverPort = "50051"; // App Port of this Example Server

export const daprInstance = new DaprClient({ daprHost, daprPort });

export async function startDapr() {
  const daprServer = new DaprServer({ serverPort: '3005' })
  return daprInstance;
  //try {
  //  await daprInstance.start();
  //  await daprServer.start();
  //} catch (error) {
  //  console.error('Error inicializando Dapr:', error);
  //}
}
