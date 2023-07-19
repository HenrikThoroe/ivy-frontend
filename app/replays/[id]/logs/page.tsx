import Icon from '@/components/Icon/Icon'
import LogDisplay from '@/components/LogDisplay/LogDisplay'
import NoContent from '@/components/NoContent/NoContent'
import TabGroup from '@/components/TabGroup/TabGroup'
import { fetchReplayLogs } from '@/lib/data/Replay'

interface Params {
  id: string
}

export default async function Logs({ params }: { params: Params }) {
  const { id } = params
  const logs = await fetchReplayLogs(id)

  if (!logs) {
    return (
      <NoContent
        title="No Logs Available"
        message="Logs are saved up to one hour after the replay was recorded."
      />
    )
  }

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="flex flex-row justify-end">
        <a
          className="flex cursor-pointer flex-row gap-2 rounded-lg bg-action-primary px-4 py-3 text-on-secondary hover:bg-action-primary-active"
          download={`logs-${id}.zip`}
          href={`/replays/${id}/logs/download`}
        >
          <Icon name="download" />
          Download Logs
        </a>
      </div>
      <TabGroup
        tabs={[
          { label: 'White Engine', component: <LogDisplay log={logs.white} /> },
          { label: 'Black Engine', component: <LogDisplay log={logs.black} /> },
        ]}
      />
    </div>
  )
}
