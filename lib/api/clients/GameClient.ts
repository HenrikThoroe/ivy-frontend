import { api } from '@ivy-chess/api-schema'
import { LiveGame } from '@ivy-chess/model'
import { z } from 'zod'
import { Client } from '../Client'
import { JWTProvider } from '../auth/store/types'
import { TokenStrategy } from '../auth/strategy/TokenStrategy'
import { Config, ReturnType, SuccessState } from '../types'

type CreateOptions = z.infer<typeof api.games.http.createSchema>

/**
 * A client for the games API.
 */
export class GameClient extends Client<Config<typeof api.games.http.gamesRoute>> {
  constructor(strategy: TokenStrategy<JWTProvider>) {
    super(api.games.http.gamesRoute, process.env.NEXT_PUBLIC_GAMES_HOST, strategy)
  }

  //* API

  /**
   * Creates a new live game.
   *
   * @param options The options to create the live game.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async create(options: CreateOptions): Promise<ReturnType<LiveGame>> {
    return await this.fetch('create', 'no-store', {
      body: options,
    })
  }

  /**
   * Fetches all live game ids from the API.
   *
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async list(): Promise<ReturnType<string[]>> {
    return await this.fetch('list', 'no-store', {})
  }

  /**
   * Fetches a live game from the API.
   *
   * @param id The id of the live game to fetch.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async get(id: string): Promise<ReturnType<LiveGame>> {
    return await this.fetch('get', 'no-store', {
      params: { id },
    })
  }

  /**
   * Deletes a live game from the API.
   *
   * @param id The id of the live game to delete.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async delete(id: string): Promise<ReturnType<SuccessState>> {
    return await this.fetch('delete', 'no-store', {
      params: { id },
    })
  }
}
