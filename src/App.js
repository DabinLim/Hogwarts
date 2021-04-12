import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import {history} from './redux/configStore';
import './App.css';
import Main from './pages/Main';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      <ConnectedRouter history={history}>
        <Route exact path='/' component={Main}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </ConnectedRouter>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
