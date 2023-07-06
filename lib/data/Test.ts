import { TestSuite } from '@ivy-chess/model'
import { HTTPError } from '../util/error'

export interface TestSession {
  id: string
  suite: TestSuite
  remaining: number
}

export async function createTestSession(suiteId: string, drivers: number): Promise<TestSession> {
  const url = `${process.env.NEXT_PUBLIC_TEST_SERVER_HOST}/sessions`
  const response = await fetch(url, {
    method: 'post',
    mode: 'cors',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ suite: suiteId, driver: drivers }),
  })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to create test session`)
  }

  return await response.json()
}

export async function fetchTestSessions(): Promise<TestSession[]> {
  const url = `${process.env.NEXT_PUBLIC_TEST_SERVER_HOST}/sessions`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch test sessions`)
  }

  return await response.json()
}

export async function deleteTestSession(id: string): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_TEST_SERVER_HOST}/sessions/${id}`
  const response = await fetch(url, { method: 'delete', mode: 'cors' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to delete test session: ${id}`)
  }
}

export async function createTestSuite(suite: Omit<TestSuite, 'id'>): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_TEST_SERVER_HOST}/suites`
  const response = await fetch(url, {
    method: 'post',
    mode: 'cors',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(suite),
  })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to create test suite`)
  }
}

export async function deleteTestSuite(id: string): Promise<void> {
  const url = `${process.env.NEXT_PUBLIC_TEST_SERVER_HOST}/suites/${id}`
  const response = await fetch(url, { method: 'delete', mode: 'cors' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to delete test suite: ${id}`)
  }
}

export async function fetchTestSuites(): Promise<string[]> {
  const url = `${process.env.NEXT_PUBLIC_TEST_SERVER_HOST}/suites`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch test suites`)
  }

  return await response.json()
}

export async function fetchTestSuite(id: string): Promise<TestSuite> {
  const url = `${process.env.NEXT_PUBLIC_TEST_SERVER_HOST}/suites/${id}`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'force-cache' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch test suite: ${id}`)
  }

  return await response.json()
}
