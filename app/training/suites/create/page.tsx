import CreateTestSuiteForm from '@/components/TestSuiteForm/CreateTestSuiteForm'
import { fetchEngineConfigs } from '@/lib/data/Engine'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Create Test Suite',
  description: 'Create a new test suite',
}

export default async function Create() {
  const configs = await fetchEngineConfigs()

  return <CreateTestSuiteForm configs={configs} />
}
