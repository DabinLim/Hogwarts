import React from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Image, Input, Text} from '../elements';
import {setChat} from '../redux/modules/user';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {getCookie} from '../shared/Cookie';
import axios from 'axios'

axios.defaults.baseURL = 'http://13.125.21.123';

const ChatPage = (props) => {
    const dispatch = useDispatch()
    let sock = new SockJS('http://13.125.21.123/ws-stomp');

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
        let ws = Stomp.over(sock);

        const msgData = {
            type:'TALK',
            roomId:room_id,
            message:content,
            userName:user_name,
            userProfile:user_profile
        }
        ws.connect({
            token:token,
        }, () => {
            ws.send('pub/api/chat/message', {}, JSON.stringify(msgData))
            console.log(msgData)
        })
        setContent('')
    }

    React.useEffect(() => {
        const token = getCookie('is_login')
        const option = {
            url:'/api/chat/user',
            method:'GET',
            header:{
                token:token,
            },
        }
        axios(option).then((response) => {
            console.log(response);
        }).catch(error => console.log(error))
    },[])

    React.useEffect(() => {
        let ws = Stomp.over(sock);

        const msgData = {
            type:'ENTER',
            roomId:room_id,
            message:content,
            userName:user_name,
            userProfile:user_profile,
        }
        ws.connect({
            token:token,
        }, () => {
            ws.send('pub/api/chat/message', {}, JSON.stringify(msgData))
        })
    },[])

    React.useEffect(()=> {
        let ws = Stomp.over(sock);
        const chat_logs=chatLogs;
        ws.connect({
            token:token
        }, () => {
            ws.subscribe(`/sub/api/chat/message`, (data) => {
                const newMsg = JSON.parse(data.body);
                console.log(newMsg)
                chat_logs.unshift(newMsg);
            })
        })
        setChatLogs([...chat_logs]);

        return () => {
            const token = getCookie('is_login');
            ws.disconnect(() => {
              ws.unsubscribe('sub-0');
            }, { token: token })
          }
    },[])



    return(
        <React.Fragment>
            <Container>
                <Content>
                <ContentBox>
                {chatLogs.map((v) => {
                    if(v.type === 'TALK'){
                        return(
                            <div style={{display:'flex', justifyContent:'flex-end'}}>
                            <ChatBox>
                                <Image src={v.userProfile} size='24'/>
                                <Text width='auto' NotP>{v.userName} : {v.message}</Text>
                            </ChatBox>
                            </div>
                        )
                    }else{
                        return(
                            <div style={{display:'flex', justifyContent:'center'}}>{v.message}</div>
                        )
                    }
                })}
                </ContentBox>
                </Content>
            <TextWrite>
            <Input width='60%' type='text' value={content} _onChange={(e) => {setContent(e.target.value)}}/>
            <Button width='60px'_onClick={sendMsg}>전송</Button>
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
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    width:auto;
    max-width:250px;
    height:auto;
    padding:10px;
    margin: 0px 0px 10px 0px ;
    border: 2px solid pink;
    border-radius:10px;
`;


export default ChatPage;