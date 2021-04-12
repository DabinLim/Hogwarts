import React from 'react';
import styled from 'styled-components';
import {Text} from '../elements';

const ChatRoom = (props) => {

    return(
        <React.Fragment>
            <Container>
                <Title>
                (관심사) 관심사에 관심있는 사람 모여라~
                </Title>
                <TextBox>
                    <Text bold>참여인원</Text>
                    <Text bold>dabin</Text>
                    <Text bold>heyman</Text>
                    <Text bold>wassup</Text>
                </TextBox>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    box-sizing:border-box;
    width:100%;
    height:100%;
    max-width:500px;
    min-height:200px;
    margin: 10px 0px;
    padding:0px 5px;
    border:1px solid #dbdbdb;
    background-color:white;
    border-radius:10px;
`;
const Title = styled.h4`
    padding:0.5rem;
    margin:5px 0px;
`;

const TextBox = styled.div`
    padding:0 1rem;
`;

export default ChatRoom;