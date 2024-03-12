/// <reference types="vitest" />
/// <reference types="vite/client" />

import {defineConfig, configDefaults} from 'vitest/config'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig(({mode}) => ({
  plugins: [svelte(),
    macrosPlugin()],
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
    coverage: {
      exclude: [
        ...configDefaults.exclude, 
      'src/main.tsx', 'src/vite-env.d.ts', '**.config.**'
      ],
    },

  },
}))
