import {defineConfig} from 'vitest/config'
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
  },
}))
