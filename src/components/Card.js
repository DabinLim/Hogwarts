import React from 'react';
import styled from 'styled-components';
import {Text, Button} from '../elements'; 

const Card = (props) => {
    return(
        <React.Fragment>
            <Container>
                <Image margin='4px 0px'shape='rectangle' src={props.image}/>
                <Description>
                <Text margin='auto' size='40px' bold color='white'>{props.title}</Text>
                {props.des.map(v => {
                    return(
                        <Text key={v} size='20px' color='white' bold >{v}</Text>
                    )
                })}
                <Button _onClick={props._onClick}margin='auto' width='60%' color='white' main><Text color='white' bold margin='3px 0px'>{props.button}</Text></Button>
                </Description>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    width:80%;
    min-width:800px;
    min-height:400px;
    display:flex;
    flex-direction:row;
    margin: 20px 0px;
    background-color: rgba(0,0,0,0.7);
    border-radius:20px;
    overflow:hidden;
`;


const Description = styled.div`
    display:flex;
    flex-direction:column;
    box-sizing:border-box;
    margin: 0px 40px;
`;

const Image = styled.img`
    width:100%;
    max-width:600px;
    min-width:400px;
`;

export default Card;