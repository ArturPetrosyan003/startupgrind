import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))


