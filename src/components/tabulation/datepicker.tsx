import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'
import 'dayjs/locale/zh-cn'

export default function ({
  item,
  formData,
  setFormData
}: {
  item: { key: string; label: string }
  formData: any
  setFormData: Function
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'zh-cn'}>
      <DatePicker
        label={item.label}
        value={formData[item.key]}
        sx={{ width: '100%',height: '56px !important',overflow: 'hidden' }}
        onChange={(e: any) => {
          setFormData({
            ...formData,
            [item.key]: e
          })
        }}
      />
    </LocalizationProvider>
  )
}
