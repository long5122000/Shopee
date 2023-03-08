import { useContext, useEffect } from 'react'
import './App.css'
import { AppContext } from './contexts/app.context'
import useRouteElements from './useRouteElement'
import { LocalStorageEventTarget } from './utils/auth'

function App() {
  const routerElement = useRouteElements()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return <div>{routerElement}</div>
}

export default App
