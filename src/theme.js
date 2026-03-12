import { readJson, writeJson } from './storage.js'

const THEME_KEY = 'tema'

/**
 * @typedef {'dark'|'light'} ThemeMode
 */

/**
 * @returns {ThemeMode}
 */
export function getInitialTheme() {
  const saved = readJson(THEME_KEY, null)
  if (saved === 'dark' || saved === 'light') return saved
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/**
 * @param {ThemeMode} mode
 * @param {HTMLElement} root
 * @param {HTMLButtonElement} btn
 */
export function applyTheme(mode, root, btn) {
  const dark = mode === 'dark'
  root.classList.toggle('dark', dark)
  btn.textContent = dark ? '☀️ Modo claro' : '🌙 Modo oscuro'
  writeJson(THEME_KEY, dark ? 'dark' : 'light')
}

/**
 * @param {HTMLElement} root
 * @returns {ThemeMode}
 */
export function toggleTheme(root) {
  return root.classList.contains('dark') ? 'light' : 'dark'
}
