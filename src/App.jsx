import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Introduction from './pages/Introduction.jsx'
import Contract from './pages/Contract.jsx'

function App() {
  return (
    <>
      {/* Handles document.title changes for all routes */}
      <PageTitleHandler />

      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/contract" element={<Contract />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function PageTitleHandler() {
  const location = useLocation()

  useEffect(() => {
    const base = "Nate Gustafson's Notorious Gecko"

    let suffix = 'Home'
    if (location.pathname === '/introduction') {
      suffix = 'Introduction'
    } else if (location.pathname === '/contract') {
      suffix = 'Contract'
    }

    document.title = `${base} || ${suffix}`
  }, [location.pathname])

  return null
}

export default App
