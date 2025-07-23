/**
 * Validates IDs like: abc1234-xyz5678-lmn9012
 * 3 blocks.
 * Each consisting of 7 alphanumeric characters (uppercase and lowercase + digits).
 * Separated by dashes (-).
 */
const NANOID_REGEX = /^[A-Za-z0-9]{7}-[A-Za-z0-9]{7}-[A-Za-z0-9]{7}$/

export function isValidNanoid (id) {
  const validateRegex = NANOID_REGEX.test(id)
  return validateRegex
}
