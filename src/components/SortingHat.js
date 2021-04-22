import React from "react";
import styled from "styled-components";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { response } from "../redux/modules/SortingQuestion";
import { Button } from "../elements";
import { useDispatch } from "react-redux";
import { api as userActions } from "../redux/modules/user";

const SortingHat = (props) => {
  const dispatch = useDispatch();
  const { className, visible, maskClosable, closable, onClose } = props;

  const [button_value, setButtonValue] = React.useState("선택하기");
  const [value, setValue] = React.useState("Gryffindor");
  const [question_num, setQuestionNum] = React.useState(0);
  const [answer_list, setAnswerList] = React.useState([]);
  let now_answer = answer_list;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      setAnswerList([]);
      setQuestionNum(0);
      onClose(e);
    }
  };
  return (
    <React.Fragment>
      <ModalOverlay visible={visible}>
        <ModalContainer
          className={className}
          tabIndex="-1"
          visible={visible}
          onClick={maskClosable ? onMaskClick : null}
        >
          <ModalInner tabIndex="0">
            {response.question_list.map((v, index) => {
              return (
                <section
                  style={{
                    top: `${question_num}px`,
                    left: "0",
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    transition: "linear 0.5s",
                  }}
                  key={index}
                >
                  {closable && <CloseButton onClick={close}>x</CloseButton>}
                  <HatImage />
                  <Question>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">{v.question}</FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="Gryffindor"
                          control={<Radio />}
                          label={v.answer_1}
                        />
                        <FormControlLabel
                          value="Slytherin"
                          control={<Radio />}
                          label={v.answer_2}
                        />
                        <FormControlLabel
                          value="Ravenclaw"
                          control={<Radio />}
                          label={v.answer_3}
                        />
                        <FormControlLabel
                          value="Hufflepuff"
                          control={<Radio />}
                          label={v.answer_4}
                        />
                      </RadioGroup>
                    </FormControl>
                    {/* <Button _onClick={()=> {setQuestionNum((v.num-1)* -550)}}>이전단계로</Button> */}
                    <Button
                      _onClick={() => {
                        if (v.num === 11) {
                          dispatch(
                            userActions.setHouseSV(
                              answer_list,
                              value
                            )
                          );
                          close();
                        } else {
                          if (v.num === 10) {
                            setButtonValue("제출하기");
                          }
                          setQuestionNum(v.num * -550);
                          now_answer.push(value);
                          setAnswerList(now_answer);
                        }
                      }}
                    >
                      {button_value}
                    </Button>
                  </Question>
                </section>
              );
            })}
          </ModalInner>
        </ModalContainer>
      </ModalOverlay>
    </React.Fragment>
  );
};

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const ModalContainer = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: hidden;
  outline: 0;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-image: url("https://user-images.githubusercontent.com/77574867/115653293-d677c880-a369-11eb-8652-0a5f16024e68.png");
  background-size: cover;
  border-radius: 10px;
  width: 60%;
  height: 550px;
  max-width: 800px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  overflow: hidden;
  margin: 20px auto;
`;

const CloseButton = styled.button`
  font-size: x-large;
  position: fixed;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-style: none;
  border-radius: 10px;
  background-color: white;
`;

const HatImage = styled.div`
  width: 20%;
  height: 30%;
  background-image: url("https://user-images.githubusercontent.com/77574867/115653292-d5df3200-a369-11eb-93cc-9a5c731460c5.png");
  background-size: contain;
  background-repeat: no-repeat;
  margin: 0px auto 20px auto;
`;

const Question = styled.div`
  padding: 0px 100px;
`;

export default SortingHat;
