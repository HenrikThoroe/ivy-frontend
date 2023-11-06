import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/blocks',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve?.modules?.push(path.resolve(__dirname, '../'))

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve?.alias,
        '@/lib': path.resolve(__dirname, '../lib'),
        '@/components': path.resolve(__dirname, '../components'),
      }
    }

    return config
  },
}

export default config
