import React from "react";
import styled from "styled-components";
import ChatRoom from "../components/ChatRoom";
import CreateRoomModal from "../components/CreateRoomModal";

const AllChat3 = (props) => {


    const [socketConnected, setSocketConnected] = React.useState(false);
    const [rooms, setRooms] = React.useState([]);


    const webSocketUrl = `ws://localhost:3001`;
    let ws = React.useRef(null);

    React.useEffect(() => {
        if (!ws.current) {
          ws.current = new WebSocket(webSocketUrl);
          ws.current.onopen = () => {
            console.log("connected to " + webSocketUrl);
            setSocketConnected(true);
          };
          ws.current.onclose = (error) => {
            console.log("disconnect from " + webSocketUrl);
            console.log(error);
          };
          ws.current.onerror = (error) => {
            console.log("connection error " + webSocketUrl);
            console.log(error);
          };
        }
    
        return () => {
          console.log("clean up");
          ws.current.close();
        };
      }, []);
    
      // send 후에 onmessage로 데이터 가져오기
      React.useEffect(() => {
        if (socketConnected) {
          ws.current.onmessage = (obj) => {
            const rooms = JSON.parse(obj.data);
            console.log(rooms);
            setRooms((prevItems) => [...prevItems, rooms]);
          };
        }
      }, []);


  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <React.Fragment>
      <AllChatContainer>
          {rooms && <div>rooms</div>}
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
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
  cursor:pointer;
`;

export default AllChat3;
