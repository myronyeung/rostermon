import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { monsterState, monsterActions, fetchMonsters } from './monsterSlice';
import MonsterListItem from '../../components/monsterListItem';

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
              const { supertype, types, subtypes } =
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
                  <MonsterListItem
                    monsterInfo={monsters.allMonsters[monster]}
                    handleSelectEvent={handleSelectEvent}
                    link={'/filter'}
                  />
                );
              }
            })}
          </ul>
        )}
        {!monsters.loading && monsters.error && (
          <div>Error: {monsters.error}</div>
        )}
      </div>
      <div className="monster-roster-footer">
        <Button
          variant="primary"
          onClick={() => dispatch(monsterActions.incrementPage())}
        >
          Load more cards
        </Button>
      </div>
    </div>
  );
};

MonsterRoster.displayName = 'MonsterRoster';

export default MonsterRoster;
