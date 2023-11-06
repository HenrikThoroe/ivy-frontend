import { UserData, UserFilterOptions } from '@/lib/api/clients/AuthClient'

interface Options {
  role: UserData['role'] | 'all'
  query?: string
  limit?: number
}

/**
 * Parses the given options into a filter object.
 * The query can be used to search for users by name or email.
 *
 * @param param0 The options to parse.
 * @returns The parsed filter options.
 */
export function parseFilter({ role, query, limit }: Options): UserFilterOptions {
  let name: string | undefined
  let email: string | undefined

  if (query) {
    const parts = query.trim().split(' ')

    for (const part of parts) {
      if (part.startsWith('name:')) {
        name = part.replace('name:', '')
      }

      if (part.startsWith('email:')) {
        email = part.replace('email:', '')
      }
    }

    if (!name && !email) {
      name = query
    }
  }

  return {
    name,
    email,
    limit,
    role: role === 'all' ? undefined : role,
  }
}
