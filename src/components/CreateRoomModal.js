import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { getCookie } from "../shared/Cookie";
import { api } from "../redux/modules/chat";
import { Input, Button, Text } from "../elements";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateRoomModal = (props) => {
  const { className, visible, maskClosable, closable, onClose } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  let user_name;
  if (user_info) {
    user_name = user_info.username;
  }

  const [room_name, setRoomName] = React.useState("");
  const [interested, setInterested] = React.useState("");

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  const createRoom = () => {
    if (room_name === "") {
      window.alert("방 이름을 입력하세요.");
    } else {
      let room_data = {
        title: room_name,
        interested:interested,
      };
      dispatch(api.createRoom(room_data));
      setRoomName("");
      setInterested("");
    }
  };

  React.useEffect(() => {}, []);

  return (
    <React.Fragment>
      <ModalOverlay visible={visible}>
        <ModalContainer
          className={className}
          tabIndex="-1"
          visible={visible}
          onClick={maskClosable ? onMaskClick : null}
        >
          <ModalInner tabIndex="0">
            {closable && <CloseButton onClick={close}>x</CloseButton>}
            <Text>채팅방 제목</Text>
            <Input
              type="text"
              placeholder='채팅방 제목을 입력해주세요'
              value={room_name}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <FormControl className={classes.formControl}> 
              <InputLabel htmlFor="age-native-simple">관심사</InputLabel>
              <Select
                native
                onChange={(e) => {
                  setInterested(e.target.value);
                }}
              >
                <option aria-label="None" value="" />
                <option value={"React"}>React</option>
                <option value={"Spring"}>Spring</option>
                <option value={"Node"}>Node.js</option>
                <option value={"ReactNative"}>React Native</option>
              </Select>
            </FormControl>
            <Button margin="20px 0px 0px 0px" cursor='pointer' _onClick={createRoom}>
              <Text color='white' bold NotP>작성</Text>
            </Button>
          </ModalInner>
        </ModalContainer>
      </ModalOverlay>
    </React.Fragment>
  );
};

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalContainer = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 400px;
  height: auto;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
`;

const CloseButton = styled.button`
  font-size: x-large;
  position: fixed;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-style: none;
  border-radius: 10px;
  background-color: white;
`;

export default CreateRoomModal;
