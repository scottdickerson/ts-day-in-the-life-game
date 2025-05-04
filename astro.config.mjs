// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
    // Enable React to support React JSX components.
    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
    ],
    output: 'static',
    // By default we're building a static site generation for building local html files that can be served with nginx however by copying the astro.config.vercel.serverless.mjs file to astro.config.mjs we can change the output to serverless.
})
