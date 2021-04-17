import React from 'react';
import styled from 'styled-components';
import {Button, Text} from '../elements';
import {pwdCheck, emailCheck} from '../shared/common';
import {useDispatch, useSelector} from 'react-redux';
import {history} from '../redux/configStore';
import {api, setSignUp} from '../redux/modules/user';


const Login = (props) => {
    const dispatch = useDispatch()
    // 리덕스 상태 가져오기 실험
    const [isLoading, setLoading] = React.useState(false)
    const [id, setId] = React.useState('')
    const [password, setPassword] = React.useState('')

    const signIn = async() => {
        setLoading(true)
        if(!emailCheck(id)){
            window.alert('이메일 형식이 맞지 않습니다.')
            setLoading(false)
            return
        }
        else if(!pwdCheck(password)){
            window.alert('비밀번호 형식이 잘못되었습니다.')
            setLoading(false)
            return
        }
        else{
            //여기에 api . then
            await dispatch(api.logInSV(id,password,history))
            setLoading(false)
            //.catch ...
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
      <label>Password</label>
      <input type="password" name='password' onChange={(e) => {
          setPassword(e.target.value)
      }}/>
      {!pwdCheck(password) && <p>영문자,숫자,특수문자를 조합하여 8~16자리의 비밀번호를 입력하세요.</p>}
    </form>
    <ButtonContainer>
      <Button cursor ='pointer' margin='20px 0px'  _disabled={isLoading} _onClick={signIn}>Log In</Button>
      <Text NotP cursor ='pointer' style={{color:'gray', textDecoration:'none'}} _onClick={()=> {dispatch(setSignUp())}}>아직 아이디가 없다면</Text>
    </ButtonContainer>
      </div>
    )
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

export default Login;