import { Bench } from "tinybench";
import { countMatches } from "./countMatches";

function randomArray(n: number, max = 1_000_000) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * max) + 1);
}

async function main() {
  const A = randomArray(100_000);
  const B = randomArray(2_000_000);

  const bench = new Bench({ time: 500 });
  bench.add("countMatches (Uint32Array)", () => {
    countMatches(A, B, 1_000_000);
  });

  await bench.run();

  console.table(
    bench.tasks.map((t) => ({
      name: t.name,
      mean: t.result?.mean.toFixed(6) + " s",
      hz: Math.round(t.result?.hz ?? 0) + " ops/s",
      samples: t.result?.samples.length,
    })),
  );
}

main();
