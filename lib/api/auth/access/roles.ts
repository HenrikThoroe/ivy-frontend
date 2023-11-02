import { shared } from '@ivy-chess/api-schema'
import { AuthClient } from '../../clients/AuthClient'
import { JWTProvider, RoleProvider } from '../store/types'
import { TokenStrategy } from '../strategy/TokenStrategy'

async function hasRole(strategy: TokenStrategy<RoleProvider & JWTProvider>, accepted: string[]) {
  const roleToken = strategy.store.role

  if (roleToken.available) {
    return accepted.includes(roleToken.token)
  }

  const client = new AuthClient(strategy)
  const user = await client.profile()

  if (!user.success) {
    return false
  }

  return accepted.includes(user.result.role)
}

/**
 * Checcks whether the current user is a contributor.
 * The function will try to fetch the role from a stored cookie.
 * If the cookie is not available, it will fetch the role from the server.
 *
 * @param strategy The strategy to use for reading the cookie
 * @returns Whether the user is a contributor
 */
export async function isContributor(strategy: TokenStrategy<RoleProvider & JWTProvider>) {
  return await hasRole(strategy, shared.user.contributorRoles)
}

/**
 * Checks whether the current user is a manager.
 * The function will try to fetch the role from a stored cookie.
 * If the cookie is not available, it will fetch the role from the server.
 *
 * @param strategy The strategy to use for reading the cookie
 * @returns Whether the user is a manager
 */
export async function isManager(strategy: TokenStrategy<RoleProvider & JWTProvider>) {
  return await hasRole(strategy, shared.user.managerRoles)
}
