import { Link } from 'react-router-dom';
import Navbar from './UI/navbar'
import { useState } from 'react';

export default function Nav({loggedin}) {
  <nav className="navbarNew">
  <ul>
    <li>
      <Link className="nav-link text-light newNavHead" to="/">
        Home
      </Link>
    </li>
    <li>
          <Link className="nav-link text-light newNavHead" to="/profile">
            Profile
          </Link>
        </li>
    {loggedin ? (
      <>
        <li>
          <Link className="nav-link text-light newNavHead" to="/basket">
            Card
          </Link>
        </li>
        <li>
          <Link className="nav-link text-light newNavHead" to="/logout">
            Logout
          </Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link className="nav-link text-light newNavHead" to="/login">
            Login
          </Link>
        </li>
      </>
    )}
  </ul>
</nav>
}
