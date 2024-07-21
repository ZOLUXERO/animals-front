import { trace } from "@opentelemetry/api";

async function getCat() {
  return await trace
    .getTracer('get-cat')
    .startActiveSpan('fetch-kitty', async (span) => {
      try {
        //const res = await fetch('http://localhost:3000/cats/kitty/1', { cache: 'no-store' });
        const res = await fetch('http://animals.default.svc.cluster.local/cats/kitty/1', { cache: 'no-store' });
        const test = await res.json();
        return test;
      } finally {
        span.end();
      }
    })
}

export default async function Home() {
  const cat = await getCat();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        {cat ? <h1>Gato: {cat.name}</h1> : null}
      </div>
    </main>
  );
}
