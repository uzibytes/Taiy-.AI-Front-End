import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../public/Sidebar.css';
import linkedinLogo from '../../public/dist/images/linkedin-logo.png';
import githubLogo from '../../public/dist/images/github-logo-white.png';
import portfolioLogo from '../../public/dist/images/portfolio-logo.png';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, closeSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="hamburger" onClick={toggleSidebar}>
        {isOpen ? '✖' : '☰'}
      </button>
      {/* Navigation links */}
      <nav className="shift">
        <div className="pb-4 text-xl font-bold">DASHBOARD</div>
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeSidebar}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacts" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeSidebar}>
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink to="/charts-and-maps" className={({ isActive }) => (isActive ? 'active' : '')} onClick={closeSidebar}>
              Charts and Maps
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* Foooter for Sidebar */}
      <div className="sidebar-footer">
        <a href="https://linkedin.com/in/uraj" target="_blank" rel="noopener noreferrer">
          <img src={linkedinLogo} alt="LinkedIn Logo" className="logo" />
        </a>
        <a href="https://github.com/uzibytes" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="GitHub Logo" className="logo" />
        </a>
        <a href="https://ujjwalraj.me" target="_blank" rel="noopener noreferrer">
          <img src={portfolioLogo} alt="Portfolio Logo" className="logo" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
