import React from 'react';
import ChatPage from './ChatPage';
import {useDispatch, useSelector} from 'react-redux';

const ChatPage2 = (props) => {
    const [socketConnected, setSocketConnected] = React.useState(false);
    const [sendMsg, setSendMsg] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [chats, setChat] = React. useState([]);
    const user_name = useSelector(state => state.user.user.username)
    const send = () => {
        if (socketConnected) {
            ws.current.send(
              JSON.stringify({
                message: comment,
                name:user_name,
              })
            );
            setComment('')
            setSendMsg(true);
          }
    }

    const webSocketUrl = `ws://websocket.com`;
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
        if (sendMsg) {
          ws.current.onmessage = (evt) => {
            const chat = JSON.parse(evt.data);
            console.log(chat);
            setChat((prevItems) => [...prevItems, chat]);
          };
        }
      }, [sendMsg]);
    
      return (
        <React.Fragment>
            {chats && chats.map((v) => {
                if (v.name === user_name){
                return(
                    <div style={{display:'flex', justifyContent:'flex-end'}}>{`${v.name} : ${v.content}`}</div>
                )}else{
                    return(
                        <div>{`${v.name} : ${v.content}`}</div>
                    )
                }
            })}
            <input type='text' value={comment} onChange={(e) => {setComment(e.target.value)}}/>
            <button onClick={send}>전송</button>
        </React.Fragment>
      );
    };
    
    export default ChatPage2;