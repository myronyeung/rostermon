import React from 'react';
import Nav from './components/nav';
import MonsterView from './features/monsterView';

import './App.scss';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <Nav />
      <MonsterView />
    </div>
  );
};

App.displayName = 'App';

export default App;
