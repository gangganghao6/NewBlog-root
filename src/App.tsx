import { ReactElement, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App(): ReactElement {
  const [count, setCount] = useState(0)
  useEffect(() => {
    axios
      .get('https://192.168.5.11:8080/api/')
      .then((res) => {
        console.log(res)
        setCount(res.data.hello)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer"></a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
