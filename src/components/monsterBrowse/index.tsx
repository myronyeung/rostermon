import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  monsterState,
  fetchMonsters,
  monsterActions,
} from '../../features/monsterFilter/monsterSlice';

import Logo from '../../../src/images/logo.svg';

import './index.scss';

const MonsterBrowse: React.FunctionComponent = () => {
  const monsters = useAppSelector(monsterState);
  const dispatch = useAppDispatch();

  const [scrollTop, setScrollTop] = useState(0);
  const [modal, setModal] = useState({ showModal: false, image: '' });

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

  return (
    <div id="monsterBrowse">
      <div
        className="browse-list-container overflow-scroll"
        onScroll={handleScroll}
      >
        {monsters.allMonsters && (
          <ul className="monster-list" tabIndex={0}>
            {Object.keys(monsters.allMonsters).map((monster) => {
              const { image, name, hp, supertype, types, subtypes } =
                monsters.allMonsters[monster];

              return (
                <li
                  key={monster}
                  className="monster-info"
                  onClick={() => setModal({ showModal: true, image })}
                  tabIndex={0}
                >
                  <div className="grid-column image">
                    <img src={image} alt={name} className="thumbnail" />
                  </div>
                  <div className="grid-column bio">
                    <div className="id">{monster}</div>
                    <div className="name">
                      <Link
                        to="/browse"
                        onClick={() => setModal({ showModal: true, image })}
                      >
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
                          return <span className="tag type">{type}</span>;
                        })
                      : ''}
                    {subtypes && subtypes.length > 0
                      ? subtypes.map((subtype: string) => {
                          return <span className="tag subtype">{subtype}</span>;
                        })
                      : ''}
                  </div>
                </li>
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
          setModal({ showModal: false, image: '' });
        }}
        className="modal-image"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
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
