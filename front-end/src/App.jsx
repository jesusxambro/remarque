import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ResponsiveAppBar from "./components/navigation/ResponsiveAppBar.jsx";
// {/*<div>*/}
// {/*  <a href="https://vitejs.dev" target="_blank">*/}
// {/*    <img src="/vite.svg" className="logo" alt="Vite logo" />*/}
// {/*  </a>*/}
// {/*  <a href="https://reactjs.org" target="_blank">*/}
// {/*    <img src={reactLogo} className="logo react" alt="React logo" />*/}
// {/*  </a>*/}
// {/*</div>*/}
function App() {

  return (
    <div >
      <ResponsiveAppBar/>
        <div> Test </div>

    </div>
  )
}

export default App
