import { useEffect, useState } from 'react'
import { Outlet, redirect, useLocation, useNavigate } from 'react-router-dom'
import AdminTopBar from '@/components/admin-topbar/topbar'
import '@/App-admin.scss'
// import { confirmAuth } from '@/requests/admin/base/root'
import { useRequest } from 'ahooks'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  // const { error } = useRequest(() => confirmAuth(), {
  //   manual: false
  // })

  // useEffect(() => {
  //   if (error) {
  //     navigate('/admin/login')
  //   }
  // }, [error])
  return (
    <>
      <AdminTopBar>
        <Outlet />
      </AdminTopBar>
    </>
  )
}
const getPrevUrl = (search: string) => {
  const location = useLocation()
}
