import { api, shared } from '@ivy-chess/api-schema'
import { z } from 'zod'
import { Client } from '../Client'
import { JWTProvider } from '../auth/store/types'
import { TokenStrategy } from '../auth/strategy/TokenStrategy'
import { Config, ReturnType } from '../types'

/**
 * The credentials returned by the API when signing in or signing up.
 */
export interface Credentials {
  /**
   * The access token.
   */
  jwt: string

  /**
   * The refresh token.
   */
  refreshToken: string
}

interface SignUpResponse {
  credentials?: Credentials
  user: UserData
}

/**
 * The data of a user.
 */
export type UserData = z.infer<typeof shared.user.userSchema>

/**
 * The filter options for the user list.
 */
export type UserFilterOptions = z.infer<typeof api.auth.userFilterOptionsSchema>

/**
 * A client for the authentication API.
 */
export class AuthClient extends Client<Config<typeof api.auth.authenticationRoute>> {
  constructor(strategy: TokenStrategy<JWTProvider>) {
    super(api.auth.authenticationRoute, process.env.NEXT_PUBLIC_AUTH_HOST, strategy)
  }

  /**
   * Signs in a user with the given email and password.
   *
   * @param email The email of the user to sign in.
   * @param password The password of the user to sign in.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async signIn(email: string, password: string): Promise<ReturnType<Credentials>> {
    return await this.fetch('signIn', 'no-store', {
      body: { email, password },
    })
  }

  /**
   * Signs up a user with the given email, username and password.
   * The response contains the user data and optionally the credentials,
   * if the acccount could be created instantly.
   *
   * @param email The email of the user to sign up.
   * @param username The username of the user to sign up.
   * @param password The password of the user to sign up.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async signUp(
    email: string,
    username: string,
    password: string
  ): Promise<ReturnType<SignUpResponse>> {
    return await this.fetch('signUp', 'no-store', {
      body: { email, password, username },
    })
  }

  /**
   * Refreshes the access token with the given refresh token.
   *
   * @param token The refresh token to use.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async refresh(token: string): Promise<ReturnType<Credentials>> {
    return await this.fetch('refresh', 'no-store', {
      body: { refreshToken: token },
    })
  }

  /**
   * Fetches the profile of the currently signed in user.
   *
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async profile(): Promise<ReturnType<UserData>> {
    return await this.fetch('profile', 'no-store', {})
  }

  /**
   * Signs out the currently signed in user.
   *
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async signOut(): Promise<ReturnType<{ success: boolean }>> {
    return await this.fetch('signOut', 'no-store', {})
  }

  /**
   * Deletes the currently signed in user.
   *
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async delete(): Promise<ReturnType<{ success: boolean }>> {
    return await this.fetch('delete', 'no-store', {})
  }

  /**
   * Removes the user with the given id.
   * Requires the signed in user to have the 'manager' role.
   * Otherwise, the request will fail.
   *
   * @param id The id of the user to remove.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async remove(id: string): Promise<ReturnType<{ success: boolean }>> {
    return await this.fetch('remove', 'no-store', {
      params: { id },
    })
  }

  /**
   * Updates the role of the user with the given id.
   * Requires the signed in user to have the 'manager' role.
   *
   * @param role The new role of the user.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async update(id: string, role: UserData['role']): Promise<ReturnType<UserData>> {
    return await this.fetch('update', 'no-store', {
      params: { id },
      body: { user: { role } },
    })
  }

  /**
   * Fetches a list of users using the given filter options.
   * Requires the signed in user to have the 'manager' role.
   *
   * @param options The filter options to use.
   * @returns The result of the fetch request.
   * @throws When the fetch result is not compatible with the schema or a network error, etc... occurs.
   */
  public async list(options?: UserFilterOptions): Promise<ReturnType<UserData[]>> {
    return await this.fetch('list', 'no-store', {
      query: options ?? {},
    })
  }
}
