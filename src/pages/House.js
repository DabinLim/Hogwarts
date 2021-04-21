import React from 'react';
import styled from 'styled-components';
import {response} from '../redux/modules/UserInformation'
import '../House.css';
import ProfileCard from '../components/ProfileCard';

const House = (props) => {
    let url = document.location.href.split('/')
    let house_name = url[url.length - 1]
    
    return(
        <React.Fragment>
            <div className={house_name}>
            <Container>
                {response.user_list.map((v,idx) => {
                    return(
                        <ProfileCard user_list={v} key={idx}/>
                    )
                })}
            </Container>
            </div>
        </React.Fragment>
    )
}

const Container = styled.div`
    box-sizing:border-box;
    padding:50px;
    width:100%;
    height:100%;
    overflow-y:auto;
    display:flex;
    flex-direction:row;
    justify-content:center;
    flex-wrap:wrap;
    background-color: rgba(0,0,0,0.6)
`;

export default House;