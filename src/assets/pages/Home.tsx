import React from 'react';
import { Link } from 'react-router-dom';
import githubLogo from '../../public/dist/images/github-logo.png';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[87vh]">
      <div className="flex-grow text-center">
        <h1 className="text-3xl mt-4">Welcome to the Contact Management App & COVID-19 Tracker</h1>
        <div className="mt-4 space-x-4 flex flex-wrap gap-y-4 justify-center items-center">
          <Link to="/contacts" className="p-[10px] pr-[15px] text-white bg-blue-500 rounded">Manage Contacts</Link>
          <Link to="/charts-and-maps" className="p-[10px] pr-[15px] text-white bg-green-500 rounded">View Charts & Maps</Link>
        </div>
      </div>
      <footer className="flex flex-col sm:flex-row justify-center items-center py-4 text-gray-600 bg-gray-200 w-full">
        <div className="flex items-center mb-2 sm:mb-0">
          <p className="mr-2">App Created by</p>
          <a href="https://github.com/uzibytes" target="_blank" rel="noreferrer noopener" className="flex items-center">
            <p className="mr-2 font-bold text-blue-500">Ujjwal Raj</p>
            <img src={githubLogo} alt="GitHub Logo" className="w-4 h-4" />
          </a>
        </div>
        <p className="sm:ml-4">for Frontend Engineer Coding Task by</p>
        <a href="https://taiyo.ai" target="_blank" rel="noopener noreferrer" className="sm:ml-2">
          <img src="https://taiyo.ai/wp-content/uploads/Taiyo-logo.png" alt="Taiyo Logo" className="w-16 h-auto" />
        </a>
      </footer>
      </div>
  );
};

export default Home;
