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
      <BrowserRouter basename="">
        <NavHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rostermon" element={<Home />} />
          <Route path="/rostermon/browse" element={<MonsterBrowse />} />
          <Route path="/rostermon/filter" element={<MonsterFilter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

App.displayName = 'App';

export default App;
