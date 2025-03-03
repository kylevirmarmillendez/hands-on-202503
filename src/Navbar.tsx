import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          User Management
        </div>
        <div className="navbar-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/create" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Create User
          </NavLink>
          <NavLink 
            to="/users" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            View Users
          </NavLink>
        </div>
      </div>
    </nav>
  );
}