import React from 'react';

import { useAppSelector } from '../../app/hooks';

import { monsterState } from './monsterSlice';

const MonsterDetails: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);

  return (
    <div id="monsterDetails">
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
    </div>
  );
};

MonsterDetails.displayName = 'MonsterDetails';

export default MonsterDetails;
