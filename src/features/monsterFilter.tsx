import React from 'react';

import Roster from '../components/roster';
import Details from '../components/details';

const MonsterFilter: React.FunctionComponent = () => {
  return (
    <div className="content">
      <Roster />
      <Details />
    </div>
  );
};

MonsterFilter.displayName = 'MonsterFilter';

export default MonsterFilter;
