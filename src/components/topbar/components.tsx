import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MuiListItemText, {
  ListItemTextProps as MuiListItemTextProps
} from '@mui/material/ListItemText'
import MuiDrawer from '@mui/material/Drawer'
import MuiListItemButton, {
  ListItemButtonProps as MuiListItemButtonProps
} from '@mui/material/ListItemButton'
import MuiListItemIcon, {
  ListItemIconProps as MuiListItemIconProps
} from '@mui/material/ListItemIcon'
import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps
} from '@mui/material/IconButton'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import { drawerWidth } from './variable'

/* AppBar */
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
export const AppBar = styled(MuiAppBar, {
  //   shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`
  })
}))

/* Drawer */
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

/* DrawerHeader */
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}))

/* ListItemText */
interface ListItemTextProps extends MuiListItemTextProps {
  open?: boolean
}
export const ListItemText = styled(MuiListItemText)<ListItemTextProps>(
  ({ theme, open }) => ({
    opacity: open ? 1 : 0,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  })
)

/* ListItemButton */
interface ListItemButtonProps extends MuiListItemButtonProps {
  open?: boolean
}
export const ListItemButton = styled(MuiListItemButton)<ListItemButtonProps>(
  ({ theme, open }) => ({
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
    transition: theme.transitions.create('justify-content', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  })
)

/* ListItemIcon */
interface ListItemIconProps extends MuiListItemIconProps {
  open?: boolean
}
export const ListItemIcon = styled(MuiListItemIcon)<ListItemIconProps>(
  ({ theme, open }) => ({
    minWidth: 0,
    marginRight: open ? theme.spacing(3) : 0,
    justifyContent: 'center',
    transition: theme.transitions.create('margin-right', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  })
)

/* IconButton */
interface IconButtonProps extends MuiIconButtonProps {
  open?: boolean
}
export const IconButton = styled(MuiIconButton)<IconButtonProps>(
  ({ theme, open }) =>
    open !== undefined && {
      marginRight: open ? theme.spacing(1) : theme.spacing(5),
      width: open ? 0 : theme.spacing(5),
      padding: `${open ? 0 : theme.spacing(1)} 0`,
      overflow: 'hidden',
      transition: theme.transitions.create(
        ['width', 'margin-right', 'padding'],
        {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
      )
    }
)
