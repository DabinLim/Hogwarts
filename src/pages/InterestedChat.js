import React from "react";
import styled from "styled-components";
import ChatRoom from "../components/ChatRoom";
import CreateRoomModal from "../components/CreateRoomModal";
import { getCookie } from "../shared/Cookie";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {useDispatch, useSelector} from 'react-redux';
import {api} from '../redux/modules/chat';


const InterestedChat = (props) => {
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = React.useState(false);
  const user = useSelector(state => state.user.user)
  let user_inter_list;
  if(user){
      user_inter_list = user.userInterested;
  }
  console.log(user_inter_list)
  const room_info = useSelector(state=> state.chat.room_list)
  console.log(room_info[0].userInterested)
  const checkInter = (e) => {
          for(let i=0; i<user_inter_list.length; i++){
              if(e.userInterested === user_inter_list[i]){
                  return true
              }
          }
    }
          

  const interested_room = room_info.filter(checkInter)

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  React.useEffect(() => {
    // dispatch(api.findAllRoom())
    dispatch(api.MockRoom())
  },[])

  return (
    <React.Fragment>
      <AllChatContainer>
        {interested_room? interested_room.map((v)=>{
          return(
            <ChatRoom room_info={v}/>
          )
        }): <div>추천 채팅방이 없습니다.</div>}
      </AllChatContainer>
      <CreateRoom onClick={openModal}>+ Start a room</CreateRoom>
      <CreateRoomModal
        visible={modalVisible}
        onClose={closeModal}
        maskClosable={true}
        closable={true}
      />
    </React.Fragment>
  );
};

const AllChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const CreateRoom = styled.button`
  border: 1px solid #dbdbdb;
  border-radius: 50px;
  width: 150px;
  height: 50px;
  position: fixed;
  background-color: #28ae61;
  color: white;
  font-weight: 900;
  bottom: 5%;
  right: 5%;
  box-shadow: 1px 1px lightgray;
`;

export default InterestedChat;
