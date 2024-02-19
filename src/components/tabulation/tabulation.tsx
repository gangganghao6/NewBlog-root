import CompSelect from '@/components/tabulation/select'
import CompInput from '@/components/tabulation/input'
import CompDateRangePicker from '@/components/tabulation/daterangepicker'
import CompDatePicker from '@/components/tabulation/datepicker'
import { useRequest } from 'ahooks'
import { Form, message } from 'antd'
import styles from './tabulation.module.scss'
import CompSearch from './tabulation-search'
import CompTable from './tabulation-table'
import { Ref, forwardRef, useImperativeHandle } from 'react'
import clsx from 'clsx'

export default forwardRef(function Tabulation(
  {
    column,
    searchConfig,
    api,
    operation
  }: {
    column: any[]
    searchConfig: any[]
    api: Function
    operation: any[]
  },
  ref: Ref<any>
) {
  const [form] = Form.useForm()
  const SearchComponents = searchCompCreator(searchConfig)
  const { run, loading, data } = useRequest(
    (data) => api({ page: 1, size: 10, ...data }),
    { manual: false }
  )

  useImperativeHandle(
    ref,
    () => {
      return {
        onSearch: onSearch(form, run),
        onReset: onReset(form)
      }
    },
    []
  )
  return (
    <>
      <Form name="formData" form={form} layout="inline">
        {SearchComponents}
      </Form>
      <CompSearch
        loading={loading}
        onSearch={onSearch(form, run)}
        onReset={onReset(form)}
      />
      <CompTable
        operation={operation}
        column={column}
        data={data}
        loading={loading}
        onSearch={onSearch(form, run)}
      />
    </>
  )
})

function searchCompCreator(searchConfig: any[]) {
  return searchConfig.map((item) => {
    let MapComponent
    switch (item.type) {
      case 'Input':
        MapComponent = <CompInput item={item} />
        break
      case 'Select':
        MapComponent = <CompSelect item={item} />
        break
      case 'DateRangePicker':
        MapComponent = <CompDateRangePicker item={item} />
        break
      case 'DatePicker':
        MapComponent = <CompDatePicker item={item} />
        break
      default:
        MapComponent = <>未知组件</>
    }
    return (
      <div
        className={clsx(
          'w-1/4 p-2 flex items-center',
          styles['tabulation-input']
        )}
      >
        {MapComponent}
      </div>
    )
  })
}
function onSearch(form: any, run: Function) {
  return async (page: number = 1, size: number = 10) => {
    try {
      await form.validateFields()
      const values = form.getFieldsValue()
      run({ ...values, page, size })
    } catch (e: any) {
      const msg = e.errorFields
        .map((item: any) => item.errors.join(','))
        .join(';')
      message.error(msg)
    }
  }
}
function onReset(form: any) {
  return () => {
    form.resetFields()
  }
}
