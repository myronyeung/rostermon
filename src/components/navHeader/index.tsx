import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Logo from '../../../src/images/logo.svg';

const NavHeader: React.FunctionComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={Logo} width="30" height="30" alt="Pokemon ball logo" />{' '}
          Rostermon
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/browse">Browse</Nav.Link>
            <Nav.Link href="/filter">Filter</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavHeader.displayName = 'NavHeader';

export default NavHeader;
