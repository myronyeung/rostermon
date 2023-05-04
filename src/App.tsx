import React from 'react';
import NavHeader from './components/navHeader';
import MonsterView from './features/monsterView';

import './App.scss';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <NavHeader />
      <MonsterView />
    </div>
  );
};

App.displayName = 'App';

export default App;
