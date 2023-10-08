import TestSuiteInfo from '@/components/TestSuiteInfo/TestSuiteInfo'
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
  const client = new TestSuiteClient()
  const suite = await client.unsafeSuite(props.params.id)

  return <TestSuiteInfo suite={suite} />
}
