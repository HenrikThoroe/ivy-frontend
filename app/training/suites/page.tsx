import TestSuiteList from '@/components/TestSuiteList/TestSuiteList'
import { fetchTestSuites, fetchTestSuite } from '@/lib/data/Test'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Test Suite List',
  description: 'List of available test suites',
}

export default async function Suites() {
  const ids = await fetchTestSuites()
  const suites = await Promise.all(ids.map((id) => fetchTestSuite(id)))

  return <TestSuiteList suites={suites} />
}
