import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useState } from 'react'

export default function ({
  item,
  formData,
  setFormData
}: {
  item: { key: string; label: string; options: any[]; required: boolean }
  formData: any
  setFormData: Function
}) {
  const [error, setError] = useState(false)
  return (
    <TextField
      fullWidth
      size="small"
      required={item.required}
      error={error}
      select
      value={formData[item.key]}
      label={item.label}
      helperText={error && `${item.label}为必填项`}
      onBlur={(e) => setError(e.target.value === '' && item.required)}
      onChange={(e) => {
        setError(e.target.value === '' && item.required)
        setFormData({
          ...formData,
          [item.key]: e.target.value
        })
      }}
    >
      {item.options.map((option: any) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}
