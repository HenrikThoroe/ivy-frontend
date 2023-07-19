import { fetchReplayLogs } from '@/lib/data/Replay'
import { NextResponse, NextRequest } from 'next/server'
import AdmZip from 'adm-zip'
import { formatLog } from '@/lib/util/format'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const logs = await fetchReplayLogs(id)

  if (!logs) {
    return new NextResponse(null, { status: 404 })
  }

  const json = {
    white: JSON.stringify(logs.white, undefined, 4),
    black: JSON.stringify(logs.black, undefined, 4),
  }

  const text = {
    white: formatLog(logs.white),
    black: formatLog(logs.black),
  }

  const zip = new AdmZip(undefined, { method: 0 })

  zip.addFile('white.json', Buffer.from(json.white))
  zip.addFile('black.json', Buffer.from(json.black))
  zip.addFile('white.txt', Buffer.from(text.white))
  zip.addFile('black.txt', Buffer.from(text.black))

  return new NextResponse(zip.toBuffer(), {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${id}.zip"`,
    },
  })
}
