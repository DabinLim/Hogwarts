import React from 'react';
import styled from 'styled-components';
import { Button, Text } from '../elements';

const ProfileCard = (props) => {
    const [rotate, setRotate] = React.useState('rotateY(0deg)');

    const cardSpin = () => {
        if(rotate === 'rotateY(0deg)'){
            setRotate('rotateY(180deg)')
        } else{
            setRotate('rotateY(0deg)')
        }
    }
    console.log(props)
    return(
        <React.Fragment>
            <div style={{position:'relative',width:'300px',height:'500px', margin:'20px',
                transform:`perspective(1500px) ${rotate}`, transformStyle:'preserve-3d',transition:'linear 0.5s'
                }}>
                    <ContainerFront>
                <ProfileImg user_list={props.user_list}/>
                <ProfileBox>
                    <TextBox>
                    <Text width='auto' margin='0px' bold size='18px'>이름 :</Text>
                    <Text bold margin='0px 10px' size='14px'>{props.user_list.nickname}</Text>
                    </TextBox>
                    <TextBox>
                    <Text width='auto' margin='0px' bold size='18px'>소속 :</Text>
                    <Text bold margin='0px 10px' size='14px'>{props.user_list.user_house}</Text>
                    </TextBox>
                    <Button _onClick={cardSpin} margin='30px 0px'>상세 정보 보기</Button>
                </ProfileBox>
                    </ContainerFront>
                    <ContainerBack>
                        <ProfileDetailBack>
                        <Button _onClick={cardSpin} margin='30px 0px'>프로필 정보 보기</Button>
                        </ProfileDetailBack>
                    </ContainerBack>
            </div>
        </React.Fragment>
    )
}

const ContainerFront = styled.div`
    z-index:0.1;
    position:absolute;
    top: -20px;
    left: -20px;
    width:100%;
    height:100%;
    margin: 20px;
    background-color: white;
    border-radius:10px;
    backface-visibility:hidden;
`;

const ProfileImg = styled.div`
    margin:20px auto;
    width:260px;
    height:260px;
    border-radius:10px;
    background-image:url(${props => props.user_list.profile_img});
    background-size:cover;
`;

const ProfileBox = styled.div`
    box-sizing:border-box;
    padding: 10px 40px;
`;

const TextBox = styled.div`
    width:100%;
    height:100%;
    display:flex;
    margin: 10px 0px;
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
`;

const ContainerBack = styled.div`
    z-index:0;
    position:absolute;
    top: -20px;
    left: -20px;
    width:100%;
    height:100%;
    margin: 20px;
    background-color: white;
    border-radius:10px;
    transform: rotateY(180deg);
    backface-visibility:hidden;
`;

const ProfileDetailBack = styled.div`
    box-sizing:border-box;
    padding:20px;
    width:100%;
    height:100%;
    border-radius:10px;
`;

export default ProfileCard;