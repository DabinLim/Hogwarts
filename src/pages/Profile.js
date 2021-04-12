import React, { Fragment, useState } from 'react'
import styled from "styled-components"
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Profile = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [interest1, setinterest1] = useState('');
    const [interest2, setinterest2] = useState('');
    const [interest3, setinterest3] = useState('');

    const handleChange1 = (event) => {
        setinterest1(event.target.value);
    };

    const handleChange2 = (event) => {
        setinterest2(event.target.value);
    };

    const handleChange3 = (event) => {
        setinterest3(event.target.value);
    };
    
    const changeImg = () => {
    }
    ;

    return (
        <Fragment>
            <Full>
                <Div>
                    <Imgdiv>
                        <Image size="200" src={props.img} />
                        <Imgchange>이미지 선택</Imgchange>
                    </Imgdiv>
                    <Profilechg>
                        <Nickdiv>
                            <NickSpan>닉네임</NickSpan>
                            <Nickedit
                                placeholder="닉네임"
                            />
                        </Nickdiv>
                        <Interdiv>
                            <Intertext>
                                <Interspan>
                                    관심사
                                </Interspan>
                                <Interp>
                                    (중복 선택 불가능)
                                </Interp>
                            </Intertext>
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={interest1}
                                    onChange={handleChange1}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <span>관심사 선택하기</span>
                                    </MenuItem>
                                    <MenuItem value={1}>React</MenuItem>
                                    <MenuItem value={2}>React Native</MenuItem>
                                    <MenuItem value={3}>Spring</MenuItem>
                                    <MenuItem value={4}>Node.js</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={interest2}
                                    onChange={handleChange2}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <span>관심사 선택하기</span>
                                    </MenuItem>
                                    <MenuItem value={1}>React</MenuItem>
                                    <MenuItem value={2}>React Native</MenuItem>
                                    <MenuItem value={3}>Spring</MenuItem>
                                    <MenuItem value={4}>Node.js</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={interest3}
                                    onChange={handleChange3}
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <span>관심사 선택하기</span>
                                    </MenuItem>
                                    <MenuItem value={1}>React</MenuItem>
                                    <MenuItem value={2}>React Native</MenuItem>
                                    <MenuItem value={3}>Spring</MenuItem>
                                    <MenuItem value={4}>Node.js</MenuItem>
                                </Select>
                            </FormControl>
                        </Interdiv>
                    </Profilechg>
                </Div>
            </Full>
        </Fragment>
    )
}

const Full = styled.div`
display: flex;
width: 100%;
height: 100%;
margin: 5px auto;
justify-content: center;
`

const Div = styled.div`
display: flex;
margin: 50px;
align-items: center;
`

const Imgdiv = styled.div`
display: flex;
flex-direction: column;
`

const Imgchange = styled.button`
margin: 0 auto;
margin-top: 10px;
width: 200px;
padding: 10px;
border-radius: 5px;
border: 1px solid;
font-size: 1em;
background: #ffffff;
`

const Profilechg = styled.div`
display: flex;
flex-direction: column;
margin-left: 20px;
`

const Nickdiv = styled.div`
display: flex;
flex-direction: column;
`

const NickSpan = styled.span`
display:flex;
font-weight: 600;
font-size: 1.5em;
`

const Nickedit = styled.input`
margin-top:5px;
display: flex;
background: #ffffff;
font-size: 1em;
padding: 5px;
border: 1px solid;
border-radius: 7px;
width: 15vw;
padding: 10px;
`

const Interdiv = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
`

const Intertext = styled.div`
display:flex;
flex-direction: row;
`

const Interspan = styled.span`
display:flex;
font-weight: 600;
font-size: 1.5em;
`

const Interp = styled.p`
display:flex;
font-weight: 500;
font-size: 0.8em;
margin-bottom: 0px;
`

const Image = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    border: 1px solid;
    background-position: center;
    background-image: url('${(props) => props.src}');
    background-size: cover;
    margin: 4px;
`;

Profile.defaultProps = {
    img: "https://lh3.googleusercontent.com/proxy/TUSg4IvU3Y0u0lQlkquaGo9MKAPk6YFi1DcQK-aiPq7KzDDx4KnDAtVU-VWn3BHQFvblQ3ao9OXXDbEWkcjQwXkoNVWR490bWIOKluyjGiBizbvBEcyiswF8PUL5NpOmQZjeR1RK725CI15Fqh7obhMmBHm4F4vWH4nH066csQ"
}

export default Profile;