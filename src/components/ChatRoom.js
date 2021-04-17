
import React from 'react';
import styled from 'styled-components';
import {Text, Image} from '../elements';
import {history} from '../redux/configStore';


const ChatRoom = (props) => {
        console.log(props)

    return(
        <React.Fragment>
            <Container>
                <Title onClick={()=>{history.push('/chatpage/'+props.room_info.roomId)}}>
                ({props.room_info.userInterested}){props.room_info.roomName}
                </Title>
                <TextBox>
                    <Text margin='0px' bold>참여인원</Text>
                    {/* <CrewBox>
                    <Image margin='0px' size='24'/>
                    <Text >{props.room_info.members[0]}</Text>
                    </CrewBox>
                    <CrewBox>
                    <Image margin='0px' size='24'/>
                    <Text >{props.room_info.members[1]}</Text>
                    </CrewBox> */}
                    <Text>{props.room_info.userCount}명 참여중</Text>
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
    max-height:200px;
    margin: 10px 0px;
    padding:0px 5px;
    border:1px solid #dbdbdb;
    background-color:white;
    border-radius:10px;
    box-shadow:2px 2px lightgray;
`;
const Title = styled.h4`
    padding:0.5rem;
    margin:5px 0px;
`;

const TextBox = styled.div`
    padding:0 1rem;
`;

const CrewBox = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`;

export default ChatRoom;