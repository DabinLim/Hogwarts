import React from 'react';
import styled from 'styled-components';
import {Text} from '../elements';
import {useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {api} from '../redux/modules/user';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const NoInterested = (props) => {
    const dispatch = useDispatch()
    const { className, visible, maskClosable, closable, onClose} = props;
    const classes = useStyles();

    const [interested, setInterested] = React.useState(null)
    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e)
        }
    }
    
    const close = (e) => {
        if(onClose) {
            onClose(e)
        }
    }

    const addInter = () => {
        if(interested){
            dispatch(api.addInterSV(interested))
            close()
        }else{
            window.alert('관심사를 설정해주세요')
        }
    }

    return(
        <React.Fragment>
            <React.Fragment>
      <ModalOverlay visible={visible}>
        <ModalContainer className={className} tabIndex="-1" visible={visible} onClick={maskClosable ? onMaskClick: null}>
          <ModalInner tabIndex="0">
              <Text bold>관심사를 1개 이상 설정해주셔야 서비스 이용이 가능합니다.</Text>
              <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">관심사</InputLabel>
        <Select
          native
          onChange={(e)=> {setInterested(e.target.value)}}
        >
          <option aria-label="None" value="" />
          <option value={'React'}>React</option>
          <option value={'Spring'}>Spring</option>
          <option value={'Node'}>Node.js</option>
          <option value={'ReactNative'}>React Native</option>
        </Select>
      </FormControl>
      <Text cursor='pointer' color='#0095f6' _onClick={addInter}> 관심사 추가 </Text>
      {/* <AddIcon onClick={addInter}/> */}
              </ModalInner>
        </ModalContainer>
      </ModalOverlay>
    </React.Fragment>
        </React.Fragment>
    )
}


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
  height:auto;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
`;

const CloseButton = styled.button`
font-size: x-large;
position:fixed;
top:0;
right:0;
width:30px;
height:30px;
border-style: none;
border-radius:10px;
background-color: white;
`;


export default NoInterested;