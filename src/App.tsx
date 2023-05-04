import React from 'react';
import { Outlet } from 'react-router-dom';

import NavHeader from './components/navHeader';

import './App.scss';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <NavHeader />
      <div id="react-router-outlet">
        <Outlet />
      </div>
    </div>
  );
};

App.displayName = 'App';

export default App;
