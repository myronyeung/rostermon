import React from 'react';
import { Container } from 'react-bootstrap';

import CharmanderImage from '../../images/charmander.png';

import './index.scss';

const Home: React.FunctionComponent = () => {
  return (
    <Container id="home">
      <div className="intro">
        <h2>Welcome to Rostermon</h2>
        <p className="welcome-message">
          Welcome to the Rostermon Pokemon catalog. Please browse the collection
          or use the filter feature to find the perfect Pokemon to add to your
          deck.{' '}
        </p>

        <p className="welcome-message">
          Pokemon information provided by the{' '}
          <a
            href="https://docs.pokemontcg.io/"
            target="_new"
            rel="noreferrer noopener"
          >
            Pokemon TCG API
          </a>
          .
        </p>
      </div>
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
