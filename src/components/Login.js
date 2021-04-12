import React from 'react';
import styled from 'styled-components';
import {Button, Text} from '../elements';
import {pwdCheck, idCheck} from '../shared/common';
import {useDispatch} from 'react-redux';
import {history} from '../redux/configStore';
import {setUser} from '../redux/modules/user';


const Login = (props) => {
    const dispatch = useDispatch()
    const [isLoading, setLoading] = React.useState(false)
    const [id, setId] = React.useState('')
    const [password, setPassword] = React.useState('')

    const signIn = async() => {
        setLoading(true)
        if(!idCheck(id)){
            window.alert('아이디 형식이 맞지 않습니다.')
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
            dispatch(setUser({id, password}))
            setLoading(false)
            window.alert('로그인이 완료되었습니다.')
            //.catch ...
        }
    }

    
    return (
        <div className='auth-wrapper'>
          <div style={{textAlign: 'center'}}> 
          <h3>Log In</h3>
          </div>
    <form >
    <label>ID</label>
      <input name='email' onChange={(e) => {
          setId(e.target.value)
      }}  />
      {!idCheck(id) && <p>영문자와 숫자를 조합하여 5~16자리 아이디를 입력하세요</p>}
      <label>Password</label>
      <input type="password" name='password' onChange={(e) => {
          setPassword(e.target.value)
      }}/>
      {!pwdCheck(password) && <p>영문자,숫자,특수문자를 조합하여 8~16자리의 비밀번호를 입력하세요.</p>}
    </form>
    <ButtonContainer>
      <Button cursor ='pointer' margin='20px 0px'  _disabled={isLoading} _onClick={signIn}>Log In</Button>
      <Text NotP cursor ='pointer' style={{color:'gray', textDecoration:'none'}} _onClick={()=> {history.push('/register')}}>아직 아이디가 없다면</Text>
    </ButtonContainer>
      </div>
    )
}

const ButtonContainer = styled.div`

    width:350px;
    margin:0 auto;
`;

export default Login;