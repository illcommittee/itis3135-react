import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
      <h1>Nate Gustafson&apos;s Notorious Gecko || ITIS 3135</h1>

      {/* Primary nav: shortened to the three React pages */}
      <nav>
        <NavLink to="/" end>Home</NavLink>
        {' || '}
        <NavLink to="/introduction">Introduction</NavLink>
        {' || '}
        <NavLink to="/contract">Contract</NavLink>
      </nav>
      </header>
  )
}

export default Header