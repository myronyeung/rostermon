import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  monsterState,
  fetchMonsters,
} from '../../features/monsterFilter/monsterSlice';

import Logo from '../../../src/images/logo.svg';

import './index.scss';

const MonsterBrowse: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(fetchMonsters({ page, pageSize: 100 }));
    }, 2000);

    return () => clearTimeout(debounce);
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
                <li key={monster} className="monster-info">
                  <img src={image} alt={name} className="thumbnail" />
                  <span className="id">{monster}</span>
                  <span className="name">{name}</span>
                  <span className="hp">{hp}</span>
                  <span className="supertype">{supertype}</span>
                  <span className="types">{types ? types.join(' ') : ''}</span>
                  <span className="subtypes">
                    {subtypes ? subtypes.join(' ') : ''}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        {!monsters.loading && monsters.error && (
          <div>Error: {monsters.error}</div>
        )}
      </Container>
    </Container>
  );
};

MonsterBrowse.displayName = 'MonsterBrowse';

export default MonsterBrowse;
