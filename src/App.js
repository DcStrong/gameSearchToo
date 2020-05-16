import React from 'react';
import store from './store/index';
import { Provider } from 'react-redux';
import Main from './components/Main';

const App = () => (
  <Provider store={store}>
    <Main/>
  </Provider>
)

export default App;