export type LayoutVariant = 'custom-1' | 'custom-2' | 'custom-3' | 'custom-4' | 'custom-5'

/**
 * Translates a layout variant to a Tailwind CSS class defining the number of grid columns.
 *
 * @param variant The layout variant to translate.
 * @returns The Tailwind CSS class.
 */
export function translateLayoutVariant(variant: LayoutVariant) {
  return `grid-cols-${variant}`
}
