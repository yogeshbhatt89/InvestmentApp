import EmailIcon from '@mui/icons-material/Email'
import NotificationsIcon from '@mui/icons-material/Notifications'
import VisibilityIcon from '@mui/icons-material/Visibility'
import TabIcon from '@mui/icons-material/Tab'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import MenuIcon from '@mui/icons-material/Menu'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import LanguageIcon from '@mui/icons-material/Language'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'
import InfoIcon from '@mui/icons-material/Info'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FavoriteIcon from '@mui/icons-material/Favorite'
import StarIcon from '@mui/icons-material/Star'

export const Icons = {
  Email: EmailIcon,
  Notifications: NotificationsIcon,
  Visibility: VisibilityIcon,
  Tab: TabIcon,
  Settings: SettingsIcon,
  Person: PersonIcon,
  Security: SecurityIcon,
  Menu: MenuIcon,
  ColorLens: ColorLensIcon,
  Language: LanguageIcon,
  Home: HomeIcon,
  Search: SearchIcon,
  Add: AddIcon,
  Delete: DeleteIcon,
  Edit: EditIcon,
  Close: CloseIcon,
  Check: CheckIcon,
  Error: ErrorIcon,
  Warning: WarningIcon,
  Info: InfoIcon,
  ArrowBack: ArrowBackIcon,
  ArrowForward: ArrowForwardIcon,
  MoreVert: MoreVertIcon,
  Dashboard: DashboardIcon,
  Favorite: FavoriteIcon,
  Star: StarIcon,
} as const

export type IconName = keyof typeof Icons
