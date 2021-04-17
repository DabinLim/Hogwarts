import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Input, Text } from "../elements";
import { setChat } from "../redux/modules/user";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { getCookie } from "../shared/Cookie";
import axios from "axios";
import TextWrite from "../components/TextWrite";



let msg_check;
axios.defaults.baseURL = "http://13.125.21.123";
const ChatPage = (props) => {
  let sock = new SockJS("http://13.125.21.123/ws-stomp");
  let ws = Stomp.over(sock);
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  let user_name;
  let user_profile;
  if (user_info) {
    user_name = user_info.userName;
    user_profile = user_info.userProfile;
  }

  const token = getCookie("is_login");
  let url = document.location.href.split("/");
  let room_id = url[url.length - 1];

  const [content, setContent] = React.useState("");
  const [chatLogs, setChatLogs] = React.useState([]);
  const msg = React.useRef();
  const send = () => {
    let logs = chatLogs;
    logs.unshift(content);
    setChatLogs([...logs]);
  };

  const sendMsg = () => {

    console.log(msg)
        ws.send(`/pub/api/chat/message`, {token: token}, JSON.stringify({
          type: "TALK",
          roomId: room_id,
          message: msg.current.value,
          userName: user_name,
          userProfile: user_profile,
        }));

  
  };

  // React.useEffect(() => {
  //   const token = getCookie("is_login");
  //   const option_a = {
  //     url: `/api/chat/room/enter/${room_id}`,
  //     method: "GET",
  //     header: {
  //       token: token,
  //     },
  //   }
  //   axios(option_a).then((response) => {
  //     console.log(response)
  //   }).catch((error)=> {
  //     console.log(error)
  //   })
  //   const option = {
  //     url: "/api/chat/user",
  //     method: "GET",
  //     header: {
  //       token: token,
  //     },
  //   };
  //   axios(option)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  // React.useEffect(() => {
  //   ws.connect(
  //     {
  //       token: token,
  //     },
  //     () => {
  //       console.log('보냄')
  //       ws.send(`/pub/api/chat/message`, {token: token}, JSON.stringify({
  //         type: "ENTER",
  //         roomId: room_id,
  //         message: content,
  //         userName: user_name,
  //         userProfile: user_profile,
  //       }));
  //     }
  //   );
  //   // return () => {
  //   //   const token = getCookie("is_login");
  //   //   ws.disconnect(
  //   //     () => {
  //   //       ws.unsubscribe("sub-0");
  //   //     },
  //   //     { token: token }
  //   //   );
  //   // };
  // })

  React.useEffect(() => {

    const chat_logs = chatLogs;
    ws.connect(
      {
        token: token,
      },
      () => {
        ws.send(`/pub/api/chat/message`, {token: token}, JSON.stringify({
          type: "ENTER",
          roomId: room_id,
          message: content,
          userName: user_name,
          userProfile: user_profile,
        }));
        ws.subscribe(`/sub/chat/room/${room_id}`, (data) => {
          console.log('ㅎㅇㅎㅇ')
          console.log(data)
          const newMsg = JSON.parse(data.body);
          console.log(newMsg);
          if(msg_check !== newMsg){
            chat_logs.unshift(newMsg);
            setChatLogs([...chat_logs]);
            console.log(chatLogs)
          }
        });
      }
      );


    return () => {

      ws.send(`/pub/api/chat/message`, {token: token}, JSON.stringify({
        type: "QUIT",
        roomId: room_id,
        message: content,
        userName: user_name,
        userProfile: user_profile,
      }));
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
        },
        { token: token }
      );
    };
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Content>
          <ContentBox>
            {chatLogs.map((v) => {
              if (v.type === "TALK" && v.userName === user_name) {
                return (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <ChatBox>
                      <Image src={v.userProfile} size="24" />
                      <Text width="auto" NotP>
                        {v.userName} : {v.message}
                      </Text>
                    </ChatBox>
                  </div>
                );
              } else if (v.type === "TALK" && v.userName !== user_name) {
                return (
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <ChatBox>
                      <Image src={v.userProfile} size="24" />
                      <Text width="auto" NotP>
                        {v.userName} : {v.message}
                      </Text>
                    </ChatBox>
                  </div>
                );
              } else {
                return (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {v.message}
                  </div>
                );
              }
            })}
          </ContentBox>
        </Content>
        <TextBox>
          <MsgInput type='text' ref={msg} placeholder='텍스트를 입력해라'/>
          <Button _onClick={sendMsg} width="60px">
            전송
          </Button>
        </TextBox>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`;

const ContentBox = styled.div`
  overflow: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const MsgInput = styled.input`
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: auto;
  max-width: 250px;
  height: auto;
  padding: 10px;
  margin: 0px 0px 10px 0px;
  border: 2px solid pink;
  border-radius: 10px;
`;

export default ChatPage;
