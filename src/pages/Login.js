import React from 'react';
import styled from 'styled-components';
import {Input, Button, Text, Image} from '../elements';
import {history} from '../redux/configStore';
import {pwdCheck, emailCheck} from '../shared/common';
import {api as userActions} from '../redux/modules/user';
import {useDispatch, useSelector} from 'react-redux';


const Login = (props) => {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.user.loading)
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const SignIn = () => {

        if(!emailCheck(email)){
            window.alert('이메일 형식이 올바르지 않습니다.')
            return
        }
        if(!pwdCheck(password)){
            window.alert('비밀번호 형식이 올바르지 않습니다.')
            return
        }
        dispatch(userActions.loginSV(email,password,history))
        
    }


    return(
        <React.Fragment>
            <Background>
                <Container>
                    <Logo/>
                    <InputContainer>
                    <InputBox>
                    <Input _onChange={(e)=>{setEmail(e.target.value)}} placeholder='이메일을 입력하세요' label='Login'/>
                    {!emailCheck(email) && <Warn>이메일 형식에 맞지 않습니다.</Warn>}
                    </InputBox>
                    <InputBox>
                    <Input type='password' _onChange={(e)=>{setPassword(e.target.value)}} placeholder='비밀번호를 입력하세요' label='Password'/>
                    {!pwdCheck(password) && <Warn>영문자,숫자,특수문자를 조합하여 8~16자리의 비밀번호를 입력하세요.</Warn>}
                    </InputBox>
                    <Button margin='30px 0px 0px 0px' padding='6px 0px' _disabled={loading} _onClick={SignIn}>
                        <LoginButton>
                        <Text width='auto' bold NotP color='white'>Alohomora</Text>
                        <Image size='24' src='https://user-images.githubusercontent.com/77574867/115653242-c9f37000-a369-11eb-8a70-333f0576b527.png'/>
                        </LoginButton>
                        </Button>
                    </InputContainer>
                    <Text bold color='white' cursor='pointer' _onClick={()=> {history.push('/register')}}>아직 아이디가 없다면</Text>
                </Container>
            </Background>
            
        </React.Fragment>
    )
}

const Background = styled.div`
    width:100%;
    height:100%;
    background-image:url('https://user-images.githubusercontent.com/77574867/115653262-cfe95100-a369-11eb-9eb2-6d0d40b5dc78.png');
    background-size:cover;
`;

const Container = styled.section`
    display: flex;
    flex-direction:column;
    justify-content:space-between;
    width: 350px;
    height:auto;
    margin: 0px auto;
    padding: 60px 0px 0px 0px;
    box-sizing:border-box;
`;

const Logo = styled.div`
    
    width:350px;
    height:200px;
    background-image:url('https://user-images.githubusercontent.com/77574867/115653260-cf50ba80-a369-11eb-8196-0a5704a59331.png');
    background-size: contain;
    background-repeat:no-repeat;
`;

const InputBox = styled.div`
    width:auto;
    height:auto;
    margin: 0px 0px 10px 0px;
`;

const LoginButton = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`;

const InputContainer = styled.div`
    display: flex;
    width:100%;
    height:auto;
    margin-top:100px;
    flex-direction: column;
    justify-content:space-evenly;
`;


const Warn = styled.p`
    color: #bf1650;
    font-size: 12px;
    background: rgba(256, 256, 256, 0.5);
    &:before{
        display: inline;
        content: "⚠ ";
    }
`;


export default Login;