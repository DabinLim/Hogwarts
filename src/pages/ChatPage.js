import React from 'react';
import styled from 'styled-components';
import socketio from 'socket.io-client';
import fuck from 'socket.io';
import {useDispatch, useSelector} from 'react-redux';
import {setChat} from '../redux/modules/user';


const socket = socketio('http://localhost:3001')

const ChatPage = (props) => {
    const dispatch = useDispatch()
    const chat_list = useSelector(state => state.user)
    const [log, setLog] = React.useState([])
    const [logMonitor, setLogMonitor] = React.useState([])
    const [content, setContent] = React.useState('')
    
    console.log(content)
    const send = () => {
        socket.emit('chat-msg', {
            content:content
        })
        setContent('')
        
    }
    let logs = log;
    React.useEffect(()=> {
        socket.on('chat-msg', (obj) => {
            console.log(obj)
            logs.unshift(obj.content)
            setLog(logs);
            // dispatch(setChat(logs))
            console.log(log)
            setLogMonitor(logs)
            
        })
        return () => socket.off();
    },[])

   


    return(
        <React.Fragment>
            {logMonitor && logMonitor.map((v) => {
                console.log(log)
                console.log(log.length)
                console.log(v)
                return(
                    <div>{v}</div>
                )
            })}
            <input type='text' value={content} onChange={(e) => {setContent(e.target.value)}}/>
            <button onClick={send}>전송</button>
        </React.Fragment>
    )
}

export default ChatPage;