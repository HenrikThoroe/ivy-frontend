import TestSuiteList from '@/components/(list)/TestSuiteList/TestSuiteList'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { TestSuiteClient } from '@/lib/api/clients/TestSuiteClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Test Suite List',
  description: 'List of available test suites',
}

export default async function Suites() {
  const client = new TestSuiteClient(serverStrategy())
  const ids = await client.unsafeSuites()
  const suites = await Promise.all(ids.map((id) => client.unsafeSuite(id)))

  return <TestSuiteList suites={suites} />
}
