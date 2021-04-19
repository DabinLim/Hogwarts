import React from 'react';
import styled from 'styled-components';
import {Image, Text} from '../elements'; 

const Card = (props) => {
    
    return(
        <React.Fragment>
            <Container>
                <Image shape='rectangle' src={props.image}/>
                <Text color='white'>{props.title}</Text>
                <Text color='white' >{props.button}</Text>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    width:auto;
    height:100%;
    display:flex;
    flex-direction:column;
`;

export default Card;