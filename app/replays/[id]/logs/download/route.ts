import { ReplayClient } from '@/lib/api/clients/ReplayClient'
import { formatLog } from '@/lib/util/format'
import AdmZip from 'adm-zip'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const client = new ReplayClient()
  const logs = await client.logs(id)

  if (!logs.success) {
    return new NextResponse(null, { status: 404 })
  }

  const json = {
    white: JSON.stringify(logs.result.white, undefined, 4),
    black: JSON.stringify(logs.result.black, undefined, 4),
  }

  const text = {
    white: formatLog(logs.result.white),
    black: formatLog(logs.result.black),
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
