import React from 'react';
import styled from 'styled-components';
import {Input, Button, Text} from '../elements';

const Login = (props) => {

    return(
        <React.Fragment>
            <Background>
                <Container>
                    <Logo/>
                    <InputContainer>
                    <Input placeholder='이메일을 입력하세요' label='Login'/>
                    <Input placeholder='닉네임을 입력하세요' label='Nickname'/>
                    <Input placeholder='비밀번호를 입력하세요' label='Password'/>
                    <Input placeholder='비밀번호를 다시 한번 입력하세요' label='Password Check'/>
                    <Button><Text bold NotP color='white'>Log In</Text></Button>
                    </InputContainer>
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
    height:100%;
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
    height:60%;
    flex-direction: column;
    justify-content:space-evenly;
`;



export default Login;