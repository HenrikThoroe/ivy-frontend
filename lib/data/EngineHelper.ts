import { EngineConfig, EngineFlavour, EngineInstance, EngineVersion } from '@ivy-chess/model'

/**
 * Representation of an executable engine instance.
 * An engine instance is executable when combining all
 * parameters to identify the single binary that runs on a given system.
 */
export interface Executable extends EngineInstance {
  flavour: EngineFlavour
}

/**
 * Helper class to work with {@link EngineConfig}.
 */
export class EngineHelper {
  /**
   * The engine configuration.
   */
  public readonly engine: EngineConfig

  constructor(engine: EngineConfig) {
    this.engine = engine
  }

  /**
   * A sorted list of all versions available for this engine.
   */
  public get versions(): EngineVersion[] {
    return this.engine.variations
      .flatMap((v) => v.version)
      .sort((a, b) => {
        if (a.major !== b.major) {
          return a.major - b.major
        }

        if (a.minor !== b.minor) {
          return a.minor - b.minor
        }

        return a.patch - b.patch
      })
  }

  /**
   * All supported architectures for this engine.
   */
  public get arch(): string[] {
    const set = new Set<string>()

    this.engine.variations.forEach((variation) => {
      variation.flavours.forEach((flavour) => {
        set.add(flavour.arch)
      })
    })

    return Array.from(set)
  }

  /**
   * All supported operating systems for this engine.
   */
  public get os(): string[] {
    const set = new Set<string>()

    this.engine.variations.forEach((variation) => {
      variation.flavours.forEach((flavour) => {
        set.add(flavour.os)
      })
    })

    return Array.from(set)
  }

  /**
   * All executable instances of this engine.
   * Sorted by version, os, arch, capabilities and flavour id.
   *
   * @see {@link Executable}
   */
  public get executables(): Executable[] {
    const executables: Executable[] = []

    this.engine.variations.forEach((variation) => {
      variation.flavours.forEach((flavour) => {
        executables.push({
          name: this.engine.name,
          version: variation.version,
          flavour: flavour,
        })
      })
    })

    executables.sort((b, a) => {
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

    return executables
  }
}
