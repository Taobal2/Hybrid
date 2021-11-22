import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase/compat";
import { app } from "../../Base";
import { useNavigate } from "react-router-dom";

const Tasked = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState("");

  const postTask = async () => {
    await app.firestore().collection("my task").doc().set({
      task,
      done: false,
    });

    setTask("");

    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Card>
          <Input
            placeholder="Enter a new task"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />

          <Button onClick={postTask}>Add Task</Button>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Tasked;

const Input = styled.input`
  width: 300px;
  height: 50px;
  margin: 5px 0;
  padding-left: 5px;
  border: none;
  outline: none;
  font-size: 15px;
`;

const Button = styled.button`
  width: 80%;
  height: 50px;
  border-radius: 5px;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: red;
  margin: 0 auto;
  font-size: 17px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  outline: none;
  border: none;
`;

const Card = styled.div``;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #e0e0e0;
  padding-top: 150px;
  //   color: black;
`;
