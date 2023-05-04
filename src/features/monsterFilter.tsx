import React from 'react';
import { Container } from 'react-bootstrap';

import Roster from '../components/roster';
import Details from '../components/details';

import './monsterFilter.scss';

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
