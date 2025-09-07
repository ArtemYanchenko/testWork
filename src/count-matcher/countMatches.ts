export function countMatches(
  A: number[],
  B: number[],
  maxValue?: number,
): Record<number, number> {
  const uniqueA = Array.from(new Set(A));

  const max = maxValue ?? Math.max(...B, ...uniqueA);

  const freq = new Uint32Array(max + 1);

  for (let i = 0; i < B.length; i++) {
    const v = B[i];
    if (v <= max) freq[v]++;
  }

  const result: Record<number, number> = {};
  for (const a of uniqueA) {
    result[a] = a <= max ? freq[a] : 0;
  }

  return result;
}
