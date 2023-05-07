import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Logo from '../../../src/images/logo.svg';

import './index.scss';

const NavHeader: React.FunctionComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to={'/'}>
            <img
              src={Logo}
              width="30"
              height="30"
              alt="Pokemon ball logo"
              className="logo"
            />{' '}
          </Link>
          <h1>
            <Link to={'/'}>Rostermon</Link>
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={'/'} className="nav-link">
              Home
            </Link>
            <Link to={'/browse'} className="nav-link">
              Browse
            </Link>
            <Link to={'/filter'} className="nav-link">
              Filter
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavHeader.displayName = 'NavHeader';

export default NavHeader;
