# Correr aplicacion con dapr, probar si el dapr corre con el mismo puerto que tiene la aplicacion ``3000`` en teoria deberia funcionar porque esta aplicacion no esta escuchando es decir no esta haciendo uso de DaprServer solo esta usando el cliente
```bash
dapr run --app-id animals-front --app-port=3005 --dapr-http-port 3500 --components-path ./components -- npm run dev
dapr run --app-id animals-front --app-port=3000 --dapr-http-port 3500 --components-path ./components -- npm run dev
```
```bash
npm install @vercel/otel

npm i @opentelemetry/sdk-node
npm i @opentelemetry/auto-instrumentations-node
npm i @opentelemetry/exporter-trace-otlp-http
npm i @opentelemetry/resources
npm i @opentelemetry/semantic-conventions
npm install @opentelemetry/winston-transport @opentelemetry/exporter-jaeger
npm i @opentelemetry/api

npm i next-auth
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
