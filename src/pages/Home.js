import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';

const Home = (props) => {

    return(
        <React.Fragment>
            <Container>
                <MainContainer>
                    <Card image={'https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/house.png?alt=media&token=a570d28a-f0c6-4124-9ed6-dc1d52c99ddd'} title={'기숙사를 배정 받으세요.'} button={'마법모자에게 기숙사 배정 받으러 가기'} des={['혹시 신입생 분이시라면 마법모자의 10가지 질문에 대답하시고 어울리는 기숙사에 배정 받으세요.','기숙사를 배정 받은 후에는 기숙사에 소속된 유저들의 프로필과 채팅을 즐길 수 있습니다.']}/>
                    <Card image={'https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/olivander.png?alt=media&token=ab06c8f8-364c-4df1-a64e-6365a8a61c6b'} title={'지팡이를 구입하세요.'} button={'나에게 맞는 지팡이 찾기'} des={['아직 지팡이가 없으셔도 걱정하지 마세요.','현존 최고의 지팡이 장인 올리밴더에게 지팡이를 구입할 수 있어요 (무료)']}/>
                    <Card image={'https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/patronus.png?alt=media&token=1b018129-11c0-4653-8d91-ed039c7b2b73'} title={'패트로누스를 소환하세요.'} button={'패트로누스 소환하러 가기'} des={['아직 패트로누스를 소환하신 적이 없다면 자신만의 패트로누스를 소환해보세요','패트로누스는 심층세계가 반영된 모습의 동물입니다. 행복한 기억을 떠올리세요.']}/>
                    <Card image={'https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/house.png?alt=media&token=a570d28a-f0c6-4124-9ed6-dc1d52c99ddd'} title={'기숙사를 배정 받으세요.'} button={'마법모자에게 기숙사 배정 받으러 가기'} des={['혹시 신입생 분이시라면 마법모자의 10가지 질문에 대답하시고 어울리는 기숙사에 배정 받으세요.','기숙사를 배정 받은 후에는 기숙사에 소속된 유저들의 프로필과 채팅을 즐길 수 있습니다.']}/>
                    <Forpadding/>
                </MainContainer>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    width:100%;
    height:100%;
    background-image:url('https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/interior3.png?alt=media&token=a7143aec-4016-4125-8f2b-77378995e75a');
    background-size: cover;
    overflow-y:auto;
`;

const MainContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:100%;
    margin:auto;
    box-sizing: border-box;
    padding:20px;


`;

const Forpadding = styled.div`
    width:100%;
    min-height:20px;
`;


export default Home;