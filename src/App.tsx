import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavHeader from './components/navHeader';
import Home from '../src/components/home';
import MonsterBrowse from '../src/components/monsterBrowse';
import MonsterFilter from './features/monsterFilter';

import './App.scss';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <NavHeader />
    <BrowserRouter>
      <Routes>
        { /* TODO: Determine base URL programmatically. */ }
        <Route path="/" element={<Home />} />
        <Route path="/rostermon/" element={<Home />} />
        <Route path="/browse" element={<MonsterBrowse />} />
        <Route path="/rostermon/browse" element={<MonsterBrowse />} />
        <Route path="/filter" element={<MonsterFilter />} />
        <Route path="/rostermon/filter" element={<MonsterFilter />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
};

App.displayName = 'App';

export default App;
