import './App.css';
import React from 'react';
import styled from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {history} from './redux/configStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { getCookie } from './shared/Cookie';
import { api as userActions } from './redux/modules/user'; 
import Header from './components/Header';
import House from './pages/House';

function App() {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const token = getCookie('access-token');
  const user = useSelector(state => state.user.user);
    let user_house;
    if(user){
        user_house = user.user_house;
    }
  
  React.useEffect(()=> {
    if(!is_login && token) {
      dispatch(userActions.loginCheck(history));
    }

    if((!token && history.location.pathname !== '/login') && (!token && history.location.pathname !== '/register')) {
      window.alert('로그인 상태가 아닙니다.')
      history.push('/login')
    }
  },[]);

  return (
    <React.Fragment>
        {token && <Header user_house={user_house}/>}
      <Container token={token}>
      <BrowserRouter>
      <ConnectedRouter history={history}>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route excat path='/house/:house_name' user_house={user_house} component={House}/>
      </ConnectedRouter>
      </BrowserRouter>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  ${(props) => props.token && `padding-top:80px;`}
  width:100vw;
  height:100vh;
`;

export default App;
