/**
 * Copy this version over to astro.config.mjs to run the server with a node adapter to connect to the Arduino
 */
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
    // Enable React to support React JSX components.
    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
    ],
    output: 'server',
    adapter: node({
        mode: 'standalone',
    }),
})
