import React from 'react';
import styled from 'styled-components';
import socketio from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {setChat} from '../redux/modules/user';


const socket = socketio('http://localhost:3001')


const ChatPage = (props) => {
    const dispatch = useDispatch()
    const user_name = useSelector(state => state.user.user.email)
    // const chat_list = useSelector(state => state.user.chat_content)
    const [log, setLog] = React.useState([])
    const [logMonitor, setLogMonitor] = React.useState([])
    const [content, setContent] = React.useState('')
    const [connected_name, setName] = React.useState('')
    
    console.log(content)
    const send = () => {
        socket.emit('chat-msg', {
            content:content,
            name:user_name
        })
        setContent('')
        
    }
    let logs = [];
    React.useEffect(()=> {
        socket.on('chat-msg', (obj) => {
            logs.push(obj)
            setLog([...logs]);
            console.log(log)
            // dispatch(setChat(logs))
            
        })
        return () => socket.off();
    },[])



    return(
        <React.Fragment>
            {log && log.map((v) => {
                if (v.name === user_name){
                return(
                    <div style={{display:'flex', justifyContent:'flex-end'}}>{`${v.name} : ${v.content}`}</div>
                )}else{
                    return(
                        <div>{`${v.name} : ${v.content}`}</div>
                    )
                }
            })}
            <input type='text' value={content} onChange={(e) => {setContent(e.target.value)}}/>
            <button onClick={send}>전송</button>
        </React.Fragment>
    )
}

export default ChatPage;