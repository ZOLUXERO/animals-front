import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
//import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.NONE);
const exporterOptions = {
  //url: 'http://localhost:4317'
  //url: 'http://opentelemetry-collector.monitoring.svc.cluster.local:4317'
  url: 'http://opentelemetry-collector.monitoring.svc.cluster.local:4318/v1/traces',
}

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(exporterOptions),
  //traceExporter: new ConsoleSpanExporter(),
  instrumentations: [
    //getNodeAutoInstrumentations(),
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter(exporterOptions)),
  //spanProcessor: new SimpleSpanProcessor(new ConsoleSpanExporter()),
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'animals-front-nextjs',
  }),
})
sdk.start()
