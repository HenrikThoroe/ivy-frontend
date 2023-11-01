import DeviceInfoView from '@/components/(view)/DeviceInfoView/DeviceInfoView'
import NoContentView from '@/components/(view)/NoContentView/NoContentView'
import { serverStrategy } from '@/lib/api/auth/strategy/server'
import { TestDriverClient } from '@/lib/api/clients/TestDriverClient'
import { parseDeviceInfo } from '@/lib/data/DeviceInfo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ivy - Device List',
  description: 'List of connected devices',
}

export default async function Devices() {
  const client = new TestDriverClient(serverStrategy())
  const drivers = await client.unsafeDrivers()
  const deviceInfo = await parseDeviceInfo(drivers)

  if (deviceInfo.connected === 0) {
    return (
      <NoContentView
        title="No Devices Connected"
        message={
          'When clients connect to the backend, an overview about them will be displayed here. ' +
          'The devices can be used to train the chess engine. ' +
          'You could start by downloading the adapter and run the train command.'
        }
      />
    )
  }

  return (
    <DeviceInfoView
      devices={deviceInfo.connected}
      cores={deviceInfo.core.cores}
      threads={deviceInfo.core.threads}
      memory={deviceInfo.memory.total}
    />
  )
}
