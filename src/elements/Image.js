import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
    const {shape, src, size,margin} = props;

    const styles = {
        src: src,
        size: size,
        margin: margin,
    }

    if(shape === 'circle'){
        return (
            <ImageCircle {...styles}></ImageCircle>
        )
    }

    if(shape === 'rectangle'){
        return (
            <AspectOutter>
                <AspectInner {...styles}>

                </AspectInner>
            </AspectOutter>
        )
    }

    return (
        <React.Fragment>
            <ImageDefault {...styles}></ImageDefault>
        </React.Fragment>
    )
}

Image.defaultProps = {
    shape:'circle',
    src: 'https://firebasestorage.googleapis.com/v0/b/react-chat-2b875.appspot.com/o/blankprofile.png?alt=media&token=839ae664-a63d-4e77-92c3-b1030ebde97e',
    size: 36,
    margin:'4px',
}

const ImageDefault = styled.div `
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);

    background-image: url('${(props) => props.src}');
    background-size: cover;
`;

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);

    background-image: url('${(props) => props.src}');
    background-size: cover;
    margin: ${(props)=> props.margin};
`;

const AspectOutter = styled.div`
    width: auto;
    min-width: 250px;

`;

const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hidden;
    background-image: url('${(props) => props.src}');
    background-size:contain;
    background-repeat:no-repeat;
`;

export default Image;