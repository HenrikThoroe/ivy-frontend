import CreateTestSuiteForm from '@/components/(form)/TestSuiteForm/CreateTestSuiteForm'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { EngineClient } from '@/lib/api/clients/EngineClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Create Test Suite',
  description: 'Create a new test suite',
}

export default async function Create() {
  const client = new EngineClient(serverStrategy())
  const configs = await client.unsafeEngines()

  return <CreateTestSuiteForm configs={configs} />
}
