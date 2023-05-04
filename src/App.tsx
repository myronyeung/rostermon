import React from 'react';
import NavHeader from './components/navHeader';
import MonsterFilter from './features/monsterFilter';

import './App.scss';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <NavHeader />
      <MonsterFilter />
    </div>
  );
};

App.displayName = 'App';

export default App;
