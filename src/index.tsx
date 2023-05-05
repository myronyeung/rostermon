import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './app/store';
import App from './App';
import Home from '../src/components/home';
import MonsterBrowse from '../src/components/monsterBrowse';
import MonsterFilter from './features/monsterFilter';
import ErrorPage from '../src/errorPage';

import reportWebVitals from './reportWebVitals';
import './index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/rostermon',
        element: <Home />,
      },
      {
        path: '/rostermon/browse',
        element: <MonsterBrowse />,
      },
      {
        path: '/rostermon/filter',
        element: <MonsterFilter />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
