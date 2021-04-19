import logo from './logo.svg';
import './App.css';
import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {history} from './redux/configStore';
import Login from './pages/Login';
import Register from './pages/Register';
import { getCookie } from './shared/Cookie';
import { api as userActions } from './redux/modules/user'; 

function App() {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const token = getCookie('access-token');
  
  React.useEffect(()=> {
    if(!is_login && token) {
      dispatch(userActions.loginCheck(history));
    }

    if(!token) {
      window.alert('로그인 상태가 아닙니다.')
      history.push('/login')
    }
  },[]);

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
