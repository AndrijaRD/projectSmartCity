import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './main.css'

const strict = false;
const root = ReactDOM.createRoot(document.getElementById('root')!)
if(strict) root.render(<React.StrictMode> <App /> </React.StrictMode>)
else root.render(<App />)