import React from 'react';

import { useAppSelector } from '../../app/hooks';

import { monsterState } from '../../features/monsterSlice';

const Details: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);

  return (
    <div className="details">
      <h2>Pokemon Details</h2>

<button className="btn btn-primary" type="submit">Bootstrap Button!</button>

      {!monsters.loading && monsters.allMonsters && monsters.selectedId ? (
        <>
          <h3>
            Selected Monster: {monsters.allMonsters[monsters.selectedId].name}
          </h3>
          <img
            className="monster-large-image"
            src={monsters.allMonsters[monsters.selectedId].image}
            alt={`Card image of ${
              monsters.allMonsters[monsters.selectedId].name
            }`}
          />
        </>
      ) : (
        ''
      )}
    </div>
  );
};

Details.displayName = 'Details';

export default Details;
