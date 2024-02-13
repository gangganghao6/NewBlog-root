import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import CompSelect from '@/components/tabulation/select'
import CompInput from '@/components/tabulation/input'
import CompDatePicker from '@/components/tabulation/datepicker'
import { useState } from 'react'

export default function Tabulation({
  column,
  data,
  setRequestPromise,
  searchConfig,
  api
}: {
  column: any[]
  data: any[]
  setRequestPromise: Function
  searchConfig: any[]
  api: Function
}) {
  const [formData, setFormData] = useState<any>({})
  const SearchComponents = searchConfig.map((item) => {
    let MapComponent
    switch (item.type) {
      case 'Input':
        MapComponent = (
          <CompInput
            item={item}
            formData={formData}
            setFormData={setFormData}
          />
        )
        break
      case 'Select':
        MapComponent = (
          <CompSelect
            item={item}
            formData={formData}
            setFormData={setFormData}
          />
        )
        break
      case 'DatePicker':
        MapComponent = (
          <CompDatePicker
            item={item}
            formData={formData}
            setFormData={setFormData}
          />
        )
        break
    }
    return (
      <div className="w-1/4 p-2">
          {MapComponent}
      </div>
    )
  })

  return (
    <>
      <div className="flex flex-wrap items-end">{SearchComponents}</div>
    </>
  )
}
