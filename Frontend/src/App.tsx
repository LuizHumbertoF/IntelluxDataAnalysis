import './App.css'
import { MainPage } from './page/MainPage'
import { LangContextProvider } from './utils/LangContext'

function App() {

  return (
    <LangContextProvider>
      <MainPage/>
    </LangContextProvider>
  )
}

export default App
