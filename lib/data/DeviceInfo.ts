import { TestDriver } from '@ivy-chess/model'
import { resize } from '../util/array'
import { formatMemSize } from '../util/format'

/**
 * Distribution of RAM over the connected devices.
 * Memory capacity is rounded to the next higher Gigabyte.
 */
export type MemoryDistribution = {
  devices: number
  capacity: number
}[]

/**
 * Distribution of operating systems over the connected devices.
 */
export type OSDistribution = {
  name: string
  amount: number
}[]

/**
 * Distribution of CPUs over the connected devices.
 * CPUs are identified by cores and threads.
 */
export type CPUDistribution = {
  cores: number
  threads: number
  amount: number
}[]

/**
 * Information about the accumulated available memory.
 */
export interface MemoryInfo {
  total: string
  distribution: MemoryDistribution
}

/**
 * Information about operating systems of connected devices.
 */
export interface OSInfo {
  devices: number
  distribution: OSDistribution
}

/**
 * Information about CPU cores and threads of the connected devices.
 */
export interface CoreInfo {
  devices: number
  cores: number
  threads: number
  cpus: CPUDistribution
}

/**
 * Information about memory, cpu and operating systems
 * of connected devices.
 *
 * @see {@link MemoryInfo}
 * @see {@link OSInfo}
 * @see {@link CoreInfo}
 */
export interface DeviceInfo {
  memory: MemoryInfo
  os: OSInfo
  core: CoreInfo
  connected: number
}

/**
 * Parse device info from a list of drivers.
 * Iterates over all drivers and collects information about the hardware.
 *
 * @param drivers List of connected {@link TestDriver drivers}
 * @returns A {@link DeviceInfo} object conatining stats about the hardware of the drivers.
 */
export async function parseDeviceInfo(drivers: TestDriver[]): Promise<DeviceInfo> {
  const connected = drivers.length

  const stats = {
    cores: 0,
    threads: 0,
    memory: 0,
  }

  const distribution = {
    memory: new Array<number>(),
    os: new Map<string, number>(),
    core: new Map<number, number>(),
  }

  for (const driver of drivers) {
    const cpus = driver.hardware?.cpu
    const mem = driver.hardware?.memory
    const os = driver.hardware?.os

    if (os) {
      distribution.os.set(os, (distribution.os.get(os) ?? 0) + 1)
    }

    if (cpus?.length ?? 0 > 0) {
      const cpu = cpus![0]
      const cores = cpu.cores
      const threads = cpu.threads

      if (cores && threads) {
        const key = (cores << 16) ^ threads

        stats.cores += cores
        stats.threads += threads
        distribution.core.set(key, (distribution.core.get(key) ?? 0) + 1)
      }
    }

    if (mem) {
      const memGb = Math.ceil(mem / 1_000_000_000)

      if (distribution.memory.length < memGb) {
        distribution.memory = resize(distribution.memory, memGb, 0)
      }

      stats.memory += mem
      distribution.memory[memGb - 1] += 1
    }
  }

  return {
    connected,
    memory: {
      total: formatMemSize(stats.memory, 2),
      distribution: distribution.memory.map((devices, capacity) => ({
        devices,
        capacity: capacity + 1,
      })),
    },
    os: {
      devices: connected,
      distribution: Array.from(distribution.os.entries()).map(([name, amount]) => ({
        name,
        amount,
      })),
    },
    core: {
      devices: connected,
      cores: stats.cores,
      threads: stats.threads,
      cpus: Array.from(distribution.core.entries()).map(([key, amount]) => ({
        cores: (key >> 16) & 0xffff,
        threads: key & 0xffff,
        amount,
      })),
    },
  }
}
