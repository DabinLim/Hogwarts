import React from 'react';
import styled from 'styled-components';
import {Input, Button, Text} from '../elements';
import {history} from '../redux/configStore';
import {pwdCheck, emailCheck, nameCheck} from '../shared/common';
import {api as userActions} from '../redux/modules/user';
import {useDispatch, useSelector} from 'react-redux';

const Register = (props) => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.user.loading)

    const [email, setEmail] = React.useState('');
    const [nickname, setNickname] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPwd, setConfirmPwd] = React.useState('');

    const SignUp = () => {
        if(!emailCheck(email)){
            window.alert('이메일 형식이 올바르지 않습니다.')
            return
        }
        if(!nameCheck(nickname)){
            window.alert('닉네임 형식이 올바르지 않습니다.')
            return
        }
        if(!pwdCheck(password)){
            window.alert('비밀번호 형식이 올바르지 않습니다.')
            return
        }
        if(password !== confirmPwd){
            window.alert('비밀번호 확인이 되지 않았습니다.')
            return
        }
        dispatch(userActions.registerSV(email,nickname,password,history));
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
                    <Input _onChange={(e)=>{setNickname(e.target.value)}} placeholder='닉네임을 입력하세요' label='Nickname'/>
                    {!nameCheck(nickname) && <Warn>1~10글자의 영문자 또는 한글이름을 설정하세요.</Warn>}
                    </InputBox>
                    <InputBox>
                    <Input type='password' _onChange={(e)=>{setPassword(e.target.value)}} placeholder='비밀번호를 입력하세요' label='Password'/>
                    {!pwdCheck(password) && <Warn>영문자,숫자,특수문자를 조합하여 8~16자리의 비밀번호를 입력하세요.</Warn>}
                    </InputBox>
                    <InputBox>
                    <Input type='password' _onChange={(e)=>{setConfirmPwd(e.target.value)}} placeholder='비밀번호를 다시 한번 입력하세요' label='Password Confirm'/>
                    {password !== confirmPwd && <Warn>비밀번호가 일치하지 않습니다.</Warn>}
                    </InputBox>
                    <Button _disabled={loading} margin='30px 0px 0px 0px'_onClick={SignUp}><Text bold NotP color='white'>Sign Up</Text></Button>
                    </InputContainer>
                    <Text bold color='white' cursor='pointer' _onClick={()=> {history.push('/login')}}>이미 아이디가 있다면</Text>
                </Container>
            </Background>
            
        </React.Fragment>
    )
}

const Background = styled.div`
    width:100%;
    height:100%;
    background-image:url('https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/hogwarts.png?alt=media&token=fe8300f9-00e4-4004-b6d8-3df4a6964877');
    background-size:cover;
`;

const Container = styled.section`
    display: flex;
    flex-direction:column;
    justify-content:space-evenly;
    width: 350px;
    height: auto;
    margin: 0px auto;
    padding: 60px 0px;
    box-sizing:border-box;
`;

const Logo = styled.div`
    
    width:350px;
    height:200px;
    background-image:url('https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/hogwarts-logo-symbol-meaning-history-evolution-3.png?alt=media&token=af273b7c-af92-491f-910b-bf9dc65bfefd');
    background-size: contain;
    background-repeat:no-repeat;
`;

const InputContainer = styled.div`
    display: flex;
    width:100%;
    height:auto;
    flex-direction: column;
    justify-content:space-evenly;
`;

const InputBox = styled.div`
    width:auto;
    height:auto;
    margin: 0px 0px 10px 0px;
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



export default Register;