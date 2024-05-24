import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/assets/pages/Home';
import Contacts from '../src/assets/pages/Contacts';
import ChartsAndMaps from '../src/assets/pages/ChartsAndMaps';
import Header from '../src/assets/components/Header';
import Sidebar from '../src/assets/components/Sidebar';
import './App.css';

// Main App component
const App: React.FC = () => {
  // State to manage the sidebar open/close status
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar open/close status
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    // Router component to handle routing within the app
    <Router>
      <div className="app-container">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} />
        <div className="main-content">
          {/* Header component with props to toggle the sidebar */}
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <div className="content py-5 px-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
