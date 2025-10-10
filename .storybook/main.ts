import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'path'

const config: StorybookConfig = {
    stories: ['../src/components/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    typescript: {
        check: false,
    },
    docs: {
        autodocs: true,
    },
    viteFinal: async (config) => {
        // Configure path aliases to match tsconfig.json
        config.resolve = config.resolve || {}
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': resolve(__dirname, '../src'),
        }
        return config
    },
}
export default config
