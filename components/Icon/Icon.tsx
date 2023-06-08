'use client'

import DesktopMacRoundedIcon from '@mui/icons-material/DesktopMacRounded'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded'
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'

export type IconName =
  | 'desktop'
  | 'storage'
  | 'play'
  | 'login'
  | 'stats'
  | 'add'
  | 'memory'
  | 'download'
  | 'upload'
  | 'attach'
  | 'delete'

interface Props {
  name: IconName
}

export default function Icon(props: Props) {
  switch (props.name) {
    case 'desktop':
      return <DesktopMacRoundedIcon />
    case 'storage':
      return <StorageRoundedIcon />
    case 'play':
      return <PlayCircleOutlineRoundedIcon />
    case 'login':
      return <LoginRoundedIcon />
    case 'stats':
      return <BarChartRoundedIcon />
    case 'add':
      return <AddRoundedIcon />
    case 'memory':
      return <MemoryRoundedIcon />
    case 'download':
      return <FileDownloadRoundedIcon />
    case 'upload':
      return <FileUploadRoundedIcon />
    case 'attach':
      return <AttachFileRoundedIcon />
    case 'delete':
      return <DeleteForeverRoundedIcon />
  }
}
