import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import { reduxprofile, set_preview } from "../redux/modules/profile";

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
  const { history } = props;
  const fileInput = useRef();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [interest1, setinterest1] = useState("");
  const [interest2, setinterest2] = useState("");
  const [interest3, setinterest3] = useState("");
  const user_info = useSelector((state) => state.profile.user_data);
  const [previewimg, setPreviewimg] = useState();
  const preview = useSelector((state) => state.profile.user_img);

  //프로필 가져오기
  useEffect(() => {
    dispatch(reduxprofile.getProfile());
  }, []);

  useEffect(() => {
    if (Object.keys(user_info).length === 0) {
      return;
    }
    // if (user_info.userInterested.length === 1) {
    //   setinterest1(user_info.userInterested[0]);
    // }
    setinterest1(user_info.userInterested[0]);
    setinterest2(user_info.userInterested[1]);
    setinterest3(user_info.userInterested[2]);
    setName(user_info.userName);
  }, [user_info]);

  //파일선택
  const selectFile = (e) => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    if (!file) {
      return;
    }
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewimg(file);
      dispatch(set_preview(reader.result));
    };
  };

  const saveprofile = () => {
    const interest = [interest1, interest2, interest3];
    // if (preview === "https://i.ibb.co/MDKhN7F/kakao-11.jpg") {
    //   console.log("이미지 없는 상태로 PUT")
    //   dispatch(reduxprofile.updateProfile(null, name, interest))
    // } else {
    //   console.log("test")
    //   dispatch((preview, name, interest));
    // }
    const many = {};
    if (interest1 !== ""||interest2 !== ""||interest3 !== "") {
      many[interest1] = (many[interest1] || 0) + 1;
      many[interest2] = (many[interest2] || 0) + 1;
      many[interest3] = (many[interest3] || 0) + 1;
    }
    console.log(many)
    
    for (const key in many) {
      if (many[key] !== 1) {
        window.alert("중복된 관심사가 있습니다. 다시 확인해주세요.");
        return;
      }
    }
    if (Object.keys(many).length === 0) {
      window.alert("관심사를 한 개 이상 선택해 주세요.");
      return;
    }
    if (!name) {
      window.alert("닉네임을 입력해주세요.");
      return;
    }
    dispatch(
      reduxprofile.updateProfileimg(preview, name, interest, previewimg)
    );
  };

  const namechange = (event) => {
    setName(event.target.value);
  };

  const handleChange1 = (event) => {
    setinterest1(event.target.value);
    console.log(event.target.value);
  };

  const handleChange2 = (event) => {
    setinterest2(event.target.value);
  };

  const handleChange3 = (event) => {
    setinterest3(event.target.value);
  };

  const test = [
    { value: "React", text: "React" },
    { value: "ReactNative", text: "React Native" },
    { value: "Spring", text: "Spring" },
    { value: "Node", text: "Node.js" },
  ];

  return (
    <Fragment>
      <Full>
        <Div1>
          <Div2>
            <Imgdiv>
              <Image size="200" src={preview ? preview : `${props.img}`} />
              <Imgchange type="file" ref={fileInput} onChange={selectFile} />
            </Imgdiv>
            <Profilechg>
              <Nickdiv>
                <NickSpan>닉네임</NickSpan>
                <Nickedit
                  value={name}
                  onChange={namechange}
                  placeholder="닉네임"
                  maxLength="10"
                />
              </Nickdiv>
              <Interdiv>
                <Intertext>
                  <Interspan>관심사</Interspan>
                  <Interp>(중복 선택 불가능)</Interp>
                </Intertext>
                <FormControl className={classes.formControl}>
                  <Select
                    value={interest1}
                    onChange={handleChange1}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <span>관심사 선택하기</span>
                    </MenuItem>
                    {test.map((i, idx) => {
                      return <MenuItem value={i.value}>{i.text}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Select
                    value={interest2}
                    onChange={handleChange2}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <span>관심사 선택하기</span>
                    </MenuItem>
                    {test.map((i, idx) => {
                      return <MenuItem value={i.value}>{i.text}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Select
                    value={interest3}
                    onChange={handleChange3}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <span>관심사 선택하기</span>
                    </MenuItem>
                    {test.map((i, idx) => {
                      return <MenuItem value={i.value}>{i.text}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Interdiv>
            </Profilechg>
          </Div2>
          <Clickdiv1>
            <Clickdiv2>
              <Savebtn onClick={saveprofile}>저장하기</Savebtn>
              <Cancelbtn
                onClick={() => {
                  history.replace("/all");
                }}
              >
                돌아가기
              </Cancelbtn>
            </Clickdiv2>
          </Clickdiv1>
        </Div1>
      </Full>
    </Fragment>
  );
};

const Clickdiv1 = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const Clickdiv2 = styled.div`
  display: flex;
  flex-direction: row;
`;

const Savebtn = styled.button`
  padding: 10px 20px;
  margin-right: 5px;
  border-radius: 10px;
  border: 1px solid #53a4c6;
  background: #53a4c6;
  font-size: 0.9em;
`;

const Cancelbtn = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #53a4c6;
  background: #53a4c6;
  font-size: 0.9em;
`;

const Full = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 5px auto;
  justify-content: center;
  align-items: center;
`;

const Div2 = styled.div`
  display: flex;
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
  }
  flex-direction: row;
`;

const Div1 = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px auto;
`;

const Imgdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Imgchange = styled.input`
  margin: 0 auto;
  margin-top: 10px;
  width: 200px;
  padding: 10px;
`;

const Profilechg = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 500px;
  @media only screen and (max-width: 1100px) {
    width: 300px;
  }
`;

const Nickdiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const NickSpan = styled.span`
  display: flex;
  font-weight: 600;
  font-size: 1.5em;
`;

const Nickedit = styled.input`
  margin-top: 5px;
  display: flex;
  background: #ffffff;
  font-size: 1em;
  padding: 5px;
  border: 1px solid;
  border-radius: 7px;
  width: auto;
  padding: 10px;
`;

const Interdiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Intertext = styled.div`
  display: flex;
  flex-direction: row;
`;

const Interspan = styled.span`
  display: flex;
  font-weight: 600;
  font-size: 1.5em;
`;

const Interp = styled.p`
  display: flex;
  font-weight: 500;
  font-size: 0.8em;
  margin-bottom: 0px;
`;

const Image = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  border: 1px solid;
  background-position: center;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

Profile.defaultProps = {
  img: "https://i.ibb.co/MDKhN7F/kakao-11.jpg",
};

export default Profile;
