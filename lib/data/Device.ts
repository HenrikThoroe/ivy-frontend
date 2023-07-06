import { TestDriver } from '@ivy-chess/model'
import { resize } from '../util/array'
import { HTTPError } from '../util/error'
import { formatMemSize } from '../util/format'

export type MemoryDistribution = {
  devices: number
  capacity: number
}[]

export type OSDistribution = {
  name: string
  amount: number
}[]

export type CPUDistribution = {
  cores: number
  threads: number
  amount: number
}[]

export interface MemoryInfo {
  total: string
  distribution: MemoryDistribution
}

export interface OSInfo {
  devices: number
  distribution: OSDistribution
}

export interface CoreInfo {
  devices: number
  cores: number
  threads: number
  cpus: CPUDistribution
}

export interface DeviceInfo {
  memory: MemoryInfo
  os: OSInfo
  core: CoreInfo
  connected: number
}

export async function fetchDeviceInfo(): Promise<DeviceInfo> {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_TEST_SERVER_HOST}/drivers`, {
    method: 'get',
    cache: 'no-store',
    mode: 'cors',
  })

  if (!resp.ok) {
    throw new HTTPError(resp.status, `Could not fetch device info.`)
  }

  const data: TestDriver[] = await resp.json()
  const osDistribution = new Map<string, number>()
  const coreDistribution = new Map<number, number>()
  let memory = 0
  let distribution: number[] = []
  let cores = 0
  let threads = 0
  let connected = 0

  if (!Array.isArray(data)) {
    throw new Error(`Invalid device info.`)
  }

  for (const driver of data) {
    if (
      !driver.hardware ||
      !driver.hardware.memory ||
      !driver.hardware.cpu ||
      !driver.hardware.os ||
      !driver.hardware.cpu[0] ||
      !driver.hardware.cpu[0].cores ||
      !driver.hardware.cpu[0].threads
    ) {
      continue
    }

    const mem = +driver.hardware.memory
    const memGb = Math.ceil(mem / 1_000_000_000)
    const cpuKey = (driver.hardware.cpu[0].cores << 16) ^ driver.hardware.cpu[0].threads

    if (
      isNaN(mem) ||
      mem == 0 ||
      !driver.hardware.cpu.length ||
      !driver.hardware.os ||
      !driver.hardware.cpu[0].cores ||
      !driver.hardware.cpu[0].threads
    ) {
      continue
    }

    memory += driver.hardware.memory
    coreDistribution.set(cpuKey, (coreDistribution.get(cpuKey) || 0) + 1)
    cores += driver.hardware.cpu[0].cores
    threads += driver.hardware.cpu[0].threads
    osDistribution.set(driver.hardware.os, (osDistribution.get(driver.hardware.os) || 0) + 1)
    connected += 1

    if (distribution[memGb] === undefined) {
      distribution = resize(distribution, memGb, 0)
    }

    distribution[memGb - 1] += 1
  }

  return {
    connected,
    memory: {
      total: formatMemSize(memory, 2),
      distribution: distribution.map((devices, capacity) => ({
        devices,
        capacity: capacity + 1,
      })),
    },
    os: {
      devices: connected,
      distribution: Array.from(osDistribution.entries()).map(([name, amount]) => ({
        name,
        amount,
      })),
    },
    core: {
      devices: connected,
      cores,
      threads,
      cpus: Array.from(coreDistribution.entries()).map(([key, amount]) => ({
        cores: (key >> 16) & 0xffff,
        threads: key & 0xffff,
        amount,
      })),
    },
  }
}
