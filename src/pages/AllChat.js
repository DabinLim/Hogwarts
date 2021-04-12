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
            <CreateRoom>+ Start a room</CreateRoom>
        </React.Fragment>
    )
}


const AllChatContainer = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    align-items:center;
    height:100%;
    width:100%;
    overflow:auto;
    
`;

const CreateRoom = styled.button`
    border: 1px solid #dbdbdb;
    border-radius: 50px;
    width:150px;
    height:50px;
    position:fixed;
    background-color:#28ae61;
    color:white;
    font-weight: 900;
    bottom:5%;
    right:5%;
    box-shadow:1px 1px lightgray;
`;

export default AllChat;