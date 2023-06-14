export function interleave<T>(array: T[], separator: T): T[] {
  return array.flatMap((el) => [el, separator]).slice(0, -1)
}

export function resize<T>(arr: T[], size: number, defaultValue: T) {
  if (arr.length >= size) {
    return arr.slice(0, size)
  }

  return [...arr, ...Array(size - arr.length).fill(defaultValue)]
}
