import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.scss'

const strict = false;
const root = ReactDOM.createRoot(document.getElementById('root')!)
if(strict) root.render(<React.StrictMode> <App /> </React.StrictMode>)
else root.render(<App />)
