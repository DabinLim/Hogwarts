import React from 'react';
import styled from 'styled-components';
import {Image,Text} from '../elements';
import {useSelector} from 'react-redux';

const SideProfile = (props) => {
    const userInfo = useSelector(state => state.user.user);
    return(
        <React.Fragment>
            <Image size='80' cursor='pointer' src={userInfo.userProfile}/>
            <Text margin='40px auto' size='20' bold>{userInfo.userName}</Text>
            <Text color='#0095f6' cursor='pointer'>편집</Text>
        </React.Fragment>
    )
}

export default SideProfile;