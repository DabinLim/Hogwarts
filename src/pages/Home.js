import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import SortingHat from '../components/SortingHat';

const Home = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const openModal = () => {
        setModalVisible(true);
      };
    
      const closeModal = () => {
        setModalVisible(false);
      };
    return(
        <React.Fragment>
            <Container>
                <MainContainer>
                    <Card image={'https://user-images.githubusercontent.com/77574867/115653266-d081e780-a369-11eb-9603-01d7fd5ea559.png'} title={'기숙사를 배정 받으세요.'} _onClick ={()=>{openModal()}} button={'마법모자에게 기숙사 배정 받으러 가기'} des={['혹시 신입생 분이시라면 마법모자의 10가지 질문에 대답하시고 어울리는 기숙사에 배정 받으세요.','기숙사를 배정 받은 후에는 기숙사에 소속된 유저들의 프로필과 채팅을 즐길 수 있습니다.']}/>
                    <Card image={'https://user-images.githubusercontent.com/77574867/115653280-d37cd800-a369-11eb-92e8-2a48d77ae6b2.png'} title={'지팡이를 구입하세요.'} button={'나에게 맞는 지팡이 찾기'} des={['아직 지팡이가 없으셔도 걱정하지 마세요.','현존 최고의 지팡이 장인 올리밴더에게 지팡이를 구입할 수 있어요 (무료)']}/>
                    <Card image={'https://user-images.githubusercontent.com/77574867/115653282-d37cd800-a369-11eb-946f-0ed8061253bd.png'} title={'패트로누스를 소환하세요.'} button={'패트로누스 소환하러 가기'} des={['아직 패트로누스를 소환하신 적이 없다면 자신만의 패트로누스를 소환해보세요','패트로누스는 심층세계가 반영된 모습의 동물입니다. 행복한 기억을 떠올리세요.']}/>
                    <Forpadding/>
                </MainContainer>
            </Container>
            <SortingHat
            visible={modalVisible}
            onClose={closeModal}
            maskClosable={true}
            closable={true}
            />
        </React.Fragment>
    )
}

const Container = styled.div`
    width:100%;
    height:100%;
    background-image:url('https://user-images.githubusercontent.com/77574867/115653270-d1b31480-a369-11eb-9d5f-e72d3b24e4c9.png');
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