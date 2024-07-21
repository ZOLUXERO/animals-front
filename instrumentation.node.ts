import { NodeSDK } from '@opentelemetry/sdk-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'

const exporterOptions = {
  url: 'http://opentelemetry-collector.monitoring.svc.cluster.local:4317'
}

const sdk = new NodeSDK({
  //traceExporter: new OTLPTraceExporter(exporterOptions),
  traceExporter: new ConsoleSpanExporter(),
  instrumentations: [
    getNodeAutoInstrumentations(),
  ],
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'animals-front',
  }),
  spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter(exporterOptions)),
})
sdk.start()
