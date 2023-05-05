import React from 'react';
import { Container } from 'react-bootstrap';

import CharmanderImage from '../../images/charmander.png';

const Home: React.FunctionComponent = () => {
  return (
    <Container id="home">
      <h2>Welcome to Rostermon</h2>
      <img
        src={CharmanderImage}
        width="300"
        alt="Charmander"
        className="hero-image"
      />
    </Container>
  );
};

Home.displayName = 'Home';

export default Home;
