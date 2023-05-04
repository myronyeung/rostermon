import React from 'react';
import { Container } from 'react-bootstrap';

import CharmanderImage from '../../images/charmander.png';

const Home: React.FunctionComponent = () => {
  return (
    <Container>
      Welcome to Rostermon
      <img src={CharmanderImage} width="300" alt="Charmander hero image" />
    </Container>
  );
};

Home.displayName = 'Home';

export default Home;
