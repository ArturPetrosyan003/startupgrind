import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './components/redux/rootReducer';

const store = createStore(rootReducer, applyMiddleware(logger));

const App = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes {...props} />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


