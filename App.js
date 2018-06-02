import React from 'react';
import { Provider } from 'react-redux';
import { store, perstor } from './src/store';
import { Home}  from './src/presentation/Home';
import { PersistGate } from 'redux-persist/integration/react';
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={perstor}>
          <Home />
        </PersistGate>
      </Provider>
    );
  }
}
