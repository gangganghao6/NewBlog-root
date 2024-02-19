// import { confirmAuth, rootLogin } from '@/requests/base/root'
import { useRequest } from 'ahooks'
import { useState } from 'react'
import AdminLogin from './login'
import AdminRegister from './register'

export default function Login() {
  // const { data, error } = useRequest(
  //   rootLogin.bind(null, { account: '530394623', password: '2001628d' })
  // )
  // console.log(data, error)
  const [needLogin, setNeedLogin] = useState(true)

  return (
    <>
      {needLogin ? (
        <AdminLogin setNeedLogin={setNeedLogin} />
      ) : (
        <AdminRegister setNeedLogin={setNeedLogin} />
      )}
    </>
  )
}
