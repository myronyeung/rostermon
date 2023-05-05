import React from 'react';
import { Container } from 'react-bootstrap';

import TagFilter from './TagFilter';
import MonsterRoster from './MonsterRoster';
import MonsterDetails from './MonsterDetails';

import './index.scss';

const MonsterFilter: React.FunctionComponent = () => {
  return (
    <Container id="monsterFilter">
      <TagFilter />
      <div className="roster-details-layout">
        <MonsterRoster />
        <MonsterDetails />
      </div>
    </Container>
  );
};

MonsterFilter.displayName = 'MonsterFilter';

export default MonsterFilter;
