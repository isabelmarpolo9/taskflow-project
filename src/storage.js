/**
 * @typedef {unknown} JsonValue
 */

/**
 * Read JSON from localStorage safely.
 * @template T
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
export function readJson(key, fallback) {
  const raw = localStorage.getItem(key)
  if (raw == null) return fallback
  try {
    return /** @type {T} */ (JSON.parse(raw))
  } catch {
    return fallback
  }
}

/**
 * Write JSON to localStorage safely.
 * @param {string} key
 * @param {unknown} value
 */
export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
