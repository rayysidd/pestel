import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="header">PESTEL</div>
    
    <div class="nav-bar">
        <a href="#">Home</a>
        <a href="#">PESTEL analysis</a>
        <a href="#">Markets Reports</a>
        <a href="#">Portfolio</a>
        <a href="#">Contact</a>
    </div>
    
    <div class="container">
        <h1>Welcome</h1>
        <div class="data-box" id="financialData">Create PESTEL Analysis of any sector an company using Google Gemini</div>
    </div>
    
    <div class="footer">&copy; 2025 Financial Dashboard. All rights reserved.</div>
    </>
  )
}

export default App
