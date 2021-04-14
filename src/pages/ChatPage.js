import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input, Text} from '../elements';
import {setChat} from '../redux/modules/user';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {getCookie} from '../shared/Cookie';

const ChatPage = (props) => {
    const dispatch = useDispatch()

    const user_info = useSelector(state=>state.user.user);
    let user_name;
    let user_profile;
    if(user_info){
        user_name = user_info.username;
        user_profile = user_info.userProfile;
    }

    const token = getCookie('is_login');
    let url = document.location.href.split('/');
    let room_id = url[url.length - 1];

    const [content, setContent] = React.useState('')
    const [chatLogs, setChatLogs] = React.useState([]);

    

    const send = () => {
        let logs = chatLogs
        logs.unshift(content)
        setChatLogs([...logs])
    }

    const sendMsg = () => {
        let sock = new SockJS('');
        let ws = Stomp.over(sock);

        const msgData = {
            roomId:room_id,
            userName:user_name,
            userProfile:user_profile
        }
        ws.connect({
            token:token,
        }, () => {
            ws.send('pub/api/chat/', {}, JSON.stringify(msgData))
        })
        setContent('')
    }

    React.useEffect(()=> {
        let sock = new SockJS('');
        let ws = Stomp.over(sock);
        const chat_logs=[];
        ws.connect({
            token:token
        }, () => {
            ws.subscribe(`/sub/api/chat/${room_id}`, (data) => {
                const newMsg = JSON.parse(data.body);
                chat_logs.unshift(newMsg);
            })
        })
        setChatLogs([...chat_logs]);
    },[])



    return(
        <React.Fragment>
            <Container>
                <Content>
                <ContentBox>
                {chatLogs.map((v) => {
                    return(
                        <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <ChatBox>
                            <Text width='auto' NotP>{v}</Text>
                        </ChatBox>
                        </div>
                    )
                })}
                </ContentBox>
                </Content>
            <TextWrite>
            <Input width='60%' type='text' value={content} _onChange={(e) => {setContent(e.target.value)}}/>
            <Button width='60px'_onClick={send}>전송</Button>
            </TextWrite>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    height:100%;
`;

const ContentBox = styled.div`
    overflow:auto;
`;

const Content = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    width:100%;
    height:100%;
    overflow:auto;
`;


const TextWrite = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:30px;
`;

const ChatBox = styled.div`
    width:auto;
    max-width:250px;
    height:auto;
    padding:10px;
    margin: 0px 0px 10px 0px ;
    border: 2px solid pink;
    border-radius:10px;
`;


export default ChatPage;