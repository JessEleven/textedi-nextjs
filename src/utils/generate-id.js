import { customAlphabet } from 'nanoid'

const safeAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoidSafe = customAlphabet(safeAlphabet, 21)

/**
 * Generates a segmented ID every 6 characters, separated by ‘-’.
 * e.g. abC123-deF456-ghi789
 */
export function generateId () {
  const rawId = nanoidSafe()
  const formattedId = rawId.match(/.{1,7}/g).join('-')
  return formattedId
}
