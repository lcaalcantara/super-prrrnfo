import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './components/header/Header'
import Table from './components/table/Table'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Table />
  </React.StrictMode>,
)
