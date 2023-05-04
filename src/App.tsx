import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NavHeader from './components/navHeader';
import Home from '../src/components/home';
import MonsterBrowse from '../src/components/monsterBrowse';
import MonsterFilter from './features/monsterFilter';

import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/browse',
    element: <MonsterBrowse />,
  },
  {
    path: '/filter',
    element: <MonsterFilter />,
  },
]);

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <NavHeader />
      <RouterProvider router={router} />
    </div>
  );
};

App.displayName = 'App';

export default App;
