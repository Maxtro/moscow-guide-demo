import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import store from './redux/redaxStore'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

test('renders learn react link', () => {
  const { getByText } = render(
  <BrowserRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </BrowserRouter>
  );
  const linkElement = getByText('Искать');
  expect(linkElement).toBeInTheDocument();
});
