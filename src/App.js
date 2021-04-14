import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route } from 'react-router-dom';
import {history} from './redux/configStore';
import './App.css';
import Main from './pages/Main';
import Home from './pages/Home';
import Profile from './pages/Profile'
import AllChat from './pages/AllChat';
import InterestedChat from './pages/InterestedChat';
import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import NoInterested from './components/NoInterested';
import styled from 'styled-components';
import {api} from './redux/modules/user';
import {useDispatch, useSelector} from 'react-redux';


function App() {

  const [modalVisible, setModalVisible] = React.useState(false);


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const userInfo = useSelector(state =>state.user.user)
  const dispatch = useDispatch()
  const is_login = useSelector(state=> state.user.is_login);
  React.useEffect(() => {
    dispatch(api.loginCheck())
  },[])
  if(is_login){
    history.push('/all')
  }
  if(is_login && userInfo.userInterested.length<1 && modalVisible === false){
    openModal()
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
        <Route exact path='/all' component={AllChat}/>
        <Route exact path='/interested' component={InterestedChat}/>
        <Route exact path='/profile' component={Profile}/>
        <Route exact path='/chatpage/:id' component={ChatPage}/>
      </ConnectedRouter>
      </BrowserRouter>
      </MainContainer>
      </Container>
      <NoInterested
        visible={modalVisible}
        onClose={closeModal}
        maskClosable={true}
        closable={true}
      />
    </React.Fragment>
  );
}

const Container = styled.div`

  display:flex;
  flex-direction:row;
  justify-content:center;
  margin:20px 20px;
  min-height:100vh;
  max-height:800px;
  border: 1px solid #dbdbdb;
  border-radius:10px;
  overflow:hidden;
`;

const MainContainer = styled.div`
  width:100%;
  padding:2rem;
  background-color:#f2efe4;
`;

export default App;