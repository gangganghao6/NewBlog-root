import Button from '@mui/material/Button'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { GlobalInfo } from '@/state/base'
import { useSnapshot } from 'valtio'
export default function () {
  const state = useSnapshot(GlobalInfo)

  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={state.loading}
        onClick={() => (GlobalInfo.loading = false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
