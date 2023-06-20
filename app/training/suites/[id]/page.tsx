import TestSuiteInfo from '@/components/TestSuiteInfo/TestSuiteInfo'
import { fetchTestSuite } from '@/lib/data/Test'
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
  const suite = await fetchTestSuite(props.params.id)

  return <TestSuiteInfo suite={suite} />
}
