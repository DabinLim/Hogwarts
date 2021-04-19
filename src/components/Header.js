import React from 'react';
import styled from 'styled-components';
import {Text} from '../elements';
import {useDispatch} from 'react-redux';
import {api as userActions} from '../redux/modules/user';
import { history } from '../redux/configStore';


const Header = (props) => {
    const dispatch = useDispatch();
    console.log(props)

    const signOut = () => {
        dispatch(userActions.logOutSV(history));
    }


    return(
        <React.Fragment>
            <Container>
                <HeaderContainer>
                    <None/>
                    <Logo/>
                    <ButtonContainer>
                    <House {...props}/>
                    <Text _onClick={signOut}color='white'>로그아웃</Text>
                    </ButtonContainer>
                </HeaderContainer>
                <NavigationBox>
                    <Navigation>
                    </Navigation>
                </NavigationBox>
            </Container>
        </React.Fragment>
    )
}

Header.defaultProps = {
    user_house:null
}

const Container = styled.div`
    display: flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    height:140px;
`;

const HeaderContainer = styled.div`
    display: flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    width:100%;
    height:80px;
    background-color: #242633;
`;

const None = styled.div`
    width:300px;
    height:10px;
`;

const Logo = styled.div`
    width:150px;
    height:60px;
    background-image:url('https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/hog-removebg-preview.png?alt=media&token=5a11d7c3-0d4b-4b43-a49b-ec0f7aab2d59');
    background-size:contain;
    background-repeat:no-repeat;
`;

const ButtonContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-end;
    width:300px;
`;

const House = styled.div`
    width:120px;
    height:40px;
    ${props => props.user_house === 'Gryffindor' && `background-image:url('https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/Gryffindor_ClearBG.png?alt=media&token=d374773d-e337-416b-8761-4f60005863ea');`}
    ${(props) => props.user_house === 'Slytherin' && `background-image:url('https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/Slytherin_ClearBG.png?alt=media&token=2e3778ee-9486-4426-b602-26f2fcfc9499');`};
    ${(props) => props.user_house === 'Ravenclaw' && `background-image:url('https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/RavenclawCrest.png?alt=media&token=df0d0bf7-5907-4111-b6b5-a88132380760');`};
    ${(props) => props.user_house === 'Hufflepuff' && `background-image:url('https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/Hufflepuff_ClearBG.png?alt=media&token=60f89b7b-87e9-482f-8baa-4a1317837d60');`};
    ${(props) => props.user_house === null && `background-image:url('https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/hogwarts-logo-symbol-meaning-history-evolution-3.png?alt=media&token=af273b7c-af92-491f-910b-bf9dc65bfefd');`};
    background-size:contain;
    background-repeat:no-repeat;
    cursor:pointer;
`;


const NavigationBox = styled.div`
    background-color: #10141c;
    width:100%;
    height:60px;
    display:flex;
    justify-content:center;
`;

const Navigation = styled.div`
    background-color: #10141c;
    width:100%;
    max-width:1000px;
    height:60px;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    border:1px solid white;
`;

export default Header;