import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Home from './src/container/Home';
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
