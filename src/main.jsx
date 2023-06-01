import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { TeamMakerApp } from './TeamMakerApp'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <BrowserRouter>
      <TeamMakerApp />
    </BrowserRouter>
  //</React.StrictMode>
)
