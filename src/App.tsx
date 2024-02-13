import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '@/components/topbar/topbar'
import '@/App.scss'
import Loading from '@/components/loading/loading'

export default function App() {
  return (
    <>
      <TopBar>
        <Outlet />
      </TopBar>
      <Loading />
    </>
  )
}
