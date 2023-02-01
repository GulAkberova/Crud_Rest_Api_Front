import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <>
      <header>
      <h1>Full-Project</h1>
      <ul>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/products'}>Products</NavLink></li>
      </ul>
      </header>


    </>
  )
}

export default Header