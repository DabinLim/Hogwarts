import React from 'react';
import styled from 'styled-components';
import ChatRoom from '../components/ChatRoom';

const AllChat = (props) => {

    return (
        <React.Fragment>
            <AllChatContainer>
            <ChatRoom/>
            <ChatRoom/>
            <ChatRoom/>
            <ChatRoom/>
            <ChatRoom/>
            <ChatRoom/>
            </AllChatContainer>
            <CreateRoom>방 만들기</CreateRoom>
        </React.Fragment>
    )
}

const AllChatContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    height:100%;
    width:100%;
    overflow:auto;
    
`;

const CreateRoom = styled.button`
    border: 1px solid #dbdbdb;
    border-radius: 50px;
    width:100px;
    height:50px;
    position:fixed;
    background-color:green;
    bottom:5%;
    right:5%;
`;

export default AllChat;