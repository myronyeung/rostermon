import React from 'react';
import { Container } from 'react-bootstrap';

import { useAppSelector } from '../../app/hooks';

import { monsterState } from './monsterSlice';

const MonsterDetails: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);

  return (
    <Container id="monsterDetails">
      {!monsters.loading && monsters.allMonsters && monsters.selectedId ? (
        <img
          className="monster-large-image"
          src={monsters.allMonsters[monsters.selectedId].image}
          alt={`Card depicting ${
            monsters.allMonsters[monsters.selectedId].name
          }`}
        />
      ) : (
        ''
      )}
    </Container>
  );
};

MonsterDetails.displayName = 'MonsterDetails';

export default MonsterDetails;
