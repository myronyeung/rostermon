import React from 'react';
import { Container } from 'react-bootstrap';

import Roster from './MonsterRoster';
import Details from './monsterDetails';

import './index.scss';

const MonsterFilter: React.FunctionComponent = () => {
  return (
    <Container id="monsterFilter">
      <div className="layout">
        <Roster />
        <Details />
      </div>
    </Container>
  );
};

MonsterFilter.displayName = 'MonsterFilter';

export default MonsterFilter;
