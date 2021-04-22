import React from 'react';
import styled from 'styled-components';
import {Image, Text} from '../elements';
import {useDispatch} from 'react-redux';
import {api as userActions} from '../redux/modules/user';
import { history } from '../redux/configStore';


const Header = (props) => {
    const dispatch = useDispatch();
    console.log(props)

    const signOut = () => {
        if(window.confirm('집으로 돌아가시겠습니까? ( 로그아웃 됩니다. )')){
            dispatch(userActions.logOutSV(history));
        }
    }


    return(
        <React.Fragment>

                <HeaderContainer>
                    <None/>
                    <Logo onClick={() => {history.push('/')}}/>
                    <ButtonContainer>
                    <House {...props} onClick={() => {
                        if(props.user_house === null){
                            window.alert('아직 기숙사를 배정 받지 않으셨습니다. 기숙사를 배정 받으세요.')
                        } else{
                            history.push(`/house/${props.user_house}`)
                        }
                    }}/>
                    <Image _onClick={signOut} cursor='pointer' size='44' src='https://user-images.githubusercontent.com/77574867/115653250-ccee6080-a369-11eb-85c2-298f046d7ded.png'/>
                    </ButtonContainer>
                </HeaderContainer>
                {/* <NavigationBox>
                    <Navigation>
                    </Navigation>
                </NavigationBox> */}

        </React.Fragment>
    )
}

Header.defaultProps = {
    user_house:null
}


const HeaderContainer = styled.div`
    z-index:5;
    position:fixed;
    top:0;
    left:0;
    display: flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    width:100%;
    height:80px;
    background-image:url('https://user-images.githubusercontent.com/77574867/115653295-d7105f00-a369-11eb-83c1-930bfbb86bdc.png');
    background-size:cover;
`;

const None = styled.div`
    width:320px;
    height:10px;
`;

const Logo = styled.div`
    width:150px;
    height:60px;
    background-image:url('https://user-images.githubusercontent.com/77574867/115653258-ceb82400-a369-11eb-90e7-2715ef9f45d7.png');
    background-size:contain;
    background-repeat:no-repeat;
    cursor:pointer;
`;

const ButtonContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-end;
    padding-right: 20px;
    width:300px;
`;

const House = styled.div`
    width:60px;
    height:40px;
    ${props => props.user_house === 'Gryffindor' && `background-image:url('https://user-images.githubusercontent.com/77574867/115653254-cd86f700-a369-11eb-93d3-bfd142bc4c78.png');`}
    ${(props) => props.user_house === 'Slytherin' && `background-image:url('https://user-images.githubusercontent.com/77574867/115653290-d5469b80-a369-11eb-8e60-477706e02477.png');`};
    ${(props) => props.user_house === 'Ravenclaw' && `background-image:url('https://user-images.githubusercontent.com/77574867/115653286-d4156e80-a369-11eb-81b1-13ee1b76c6c7.png');`};
    ${(props) => props.user_house === 'Hufflepuff' && `background-image:url('https://user-images.githubusercontent.com/77574867/115653267-d081e780-a369-11eb-8274-5df5399ec473.png');`};
    ${(props) => props.user_house === null && `background-image:url('https://user-images.githubusercontent.com/77574867/115653260-cf50ba80-a369-11eb-8196-0a5704a59331.png');`};
    background-size:contain;
    background-repeat:no-repeat;
    cursor:pointer;
`;




// const NavigationBox = styled.div`
//     background-color: #10141c;
//     width:100%;
//     height:60px;
//     display:flex;
//     justify-content:center;
// `;

// const Navigation = styled.div`
//     background-color: #10141c;
//     width:100%;
//     max-width:1000px;
//     height:60px;
//     display:flex;
//     flex-direction:row;
//     align-items:center;
//     justify-content:space-between;
//     border:1px solid white;
// `;

export default Header;