import { loadEnvConfig } from '@next/env'
import type { Preview } from '@storybook/react'
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import '../app/globals.css'

const projectDir = process.cwd()

//? Inject environment variables into Storybook
loadEnvConfig(projectDir)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      toc: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextRouter: {
      Provider: AppRouterContext.Provider,
    },
  },
}

export default preview
