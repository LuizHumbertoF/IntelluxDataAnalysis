import './App.css';
import { MainPage } from './page/MainPage';
import { InConstructionPage } from './page/InConstructionPage';
import { LangContextProvider } from './utils/LangContext';
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <LangContextProvider>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/developing' element={<InConstructionPage/>}/>
      </Routes>
    </LangContextProvider>
  )
}

export default App
