import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  monsterState,
  fetchMonsters,
  monsterActions,
} from '../../features/monsterFilter/monsterSlice';
import MonsterListItem from '../../components/monsterListItem';

import Logo from '../../../src/images/logo.svg';

import './index.scss';

const MonsterBrowse: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);
  const dispatch = useAppDispatch();

  const [scrollTop, setScrollTop] = useState(0);
  const [modal, setModal] = useState({ showModal: false, name: '', image: '' });

  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(fetchMonsters({ page: monsters.page, pageSize: 100 }));
    }, 2000);

    return () => clearTimeout(debounce);
  }, [monsters.page]);

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
      dispatch(monsterActions.incrementPage());
    }
  };

  const handleSelectEvent = (name: string, image: string) => {
    return () => setModal({ showModal: true, name, image });
  };

  return (
    <div id="monsterBrowse">
      <div
        className="browse-list-container overflow-scroll"
        onScroll={handleScroll}
      >
        {monsters.allMonsters && (
          <ul className="monster-list" tabIndex={0}>
            {Object.keys(monsters.allMonsters).map((monster) => {
              const { id, name, image } = monsters.allMonsters[monster];

              return (
                <MonsterListItem
                  monsterInfo={monsters.allMonsters[monster]}
                  handleSelectEvent={handleSelectEvent(name, image)}
                  link={'/browse'}
                  key={`${id}-monster-list-item`}
                />
              );
            })}
          </ul>
        )}
        {!monsters.loading && monsters.error && (
          <div>Error: {monsters.error}</div>
        )}
      </div>
      {monsters.loading && (
        <div className="spinner-container">
          <img
            src={Logo}
            width="30"
            height="30"
            className="spinner"
            alt="Loading monsters..."
          />
        </div>
      )}
      <Modal
        show={modal.showModal}
        onHide={() => {
          setModal({ showModal: false, name: '', image: '' });
        }}
        className="modal-image"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modal.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modal.image} className="image" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

MonsterBrowse.displayName = 'MonsterBrowse';

export default MonsterBrowse;
