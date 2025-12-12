import { defineConfig } from 'eslint/config'
import nextPlugin from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextPlugin,
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
])