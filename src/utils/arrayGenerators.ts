import { ArrayDistribution } from '../types';

export function generateArray(
  size: number,
  distribution: ArrayDistribution,
  minVal = 10,
  maxVal = 100
): number[] {
  const result: number[] = [];

  switch (distribution) {
    case 'ascending':
      for (let i = 0; i < size; i++) {
        const val = Math.round(minVal + (i / (size - 1 || 1)) * (maxVal - minVal));
        result.push(val);
      }
      return result;

    case 'descending':
      for (let i = 0; i < size; i++) {
        const val = Math.round(maxVal - (i / (size - 1 || 1)) * (maxVal - minVal));
        result.push(val);
      }
      return result;

    case 'nearly-sorted': {
      // Start sorted
      for (let i = 0; i < size; i++) {
        const val = Math.round(minVal + (i / (size - 1 || 1)) * (maxVal - minVal));
        result.push(val);
      }
      // Introduce a few swaps (~10% of array size)
      const swaps = Math.max(1, Math.floor(size * 0.08));
      for (let s = 0; s < swaps; s++) {
        const i = Math.floor(Math.random() * size);
        const j = Math.max(0, Math.min(size - 1, i + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)));
        const temp = result[i];
        result[i] = result[j];
        result[j] = temp;
      }
      return result;
    }

    case 'duplicates': {
      // Pick 4-5 unique numbers
      const pool = [15, 35, 55, 75, 95];
      for (let i = 0; i < size; i++) {
        result.push(pool[Math.floor(Math.random() * pool.length)]);
      }
      return result;
    }

    case 'random':
    default:
      for (let i = 0; i < size; i++) {
        result.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
      }
      return result;
  }
}

export function parseCustomArray(inputStr: string): number[] | null {
  try {
    const parts = inputStr
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (parts.length === 0) return null;

    const nums = parts.map((p) => {
      const n = Number(p);
      if (isNaN(n)) throw new Error('Not a number');
      return n;
    });

    if (nums.length < 2) return null;
    return nums;
  } catch {
    return null;
  }
}
