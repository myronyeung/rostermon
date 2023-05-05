import React, { useEffect } from 'react';
import {Button} from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { monsterState, monsterActions, fetchMonsters } from './monsterSlice';

import Logo from '../../../src/images/logo.svg';

export type ActiveTags = string[];

export type TagsToTest = string[];

const shouldDisplayMonster = (
  activeTags: ActiveTags,
  supertype: string,
  type?: string[],
  subtype?: string[]
): boolean => {
  // Show all monsters if no filters selected.
  if (activeTags.length === 0) return true;

  let shouldDisplay = true;
  const tags: TagsToTest = [supertype];

  if (typeof type !== 'undefined') tags.push(...type);
  if (typeof subtype !== 'undefined') tags.push(...subtype);

  // Compare both arrays.
  activeTags.forEach((activeTag) => {
    if (!tags.includes(activeTag)) shouldDisplay = false;
  });

  return shouldDisplay;
};

const MonsterRoster: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMonsters({ page: monsters.page, pageSize: 100 }));
  }, [monsters.page]);

  const handleSelectEvent = (event: React.UIEvent<HTMLElement>) => {
    dispatch(monsterActions.select(event.currentTarget.id));
  };

  return (
    <div id="monsterRoster">
      {!monsters.loading && monsters.error && (
        <div>Error: {monsters.error}</div>
      )}

      <div className="browse-list-container">
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
          <ul className="monster-list" tabIndex={0}>
            {Object.keys(monsters.allMonsters).map((monster) => {
              const { image, name, hp, supertype, types, subtypes } =
                monsters.allMonsters[monster];
              if (
                shouldDisplayMonster(
                  monsters.activeTags,
                  supertype,
                  types,
                  subtypes
                )
              ) {
                return (
                  <li
                    id={monster}
                    key={monster}
                    className="monster-info"
                    onClick={handleSelectEvent}
                    tabIndex={0}
                  >
                    <div className="grid-column">
                      <img src={image} alt={name} className="thumbnail" />
                    </div>
                    <div className="grid-column bio">
                      <div className="id">{monster}</div>
                      <div className="name">
                        <a href="#" onClick={handleSelectEvent}>
                          {name}
                        </a>
                      </div>
                      <div>
                        <div className="supertype">{supertype}</div>
                        {hp && (
                          <div className="hp-label">
                            HP <span className="hp">{hp}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="grid-column tags">
                      {types && types.length > 0
                        ? types.map((type: string) => {
                            return (
                              <span className="tag type" key={type}>
                                {type}
                              </span>
                            );
                          })
                        : ''}
                      {subtypes && subtypes.length > 0
                        ? subtypes.map((subtype: string) => {
                            return (
                              <span className="tag subtype" key={subtype}>
                                {subtype}
                              </span>
                            );
                          })
                        : ''}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        )}
        {!monsters.loading && monsters.error && (
          <div>Error: {monsters.error}</div>
        )}
      </div>
      <Button variant="primary" onClick={() => dispatch(monsterActions.incrementPage())}>Load more monsters</Button>
    </div>
  );
};

MonsterRoster.displayName = 'MonsterRoster';

export default MonsterRoster;
