import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
        Trang chủ
      </NavLink>
      <NavLink to="/san-pham" className={({ isActive }) => isActive ? 'active' : ''}>
        Sản phẩm
      </NavLink>
      <NavLink to="/lien-he" className={({ isActive }) => isActive ? 'active' : ''}>
        Liên hệ
      </NavLink>
    </nav>
  );
}

export default Navbar;
