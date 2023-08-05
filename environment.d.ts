declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: 'production' | 'test' | 'development'
    readonly EVC_HOST: string
    readonly TEST_SERVER_HOST: string
    readonly NEXT_PUBLIC_EVC_HOST: string
    readonly NEXT_PUBLIC_TEST_SERVER_HOST: string
    readonly REPLAYS_HOST: string
    readonly STATS_HOST: string
    readonly NEXT_PUBLIC_STATS_HOST: string
  }
}
