import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

test('renders the title, controls and algorithm details', () => {
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByText('Sorting Visualizer')).toBeInTheDocument();
  expect(getByRole('button', { name: 'Sort' })).toBeInTheDocument();
  expect(getByText('Time Complexity')).toBeInTheDocument();
});
