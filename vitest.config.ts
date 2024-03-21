/// <reference types="vitest" />
/// <reference types="vite/client" />
import path, { resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

import {defineConfig, configDefaults} from 'vitest/config'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig(({mode}) => ({
  resetMocks: true,
  plugins: [svelte(),
    macrosPlugin(),
    tsconfigPaths()],
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src/App") }]
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      exclude: [
        ...configDefaults.exclude, 
      'src/main.tsx', 'src/vite-env.d.ts', '**.config.**'
      ],
    },

  },
}))
