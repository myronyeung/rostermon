import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  MonsterInfo,
  Id,
  monsterState,
  monsterActions,
  fetchMonsters,
} from '../../features/monsterSlice';

import Logo from '../../../src/images/logo.svg';

import './index.scss';

const MonsterBrowse: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    dispatch(fetchMonsters({ page, pageSize: 100 }));
  }, [page]);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    // Reference: https://stackoverflow.com/a/42860948
    setScrollTop(
      event.currentTarget.scrollHeight -
        event.currentTarget.scrollTop -
        event.currentTarget.clientHeight
    );
    if (
      event.currentTarget.scrollHeight -
        event.currentTarget.scrollTop -
        event.currentTarget.clientHeight <
      1
    ) {
      setPage(page + 1);
    }
  };

  return (
    <Container id="monsterBrowse">
      <h2>
        Number of monsters loaded:{' '}
        {monsters &&
          monsters.allMonsters &&
          Object.keys(monsters.allMonsters).length}
      </h2>
      <h2>{scrollTop}</h2>
      <Container
        className="browse-list-container overflow-scroll"
        onScroll={handleScroll}
      >
        {monsters.loading && (
          <div>
            <img
              src={Logo}
              width="30"
              height="30"
              className="spinner"
              alt="Loading monsters..."
            />
          </div>
        )}
        {monsters.allMonsters && (
          <ul className="monster-list">
            {Object.keys(monsters.allMonsters).map((monster) => {
              const { image, name, hp, supertype, types, subtypes } =
                monsters.allMonsters[monster];
              return (
                <li key={monster}>
                  <span>
                    <img src={image} alt={name} className="thumbnail" />
                  </span>
                  <span>{monster}</span>
                  <span>{name}</span>
                  <span>{hp}</span>
                  <span>{supertype}</span>
                  <span>{types ? types : 'NO TYPE!'}</span>
                  <span>{subtypes ? subtypes : 'NO TYPE!'}</span>
                </li>
              );
            })}
          </ul>
        )}
        {!monsters.loading && monsters.error && (
          <div>Error: {monsters.error}</div>
        )}
      </Container>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setPage(page + 1)}
      >
        See more monsters
      </button>
    </Container>
  );
};

MonsterBrowse.displayName = 'MonsterBrowse';

export default MonsterBrowse;
