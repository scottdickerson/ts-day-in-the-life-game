import js from '@eslint/js'
import astroPlugin from 'eslint-plugin-astro'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            '.astro/**',
            '.vercel/**',
            'scripts/**',
        ],
    },
    js.configs.recommended,
    {
        plugins: { astroPlugin, typescriptPlugin },
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
    },
]
