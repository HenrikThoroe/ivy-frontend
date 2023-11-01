declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: 'production' | 'test' | 'development'
    readonly NEXT_PUBLIC_EVC_HOST: string
    readonly NEXT_PUBLIC_TEST_SERVER_HOST: string
    readonly NEXT_PUBLIC_REPLAYS_HOST: string
    readonly NEXT_PUBLIC_STATS_HOST: string
    readonly NEXT_PUBLIC_AUTH_HOST: string
    readonly NEXT_PUBLIC_REFRESH_URL: string
  }
}
