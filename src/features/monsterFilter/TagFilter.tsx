import React from 'react';
import { Accordion } from 'react-bootstrap';

import { useAppSelector } from '../../app/hooks';
import { monsterState } from './monsterSlice';
import Tag from '../../../src/components/tag';

const TagFilter: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);

  return (
    <Accordion defaultActiveKey="0" id="tagFilter">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Filter</Accordion.Header>
        <Accordion.Body>
          {monsters.allTypes.map((type) => {
            return <Tag category="type" name={type} key={type} />;
          })}
          {monsters.allSubtypes.map((subtype) => {
            return <Tag category="subtype" name={subtype} key={subtype} />;
          })}
          {monsters.allSupertypes.map((supertype) => {
            return (
              <Tag category="supertype" name={supertype} key={supertype} />
            );
          })}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

TagFilter.displayName = 'TagFilter';

export default TagFilter;
