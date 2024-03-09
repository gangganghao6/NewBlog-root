import { useState } from 'react'
import AdminLogin from './login'
import AdminRegister from './register'
import { Button } from 'antd'

export default function Login() {
  const [needLogin, setNeedLogin] = useState(true)

  return (
    <>
      {needLogin ? (
        <AdminLogin setNeedLogin={setNeedLogin} />
      ) : (
        <AdminRegister setNeedLogin={setNeedLogin} />
        // <Button onClick={()=>setNeedLogin(true)}></Button>
      )}
    </>
  )
}
