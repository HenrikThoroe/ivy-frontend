export type LayoutVariant =
  | 'custom-1'
  | 'custom-2'
  | 'custom-3'
  | 'custom-4'
  | 'custom-5'
  | 'user-list'

/**
 * Translates a layout variant to a Tailwind CSS class defining the number of grid columns.
 *
 * @param variant The layout variant to translate.
 * @returns An object with a single key-value pair, where the key is the Tailwind CSS class and the value is `true`.
 */
export function translateLayoutVariant(variant: LayoutVariant) {
  return {
    'grid-cols-custom-1': variant === 'custom-1',
    'grid-cols-custom-2': variant === 'custom-2',
    'grid-cols-custom-3': variant === 'custom-3',
    'grid-cols-custom-4': variant === 'custom-4',
    'grid-cols-custom-5': variant === 'custom-5',
    'grid-cols-user-list': variant === 'user-list',
  }
}
