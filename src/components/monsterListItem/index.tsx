import React from 'react';
import { Link } from 'react-router-dom';

import { MonsterInfo } from '../../features/monsterFilter/monsterSlice';

import './index.scss';

export interface MonsterListItemProps {
  monsterInfo: MonsterInfo;
  handleSelectEvent: (event: React.UIEvent<HTMLElement>) => void;
  link: '/filter' | '/browse'; // Hard code for the moment.
}

const MonsterListItem: React.FunctionComponent<MonsterListItemProps> = (
  props: MonsterListItemProps
) => {
  const { monsterInfo, handleSelectEvent, link } = props;
  const { id, image, name, hp, supertype, types, subtypes } = monsterInfo;

  return (
    <li
      id={id}
      key={id}
      className="monster-list-item"
      onClick={handleSelectEvent}
      tabIndex={0}
    >
      <div className="grid-column image">
        <img src={image} alt={name} className="thumbnail" />
      </div>
      <div className="grid-column bio">
        <div className="id">{id}</div>
        <div className="name">
          <Link to={link} onClick={handleSelectEvent}>
            {name}
          </Link>
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
};

MonsterListItem.displayName = 'MonsterListItem';

export default MonsterListItem;
