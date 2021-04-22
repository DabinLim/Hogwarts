import React from 'react';
import styled from 'styled-components';
import socketio from 'socket.io-client';
import { Button, Image } from '../elements';
import { useSelector } from 'react-redux';

const socket = socketio('http://localhost:8080')


const HouseChat = (props) => {
    const user = useSelector(state => state.user);
    let nickname;
    let profile_img;
    if(user.user){
        nickname = user.user.nickname;
        profile_img = user.user.profile_img;
    };

    const [logs, setLogs] = React.useState([]);
    const [userCount, setUserCount] = React.useState([]);
    const msg = React.useRef('');

    const sendMsg = () => {
        console.log('hi')
        socket.emit('chat-msg', {
            type:'TALK',
            content:msg.current.value,
            nickname:nickname,
            profile_img:profile_img
        })
        msg.current.value = ''
    };


    let log = [];
    console.log(logs)
    React.useEffect(() => {
        socket.emit('connected', {
            num:1,
        })
        socket.emit('chat-msg', {
            type:'ENTER',
            content:'님이 입장하셨습니다.',
            nickname:nickname,
        })
        socket.on('chat-msg', (msg) => {
            log.push(msg);
            setLogs([...log]);
        })
        socket.on('connected', (msg) => {
            console.log(msg)
            setUserCount(msg)
        })        
        return () => {
            socket.emit('disconnected', {
                num:-1,
            })
            socket.emit('chat-msg', {
                type:'QUIT',
                content:'님이 퇴장하셨습니다.',
                nickname:nickname,
            })
            socket.off()
        };
    },[]);

    return (
        <React.Fragment>
            <Container>
            <ChatList>
                <UserCount>접속중인 유저 : {userCount.length} 명</UserCount>
                {logs.length && logs.map(v => {
                    if(v.type === 'ENTER' || v.type === 'QUIT'){
                    return(
                        <Notification>
                            <span style={{width:'auto'}}>{v.nickname}{v.content}</span>
                        </Notification>
                    )
                    } 
                    if(v.type=== 'TALK' && v.nickname === nickname){
                        return(
                            <MyChatBox>
                                <MyMsg>
                                <Image size='36' src={v.profile_img}/>{v.nickname}:{v.content}
                                </MyMsg>
                                </MyChatBox>
                        )
                    }
                    if(v.type === 'TALK' && v.nickname !== nickname){
                        return(
                            <OtherChatBox>
                                <OtherMsg>
                                <Image size='36' src={v.profile_img}/>{v.nickname}:{v.content}
                                </OtherMsg>
                                </OtherChatBox>
                        )
                    }
                })}
            </ChatList>
            <SendBox>
            <ChatInput type='text' placeholder='내용을 입력하세요.' ref={msg} onKeyPress={(e)=>{
            if(e.key === 'Enter'){
              sendMsg()
            }
          }}/>
            <Button _onClick={sendMsg} width='80px'>전송</Button>
            </SendBox>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.section`
    width:100%;
    max-width:800px;
    min-width:300px;
    height:100%;
    max-height:600px;
    min-height:400px;
    margin: 0px auto;
    box-shadow: lightgray 5px 5px ;
    border-radius:0.5rem;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`;

const ChatList = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100%;
    background-color:white;
    border-bottom: 1px solid #dbdbdb;
`;

const UserCount = styled.div`
    margin: 10px auto;
    border-bottom: 1px dotted #dbdbdb;
    font-weight: 600;
`;

const Notification = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin:10px;
`;

const MyChatBox = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-end;
    height:40px;
    margin:10px;
`;

const MyMsg = styled.span`
    box-sizing:border-box;
    margin: 10px;
    padding: 4px 8px;
    display:flex;
    flex-direction:row;
    align-items:center;
    width:auto;
    background-color:lavender;
    border-radius: .5em .5em 0 .5em;
    box-shadow: lightgray 2px 2px ;
    
`;

const OtherChatBox = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
    height:40px;
    margin:10px;
`;

const OtherMsg = styled.span`
    box-sizing:border-box;
    margin: 10px;
    padding: 4px 8px;
    display:flex;
    flex-direction:row;
    align-items:center;
    width:auto;
    background-color:pink;
    border-radius: .5em .5em .5em 0;
    box-shadow: lightgray 2px 2px ;
    
`;

const SendBox = styled.div`
    width:100%;
    height:60px;
    display:flex;
    flex-direction:row;
`;

const ChatInput = styled.input`
    width:100%;
    max-width:800px;
    height:60px;
    border-style:none;
    padding:0px 20px;
`;

export default HouseChat;