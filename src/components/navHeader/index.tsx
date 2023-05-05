import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Logo from '../../../src/images/logo.svg';

const NavHeader: React.FunctionComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href={`${process.env.PUBLIC_URL}/`}>
          <img src={Logo} width="30" height="30" alt="Pokemon ball logo" />{' '}
          Rostermon
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={`${process.env.PUBLIC_URL}/`} className="nav-link">
              Home
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/browse`} className="nav-link">
              Browse
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/filter`} className="nav-link">
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
