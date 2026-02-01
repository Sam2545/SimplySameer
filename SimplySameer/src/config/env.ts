/**
 * App config from environment (.env).
 * Vite only exposes variables prefixed with VITE_.
 */
export const username = import.meta.env.VITE_GITHUB_USERNAME as string | undefined
export const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined
