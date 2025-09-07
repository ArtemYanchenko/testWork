import { Bench } from "tinybench";
import { countMatches } from "../src/count-matcher/countMatches.ts";

function randomArray(n: number, max = 1_000_000) {
  const arr = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * max) + 1;
  }
  return arr;
}

async function main() {
  const A = randomArray(100_000);
  const B = randomArray(2_000_000);

  let sink: unknown;

  const bench = new Bench({ time: 500 });

  bench.add("countMatches (Uint32Array)", () => {
    sink = countMatches(A, B, 1_000_000);
  });

  await bench.run();

  console.table(
    bench.tasks.map((t) => ({
      name: t.name,
      mean: (t.result?.mean ?? 0).toFixed(6) + " s",
      hz: Math.round(t.result?.hz ?? 0) + " ops/s",
      samples: t.result?.samples.length,
    })),
  );

  console.log(
    "Пример результата:",
    Object.entries(sink as Record<number, number>)
      .slice(0, 5)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", "),
  );
}

main();
