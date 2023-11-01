import UploadEngineForm from '@/components/(form)/UploadEngineForm/UploadEngineForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Engine Upload',
  description: 'Upload a new engine',
}

export default function Upload() {
  return <UploadEngineForm />
}
