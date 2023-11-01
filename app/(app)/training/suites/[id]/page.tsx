import TestSuiteView from '@/components/(view)/TestSuiteView/TestSuiteView'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { TestSuiteClient } from '@/lib/api/clients/TestSuiteClient'
import { Metadata } from 'next'

interface Props {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Ivy - Test Suite',
  description: 'Test suite information',
}

export default async function Suite(props: Props) {
  const client = new TestSuiteClient(serverStrategy())
  const suite = await client.unsafeSuite(props.params.id)

  return <TestSuiteView suite={suite} />
}
