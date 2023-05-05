import React from 'react';
import { Container } from 'react-bootstrap';

import MonsterRoster from './MonsterRoster';
import MonsterDetails from './MonsterDetails';

import './index.scss';

const MonsterFilter: React.FunctionComponent = () => {
  return (
    <Container id="monsterFilter">
      <div className="layout">
        <MonsterRoster />
        <MonsterDetails />
      </div>
    </Container>
  );
};

MonsterFilter.displayName = 'MonsterFilter';

export default MonsterFilter;
