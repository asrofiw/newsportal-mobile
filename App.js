import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import Main from './src/screens/Main';
import store from './src/redux/store';

export class App extends Component {
  render() {
    return (
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
