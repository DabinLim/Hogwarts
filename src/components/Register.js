import React from 'react';
import styled from 'styled-components';
import {Button, Text} from '../elements';
import {nameCheck, emailCheck, pwdCheck} from '../shared/common';
import {history} from '../redux/configStore';
import { setCookie } from '../shared/Cookie';
import {setSignUp, api} from '../redux/modules/user';
import {useSelector, useDispatch} from 'react-redux';

const Register = (props) => {
    const dispatch = useDispatch()
    const [isLoading, setLoading] = React.useState(false)
    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password_check, setPasswordCheck] = React.useState('')

    const createUser = async () => {

        setLoading(true)

        if(!emailCheck(id)){
            window.alert('이메일 형식이 맞지 않습니다.')
            setLoading(false)
            return
        }
        if(!pwdCheck(password)){
            window.alert('비밀번호 형식이 잘못되었습니다.')
            setLoading(false)
            return
        }
        else if(password !==password_check){
            window.alert('비밀번호 확인이 맞지 않습니다.')
            setLoading(false)
            return
        }
        else if(!nameCheck(name)){
            window.alert('닉네임 형식이 잘못되었습니다.')
            setLoading(false)
            return
        }
        else{
            await dispatch(api.registerSV(id,name,password))
            setLoading(false)
        }
    }

  return (
      <div className='auth-wrapper'>

          <div style={{display:'flex', justifyContent:'center'}}> 
          <ImageContainer/>
          </div>
    <form >
      <label>ID</label>
      <input name='email' onChange={(e) => {
          setId(e.target.value)
      }}  />
      {!emailCheck(id) && <p>이메일 형식에 맞지 않습니다.</p>}
      <label>Name</label>
      <input name='name' onChange={(e) => {
          setName(e.target.value)
      }} />
      {!nameCheck(name) && <p>1~10자리 한글 또는 영문 이름을 설정하세요.</p>}
      
      <label>Password</label>
      <input type="password" name='password' onChange={(e) => {
          setPassword(e.target.value)
      }}/>
      {!pwdCheck(password) && <p>영문자,숫자,특수문자를 조합하여 8~16자리의 비밀번호를 설정하세요.</p>}
      <label>Password Check</label>
      <input type="password" name='password_check' onChange={(e) => {
          setPasswordCheck(e.target.value)
      }}/>
      {password !==password_check && <p>비밀번호가 일치하지 않습니다.</p>}

    </form>
    <ButtonContainer>
      <Button cursor ='pointer' _disabled={isLoading} margin='20px 0px' _onClick={createUser}>Resigter</Button>
    <Text NotP cursor ='pointer' style={{color:'gray', textDecoration:'none'}} _onClick={()=> {dispatch(setSignUp())}}>이미 아이디가 있다면</Text>
    </ButtonContainer>
      </div>
  );
}

const ButtonContainer = styled.div`

    width:350px;
    margin:0 auto;
`;

const ImageContainer = styled.div`
    background-image:url('https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/%E1%84%85%E1%85%A9%E1%84%80%E1%85%A9.png?alt=media&token=30f8455f-351a-479b-9f42-a65f3b8c2492');
    width:350px;
    height:200px;
    background-size:cover;
`;

export default Register;