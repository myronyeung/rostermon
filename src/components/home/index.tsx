import React from 'react';
import { Container } from 'react-bootstrap';

import CharmanderImage from '../../images/charmander.png';

const Home: React.FunctionComponent = () => {
  return (
    <Container id="home">
      Welcome to Rostermon
      <img src={CharmanderImage} width="300" alt="Charmander" />
    </Container>
  );
};

Home.displayName = 'Home';

export default Home;
