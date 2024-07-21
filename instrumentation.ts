//import { registerOTel } from '@vercel/otel'

//export function register() {
//  registerOTel({ serviceName: 'animals-front' })
//}

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation.node');
  }
}
