/**
 * Returns a new array by inserting the separator between each element of the array.
 *
 * @param array The array to interleave.
 * @param separator The separator to insert between each element.
 * @returns The interleaved array.
 */
export function interleave<T>(array: T[], separator: T): T[] {
  return array.flatMap((el) => [el, separator]).slice(0, -1)
}

/**
 * Returns a new array with the increased size and filled with the default value.
 * If the array is already larger than the new size, it will be truncated.
 *
 * @param arr The array to resize.
 * @param size The new size of the array.
 * @param defaultValue The default value to fill the array with.
 * @returns The resized array.
 */
export function resize<T>(arr: T[], size: number, defaultValue: T) {
  if (arr.length >= size) {
    return arr.slice(0, size)
  }

  return [...arr, ...Array(size - arr.length).fill(defaultValue)]
}
