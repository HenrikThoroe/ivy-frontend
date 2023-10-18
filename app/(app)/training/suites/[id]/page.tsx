import TestSuiteInfo from '@/components/TestSuiteInfo/TestSuiteInfo'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { TestSuiteClient } from '@/lib/api/clients/TestSuiteClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Test Suite',
  description: 'Test suite information',
}

interface Props {
  params: {
    id: string
  }
}

export default async function Suite(props: Props) {
  const client = new TestSuiteClient(serverStrategy())
  const suite = await client.unsafeSuite(props.params.id)

  return <TestSuiteInfo suite={suite} />
}
