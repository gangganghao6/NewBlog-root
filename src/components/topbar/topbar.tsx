import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Toolbar as MuiToolbar,
  List as MuiList,
  CssBaseline as MuiCssBaseline,
  Typography as MuiTypography,
  Divider as MuiDivider,
  ListItem as MuiListItem
} from '@mui/material'
import {
  Menu as MuiMenuIcon,
  ChevronLeft as MuiChevronLeftIcon,
} from '@mui/icons-material'
import {
  DrawerHeader,
  Drawer,
  AppBar,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton
} from './components'
import { useSnapshot } from 'valtio'
import { GlobalInfo } from '@/state/base'
import { useLinkClickHandler } from 'react-router-dom'
import MENU_LIST from '@/routes/menu-list'

export default function MiniDrawer(props: any) {
  const snap = useSnapshot(GlobalInfo)
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      <MuiCssBaseline />
      <AppBar position="fixed" open={open}>
        <MuiToolbar>
          <IconButton
            color="inherit"
            onClick={() => setOpen(true)}
            edge="start"
            open={open}
          >
            <MuiMenuIcon />
          </IconButton>
          <MuiTypography variant="h6" noWrap component="div">
            {snap.title}
          </MuiTypography>
        </MuiToolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          111
          <IconButton onClick={() => setOpen(false)}>
            <MuiChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <MuiDivider />
        <MuiList>
          {MENU_LIST.map((item, index) => (
            <MuiListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={useLinkClickHandler(item.path)}
                open={open}
              >
                <ListItemIcon open={open}>
                  {/* {index % 2 === 0 ? <MuiInboxIcon /> : <MuiMailIcon />} */}
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} open={open} />
              </ListItemButton>
            </MuiListItem>
          ))}
        </MuiList>
        {/* <MuiDivider />
        <MuiList>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <MuiListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton open={open}>
                <ListItemIcon open={open}>
                  {index % 2 === 0 ? <MuiInboxIcon /> : <MuiMailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} open={open} />
              </ListItemButton>
            </MuiListItem>
          ))}
        </MuiList> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  )
}
