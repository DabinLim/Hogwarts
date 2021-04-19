import logo from './logo.svg';
import './App.css';
import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import {history} from './redux/configStore';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <React.Fragment>
      <Container>
      <BrowserRouter>
      <ConnectedRouter history={history}>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </ConnectedRouter>
      </BrowserRouter>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  width:100vw;
  height:100vh;
`;

export default App;
