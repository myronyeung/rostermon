import React from 'react';
import { Container } from 'react-bootstrap';

import { useAppSelector } from '../../app/hooks';

import { monsterState } from '../../features/monsterSlice';

const Details: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);

  return (
    <Container className="details">
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

Details.displayName = 'Details';

export default Details;
