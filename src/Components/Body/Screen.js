import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  BsFillBookmarkCheckFill,
  BsFillBookmarkDashFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { app } from "../../Base";
import MyTaskedBut from "./MyTaskedBut";
import { AuthContext } from "../Global/AuthProvider";

const Screen = () => {
  const [data, setData] = useState([]);

  const value = useContext(AuthContext);

  const getData = async () => {
    await app
      .firestore()
      .collection("my task")
      .onSnapshot((snapshot) => {
        const file = [];
        snapshot.forEach((doc) => {
          file.push({ ...doc.data(), id: doc.id });
        });
        setData(file);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {value.msg}
      <Wrapper>
        {data?.map((props) => (
          <Card key={props.id}>
            <Checker>
              {props.done ? (
                <Icon>
                  <BsFillBookmarkCheckFill />
                </Icon>
              ) : (
                <Icon>{<BsFillBookmarkDashFill />}</Icon>
              )}
            </Checker>
            <Text>{props.task}</Text>

            <MyTaskedBut myId={props.id} />
          </Card>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Screen;

const Button = styled.div`
  color: green;
  font-size: 25px;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  transition: all 350ms;

  :hover {
    cursor: pointer;
    // background-color: rgba(255, 255, 255, 0.6);
  }
`;

const Text = styled.div`
  margin-left: 20px;
  font-weight: bold;
  font-size: 25px;
  flex: 1;
`;

const Icon = styled.div``;

const Checker = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 30px;
  margin-left: 10px;
`;

const Card = styled.div`
  width: 80%;
  height: 100px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #e0e0e0;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
