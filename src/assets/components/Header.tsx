import React from 'react';
import '../../public/Header.css';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const location = useLocation();

  const getSectionName = () => {
    switch (location.pathname) {
      case '/contacts':
        return 'Contacts';
      case '/charts-and-maps':
        return 'Charts and Maps';
      default:
        return 'Home';
    }
  };

  return (
    <header className="header sticky">
      <button className="hamburger" onClick={toggleSidebar}>
        {isSidebarOpen ? '✖' : '☰'}
      </button>
      <h1 className="font-semibold">{getSectionName()}</h1>
    </header>
  );
};

export default Header;
