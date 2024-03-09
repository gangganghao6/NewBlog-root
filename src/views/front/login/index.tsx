import { useState } from 'react'
import FrontLogin from './login'
import FrontRegister from './register'

export default function Login() {
  const [needLogin, setNeedLogin] = useState(true)

  return (
    <>
      {needLogin ? (
        <FrontLogin setNeedLogin={setNeedLogin} />
      ) : (
        <FrontRegister setNeedLogin={setNeedLogin} />
        // <Button onClick={()=>setNeedLogin(true)}></Button>
      )}
    </>
  )
}
