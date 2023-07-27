import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'

import { AuthContext } from '../../context/auth.context'
import './NavLinks.css'

function NavLinks() {
  const auth= useContext(AuthContext)
  return (
    <ul className='nav-links'>
      <li><NavLink to='/' exact>ALL USERS</NavLink></li>
      {auth.isLoggedIn && (<li><NavLink to='/u1/places' >MY PLACES</NavLink></li>)}
      {auth.isLoggedIn && (<li><NavLink to='/places/new'>NEW PLACES</NavLink></li>)}
      {!auth.isLoggedIn && (<li><NavLink to='/auth'>LOGIN </NavLink></li>)}
      {auth.isLoggedIn && (<li><button onClick={auth.logout} >LOGOUT</button></li>)}
    </ul>
  )
}

export default NavLinks