import { countMatches } from "../../src/count-matcher/countMatches.ts";

describe("countMatches", () => {
  it("считает совпадения для простых массивов", () => {
    const A = [1, 2, 3];
    const B = [1, 2, 2, 3, 3, 3];
    const result = countMatches(A, B);
    expect(result).toEqual({ 1: 1, 2: 2, 3: 3 });
  });

  it("игнорирует дубликаты в A", () => {
    const A = [1, 1, 2, 2];
    const B = [1, 2, 2, 2];
    const result = countMatches(A, B);
    expect(result).toEqual({ 1: 1, 2: 3 });
  });

  it("возвращает 0 если элемент A отсутствует в B", () => {
    const A = [5, 6];
    const B = [1, 2, 3];
    const result = countMatches(A, B);
    expect(result).toEqual({ 5: 0, 6: 0 });
  });

  it("работает при пустом A", () => {
    const result = countMatches([], [1, 2, 3]);
    expect(result).toEqual({});
  });

  it("работает при пустом B", () => {
    const result = countMatches([1, 2, 3], []);
    expect(result).toEqual({ 1: 0, 2: 0, 3: 0 });
  });

  it("учитывает maxValue если передан", () => {
    const A = [1, 2, 100];
    const B = [1, 2, 100, 100, 100];
    const result = countMatches(A, B, 50);
    // maxValue=50 -> число 100 игнорируется
    expect(result).toEqual({ 1: 1, 2: 1, 100: 0 });
  });

  it("корректно работает с большим значением max", () => {
    const A = [1_000_000];
    const B = [1_000_000, 1_000_000];
    const result = countMatches(A, B, 1_000_000);
    expect(result).toEqual({ 1_000_000: 2 });
  });
});
