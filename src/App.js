// App.js or your main layout component
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Game from './Game';
import CoachesList from './CoachesList';
import nflData from './nflData.json';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-800 text-white flex flex-col h-screen font-mono text-xl">
        <nav className="bg-blue-500 text-white-800 p-4">
          <ul className="flex space-x-4 justify-center">
            <li>
              <Link to="/" className="hover:text-gray-300 hover:font-bold">Game</Link>
            </li>
            <li>
              <Link to="/coaches" className="hover:text-gray-300 hover:font-bold">Coaches List</Link>
            </li>
          </ul>
        </nav>
        <div className="flex-grow flex items-center justify-center">
          <Routes>
            <Route exact path="/" element={<Game />} />
            <Route path="/coaches" element={<CoachesList nflData={nflData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
