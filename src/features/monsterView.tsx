import React from 'react';

import Roster from '../components/roster';
import Details from '../components/details';

const MonsterView: React.FunctionComponent = () => {
  return (
    <div className="content">
      <Roster />
      <Details />
    </div>
  );
};

MonsterView.displayName = 'MonsterView';

export default MonsterView;
