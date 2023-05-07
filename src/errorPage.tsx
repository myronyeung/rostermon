import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

import NavHeader from './components/navHeader';
import SadPikachus from '../src/images/sad.jpg';

import './App.scss';

const ErrorPage: React.FunctionComponent = () => {
  const error: any = useRouteError();

  return (
    <div id="error-page">
      <NavHeader />
      <div className="error-page-layout">
        <h2>Oops!</h2>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>{error.statusText || error.message}</p>
        <p>
          If you tried visiting the page directly from a bookmark or typing it
          in your browser, please go to the <Link to={`/`}>home page</Link>{' '}
          first.
        </p>
        <img src={SadPikachus} width="300" alt="" />
      </div>
    </div>
  );
};

ErrorPage.displayName = 'ErrorPage';

export default ErrorPage;
