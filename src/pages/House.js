import React from "react";
import styled from "styled-components";
import { response } from "../redux/modules/UserInformation";
import "../House.css";
import ProfileCard from "../components/ProfileCard";
import HouseChat from "../components/HouseChat";
import { api as houseActions } from "../redux/modules/house";
import { useDispatch, useSelector } from "react-redux";

const House = (props) => {
  const dispatch = useDispatch();
  let url = document.location.href.split("/");
  let house_name = url[url.length - 1];
  const students_list = useSelector((state) => state.house.students);
  console.log(students_list);
  React.useEffect(() => {
    dispatch(houseActions.getStudentsSV(house_name));
  }, []);

  return (
    <React.Fragment>
      <div className={house_name}>
        <Container>
          <HouseChat />
        <ProfileContainer>
          {students_list.map((v, idx) => {
            return <ProfileCard user_list={v} key={idx} />;
          })}
        </ProfileContainer>
        </Container>
      </div>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px;
  overflow:auto;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ProfileContainer = styled.div`
  box-sizing: border-box;
  margin: 100px 0px;
  padding: 50px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export default House;
