import React from 'react';
import styled from 'styled-components';
import {Button, Input} from '../elements';
import {useDispatch} from 'react-redux';

const TextWrite = (props) => {
    const [content, setContent] = React.useState('')
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <Input width='60%' type='text' value={content} _onChange={(e) => {
                setContent(e.target.value);
                
                }}/>
            <Button onClick={props._onClick} width='60px'>전송</Button>
        </React.Fragment>
    )
}



export default TextWrite;