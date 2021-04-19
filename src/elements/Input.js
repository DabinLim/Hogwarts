import React from 'react';
import styled from 'styled-components';
import {Text} from '../elements';

const Input = (props) => {

    const {label, placeholder, _onChange, type, multiLine, value, onSubmit, is_Submit} = props;

    if (multiLine) {
        return (
          <Grid>
            <Text margin="0px">{label ? label : ""}</Text>
            <ElTextArea
              rows={10}
              value={value}
              placeholder={placeholder}
              onChange={_onChange}
            ></ElTextArea>
          </Grid>
        );
      }
    
      return (
        <React.Fragment>
          <Grid>
            <Text color='white' margin="0px">{label ? label : ""}</Text>
            {/* 다른 인풋에 value값이 없기때문에 코멘트 작성 인풋에 isSubmit을 줘서 코멘트 작성 인풋만 value라는 props를 넣어주기 위함 */}
            {is_Submit ? (
              <ElInput
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={_onChange}
                onKeyPress={(e) => {
                  if(e.key === 'Enter'){
                    onSubmit(e);
                  }
                }}
              />
            ) : (
              <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
            )}
          </Grid>
        </React.Fragment>
      )
}

Input.defaultProps = {
    multiLine: false,
    label: false,
    placeholder: "텍스트를 입력해주세요.",
    is_Submit: false,
    _onChange: () => {},
    type: "text",
    value: "",
    onSubmit: () => {},
  };

  const Grid = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:50px;
    box-sizing:border-box;
  `;
  
  const ElTextArea = styled.textarea`
    border: 1px solid #212121;
    border-radius: 5px;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
  `;
  
  const ElInput = styled.input`
    border: 1px solid #212121;
    border-radius: 5px;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;

  `;
  
  export default Input;