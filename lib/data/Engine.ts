import { HTTPError } from '../util/error'

export interface EngineFlavour {
  capabilities: string[]
  os: string
  arch: string
  id: string
}

export interface EngineVariation {
  version: EngineVersion
  flavours: EngineFlavour[]
}

export interface EngineVersion {
  major: number
  minor: number
  patch: number
}

export interface EngineConfig {
  name: string
  variations: EngineVariation[]
}

export interface EngineInstance {
  name: string
  version: EngineVersion
  flavour: EngineFlavour
}

export function parseEngineVersion(version: string): EngineVersion {
  const [major, minor, patch] = version
    .replace('v', '')
    .split('.')
    .map((v) => parseInt(v, 10))

  if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
    throw new Error(`Invalid engine version: ${version}`)
  }

  return { major, minor, patch }
}

export function versionToString(version: EngineVersion): string {
  return `v${version.major}.${version.minor}.${version.patch}`
}

export function compareEngineVersions(a: EngineVersion, b: EngineVersion): number {
  if (a.major !== b.major) {
    return a.major - b.major
  }

  if (a.minor !== b.minor) {
    return a.minor - b.minor
  }

  return a.patch - b.patch
}

export function getInstances(engine: EngineConfig): EngineInstance[] {
  const instances: EngineInstance[] = []

  engine.variations.forEach((variation) => {
    variation.flavours.forEach((flavour) => {
      instances.push({
        name: engine.name,
        version: variation.version,
        flavour: flavour,
      })
    })
  })

  instances.sort((b, a) => {
    if (a.version.major !== b.version.major) {
      return a.version.major - b.version.major
    }

    if (a.version.minor !== b.version.minor) {
      return a.version.minor - b.version.minor
    }

    if (a.version.patch !== b.version.patch) {
      return a.version.patch - b.version.patch
    }

    if (a.flavour.os !== b.flavour.os) {
      return a.flavour.os.localeCompare(b.flavour.os)
    }

    if (a.flavour.arch !== b.flavour.arch) {
      return a.flavour.arch.localeCompare(b.flavour.arch)
    }

    if (a.flavour.capabilities.length !== b.flavour.capabilities.length) {
      return a.flavour.capabilities.length - b.flavour.capabilities.length
    }

    return a.flavour.id.localeCompare(b.flavour.id)
  })

  return instances
}

export function getSupportedOS(engine: EngineConfig): string[] {
  const osSet = new Set<string>()

  engine.variations.forEach((variation) => {
    variation.flavours.forEach((flavour) => {
      osSet.add(flavour.os)
    })
  })

  return Array.from(osSet)
}

export function getSupportedArch(engine: EngineConfig): string[] {
  const archSet = new Set<string>()

  engine.variations.forEach((variation) => {
    variation.flavours.forEach((flavour) => {
      archSet.add(flavour.arch)
    })
  })

  return Array.from(archSet)
}

export async function deleteEngineConfig(engine: string, id: string): Promise<boolean> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_EVC_HOST}/engines/${engine}/${id}`, {
    method: 'delete',
    cache: 'no-store',
    mode: 'cors',
  })

  if (!response.ok) {
    throw new HTTPError(response.status, 'Failed to delete engine')
  }

  const { removedEngine } = await response.json()

  if (typeof removedEngine !== 'boolean') {
    throw new Error('Failed to parse response')
  }

  return removedEngine
}

export async function fetchEngineConfig(name: string): Promise<EngineConfig> {
  const url = `${process.env.NEXT_PUBLIC_EVC_HOST}/engines/${name}`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch engine config: ${name}`)
  }

  return await response.json()
}

export async function fetchEngineConfigs(): Promise<EngineConfig[]> {
  const url = `${process.env.NEXT_PUBLIC_EVC_HOST}/engines`
  const response = await fetch(url, { method: 'get', mode: 'cors', cache: 'no-store' })

  if (!response.ok) {
    throw new HTTPError(response.status, `Failed to fetch engine configs`)
  }

  return await response.json()
}

export async function uploadEngine(engine: EngineInstance, data: Blob): Promise<void> {
  const formData = new FormData()
  const vData = 'v' + engine.version.major + '-' + engine.version.minor + '-' + engine.version.patch

  formData.append('name', engine.name)
  formData.append('version', vData)
  formData.append('os', engine.flavour.os)
  formData.append('arch', engine.flavour.arch)
  formData.append('engine', data)

  if (engine.flavour.capabilities.length > 0) {
    formData.append('capabilities', engine.flavour.capabilities.join(','))
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_EVC_HOST}/engines`, {
    method: 'post',
    body: formData,
    cache: 'no-store',
    mode: 'cors',
  })

  if (!response.ok) {
    throw new Error('Failed to upload engine')
  }
}
