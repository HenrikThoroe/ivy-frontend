import DeviceInfoCard from '@/components/Card/DeviceInfo'
import CoresChart from '@/components/Chart/Cores'
import MemoryChart from '@/components/Chart/Memory'
import OSDistributionChart from '@/components/Chart/OSDistribution'
import NoContent from '@/components/NoContent/NoContent'
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
      <NoContent
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
    <div className="flex w-full items-center justify-center py-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-row gap-10">
          <DeviceInfoCard label="Memory" value={deviceInfo.memory.total} size="lg">
            <MemoryChart mem={deviceInfo.memory.distribution} />
          </DeviceInfoCard>
          <DeviceInfoCard label="Devices" value={`${deviceInfo.os.devices}`}>
            <OSDistributionChart os={deviceInfo.os.distribution} />
          </DeviceInfoCard>
        </div>
        <DeviceInfoCard
          label="Cores / Threads"
          value={`${deviceInfo.core.cores} / ${deviceInfo.core.threads}`}
        >
          <CoresChart cpus={deviceInfo.core.cpus} />
        </DeviceInfoCard>
      </div>
    </div>
  )
}
