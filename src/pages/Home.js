import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Home = (props) => {

    return(
        <React.Fragment>
            <Container>
                <MainContainer>
                    <Recommend>
                        <Card image={'https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/house.png?alt=media&token=a570d28a-f0c6-4124-9ed6-dc1d52c99ddd'} title={'나에게 어울리는 기숙사는?'} button={'나에게 어울리는 기숙사 확인하러 가기'}/>
                    </Recommend>
                </MainContainer>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    width:100%;
    height:100vh;
    background-color:#10141c;
`;

const MainContainer = styled.div`
    width:100%;
    height:100%;
    max-width:1000px;
    margin:auto;
    box-sizing: border-box;
    padding:20px;
    border: 1px solid white;
    background-color:#10141c;
`;

const Recommend = styled.section`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    width:100%;
    height:400px;
    border: 1px solid white;
`;

export default Home;