import { formatMemSize } from '@/lib/util/format'

interface Props {
  /**
   * Number of devices connected
   */
  devices: number

  /**
   * Total number of cores
   */
  cores: number

  /**
   * Total number of threads
   */
  threads: number

  /**
   * Available memory in bytes
   */
  memory: number
}

/**
 * Displays an overview about the connected devices.
 */
export default function DeviceInfoView(props: Props) {
  const formatter = Intl.NumberFormat('en-US', {
    compactDisplay: 'short',
    notation: 'compact',
  })

  return (
    <article className="flex flex-col items-center gap-32">
      <section className="flex w-full flex-col items-center justify-center gap-4 p-16">
        <span className="bg-gradient-to-br from-emerald-400 to-cyan-600 bg-clip-text text-9xl font-extrabold text-transparent">
          {props.devices}
        </span>
        <span className="text-4xl font-medium text-on-primary-light">
          {props.devices !== 1 ? 'Devices' : 'Device'} Connected
        </span>
      </section>

      <section className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
        <section className="flex flex-col items-center justify-center gap-4 rounded-md p-16 shadow-card">
          <span className="text-xl font-bold text-on-primary-light">Using</span>
          <span className="bg-gradient-to-br from-pink-400 to-red-600 bg-clip-text text-5xl font-extrabold text-transparent">
            {formatter.format(props.cores)} Cores
          </span>
        </section>

        <section className="flex flex-col justify-center gap-4 rounded-md p-16">
          <span className="text-xl font-bold text-on-primary-light">And</span>
          <span className="bg-gradient-to-br from-pink-400 to-orange-600 bg-clip-text text-4xl font-extrabold text-transparent">
            {formatter.format(props.threads)} Threads
          </span>
        </section>
      </section>

      <section className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
        <section className="flex flex-col items-center justify-center gap-4 rounded-md p-16">
          <span className="text-xl font-bold text-on-primary-light">With a total</span>
          <span className="bg-gradient-to-br from-indigo-300 to-sky-600 bg-clip-text text-7xl font-extrabold text-transparent">
            {formatMemSize(props.memory, 0)} RAM
          </span>
        </section>
      </section>
    </article>
  )
}
