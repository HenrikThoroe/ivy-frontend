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
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded'
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded'

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
  | 'assignment'
  | 'edit'
  | 'copy'
  | 'filter'
  | 'visibility'
  | 'error'
  | 'replay'
  | 'next'
  | 'prev'
  | 'query-stats'
  | 'remove'

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
    case 'assignment':
      return <AssignmentRoundedIcon />
    case 'edit':
      return <EditRoundedIcon />
    case 'copy':
      return <ContentCopyRoundedIcon />
    case 'filter':
      return <FilterListRoundedIcon />
    case 'visibility':
      return <VisibilityRoundedIcon />
    case 'error':
      return <ErrorOutlineRoundedIcon />
    case 'replay':
      return <ReplayRoundedIcon />
    case 'next':
      return <ArrowForwardIosRoundedIcon />
    case 'prev':
      return <ArrowBackIosRoundedIcon />
    case 'query-stats':
      return <QueryStatsRoundedIcon />
    case 'remove':
      return <RemoveRoundedIcon />
  }
}
