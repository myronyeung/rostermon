import React from 'react';

import TagFilter from './TagFilter';
import MonsterRoster from './MonsterRoster';
import MonsterDetails from './MonsterDetails';

import './index.scss';

const MonsterFilter: React.FunctionComponent = () => {
  return (
    <div id="monsterFilter">
      <TagFilter />
      <div className="roster-details-layout">
        <MonsterRoster />
        <MonsterDetails />
      </div>
    </div>
  );
};

MonsterFilter.displayName = 'MonsterFilter';

export default MonsterFilter;
