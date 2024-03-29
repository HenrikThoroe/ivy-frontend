/**
 * Returns a color based on the index and total number of items.
 *
 * @param index The index of the item. Same index and total will always return the same color.
 * @param total The total number of items and colors required.
 * @returns The color in hex format.
 */
export function chartColor(index: number, total: number) {
  const s = 62
  const l = 60
  const h = Math.floor((index / total) * 360)

  return hslToHex(h, s, l)
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100
  const a = (s * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
