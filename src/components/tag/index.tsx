import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  monsterState,
  monsterActions,
} from './../../features/monsterFilter/monsterSlice';

import './index.scss';

type Category = 'supertype' | 'type' | 'subtype';
type Name = string;
interface TagProps {
  category: Category;
  name: Name;
}

const Tag: React.FunctionComponent<TagProps> = (props: TagProps) => {
  const { category, name } = props;

  const monsters = useAppSelector(monsterState);
  const dispatch = useAppDispatch();

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    dispatch(monsterActions.selectTag({ tag: name, isSelected: !isActive }));
  };

  return (
    <span
      className={`tag button ${category} ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      <Link to={'/filter'} onClick={handleClick}>
        {name}
      </Link>
    </span>
  );
};

Tag.displayName = 'Tag';

export default Tag;
