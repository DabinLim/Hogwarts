import React from 'react';
import styled from 'styled-components';
import {Button, Text} from '../elements';
import {nameCheck, idCheck, pwdCheck} from '../shared/common';
import {history} from '../redux/configStore';

const Register = (props) => {
    const [isLoading, setLoading] = React.useState(false)
    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password_check, setPasswordCheck] = React.useState('')

    const createUser = async () => {

        setLoading(true)

        if(!idCheck(id)){
            window.alert('아이디 형식이 맞지 않습니다.')
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
            // 여기에 api
            setLoading(false)
            window.alert('회원가입이 완료되었습니다.')
            history.push('/login')
        }
    }

  return (
      <div className='auth-wrapper'>

          <div style={{textAlign: 'center'}}> 
          <h3>Register</h3>
          </div>
    <form >
      <label>ID</label>
      <input name='email' onChange={(e) => {
          setId(e.target.value)
      }}  />
      {!idCheck(id) && <p>영문자와 숫자를 조합하여 5~16자리 아이디를 설정하세요</p>}
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
    <Text NotP cursor ='pointer' style={{color:'gray', textDecoration:'none'}} _onClick={()=> {history.push('/login')}}>이미 아이디가 있다면</Text>
    </ButtonContainer>
      </div>
  );
}

const ButtonContainer = styled.div`

    width:350px;
    margin:0 auto;
`;

export default Register;