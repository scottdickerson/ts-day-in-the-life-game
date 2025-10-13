/**
 * Copy this version over to astro.config.mjs to run the server on vercel (No arduino connection)
 */

import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'

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
    adapter: vercel(),
})
