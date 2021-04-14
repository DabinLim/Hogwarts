// import React from 'react';
// import styled from 'styled-components';
// import {useSelector} from 'react-redux';
// import { Text } from '../elements';

// const CreateRoomModal2 = (props) => {
//   const { className, visible, maskClosable, closable, onClose} = props;
//   const user_info = useSelector(state=>state.user.user)
//   let user_name
//   if(user_info){
//     user_name= user_info.username
//   }
//   const [socketConnected, setSocketConnected] = React.useState(false);
//   const [room_name, setRoomName] = React.useState([]);
//   const [interested, setInterested] = React.useState('')


//   const webSocketUrl = `ws://localhost:3001`;
//   let ws = React.useRef(null);


//     const onMaskClick = (e) => {
//         if (e.target === e.currentTarget) {
//             onClose(e)
//         }
//     }
    
//     const close = (e) => {
//         if(onClose) {
//             onClose(e)
//         }
//     }


//     const createRoom = () => {
//       if (socketConnected) {
//           ws.current.send(
//             JSON.stringify({
//               interested: interested,
//               room_name:room_name,
//               name:user_name
//             })
//           );
//           close()
//         }
//   }
  
//     React.useEffect(() => {
//         if (!ws.current) {
//           ws.current = new WebSocket(webSocketUrl);
//           ws.current.onopen = () => {
//             console.log("connected to " + webSocketUrl);
//             setSocketConnected(true);
//           };
//           ws.current.onclose = (error) => {
//             console.log("disconnect from " + webSocketUrl);
//             console.log(error);
//           };
//           ws.current.onerror = (error) => {
//             console.log("connection error " + webSocketUrl);
//             console.log(error);
//           };
//         }
    
//         return () => {
//           console.log("clean up");
//           ws.current.close();
//         };
//       }, []);
  
//     return(
//         <React.Fragment>
//             <ModalOverlay visible={visible}>
//         <ModalContainer className={className} tabIndex="-1" visible={visible} onClick={maskClosable ? onMaskClick: null}>
//           <ModalInner tabIndex="0">
//               {closable && <CloseButton onClick={close}>x</CloseButton>}
//               <Text>방 이름</Text>
//               <input type='text' value={room_name} onChange ={(e) => setRoomName(e.target.value)}/>
//               <Text>관심사</Text>
//               <input type='text' value={interested} onChange ={(e) => setInterested(e.target.value)}/>
//               <button onClick={createRoom}>작성</button>
//               </ModalInner>
//         </ModalContainer>
//       </ModalOverlay>
//         </React.Fragment>
//     )
// }


// const ModalOverlay = styled.div`
//   box-sizing: border-box;
//   display: ${(props) => (props.visible ? "block" : "none")};
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.6);
//   z-index: 999;
// `;

// const ModalContainer = styled.div`
//   box-sizing: border-box;
//   display: ${(props) => (props.visible ? "block" : "none")};
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 1000;
//   overflow: auto;
//   outline: 0;
// `;

// const ModalInner = styled.div`
//   box-sizing: border-box;
//   position: relative;
//   box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
//   background-color: #fff;
//   border-radius: 10px;
//   width: 400px;
//   height:auto;
//   max-width: 480px;
//   top: 50%;
//   transform: translateY(-50%);
//   margin: 0 auto;
//   padding: 20px 20px;
// `;

// const CloseButton = styled.button`
// font-size: x-large;
// position:fixed;
// top:0;
// right:0;
// width:30px;
// height:30px;
// border-style: none;
// border-radius:10px;
// background-color: white;
// `;

// export default CreateRoomModal2;