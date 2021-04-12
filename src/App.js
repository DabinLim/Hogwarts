import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import {history} from './redux/configStore';
import './App.css';
import Main from './pages/Main';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import {api} from './redux/modules/user';
import {useDispatch, useSelector} from 'react-redux';

function App() {
  const dispatch = useDispatch()
  const is_login = useSelector(state=> state.user.is_login);
  React.useEffect(() => {
    dispatch(api.loginCheck())
  })
  if(is_login){
    history.push('/main')
  }
  return (
    <React.Fragment>
      <Container>
        {is_login && <Sidebar/>}
      <MainContainer>
      <BrowserRouter>
      <ConnectedRouter history={history}>
        <Route exact path='/' component={Home}/> 
        <Route exact path='/main' component={Main}/>
      </ConnectedRouter>
      </BrowserRouter>
      </MainContainer>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  max-width:1400px;
  display:flex;
  flex-direction:row;
  margin:20px auto;
  min-height:100vh;
  border: 1px solid #dbdbdb;
  border-radius:10px;
  overflow:hidden;
`;

const MainContainer = styled.div`
  margin :auto;
`;

export default App;
