import type { StorybookConfig } from '@storybook/react-vite'

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
}
export default config
