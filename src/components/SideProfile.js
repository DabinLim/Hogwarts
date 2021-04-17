import React from 'react';
import styled from 'styled-components';
import {Image,Text} from '../elements';
import {useSelector} from 'react-redux';
import {history} from '../redux/configStore';

const SideProfile = (props) => {
    const userInfo = useSelector(state => state.user.user);
    let userProfile
    if(userInfo) {
        userProfile = userInfo.userProfile
    }
    return(
        <React.Fragment>
            <Image size='80' margin='10px 0px 0px 0px'cursor='pointer' src={userProfile? userProfile : 'https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/blankprofile.png?alt=media&token=839ae664-a63d-4e77-92c3-b1030ebde97e'}/>
            <Text margin='40px auto' size='20' bold>{userInfo? userInfo.userName : null}</Text>
            <Text color='#0095f6' cursor='pointer'_onClick={()=>{history.push('/profile')}}>편집</Text>
        </React.Fragment>
    )
}

export default SideProfile;