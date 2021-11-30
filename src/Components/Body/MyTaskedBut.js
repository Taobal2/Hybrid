import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { app } from "../../Base";

const MyTaskedBut = ({ myId }) => {
  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

  const getDataUpdate = async (myId) => {
    await app.firestore().collection("my task").doc(myId).update({
      done: true,
    });
  };

  const deleteData = async (myId) => {
    await app.firestore().collection("my task").doc(myId).delete({});
  };

  useEffect(() => {
    getDataUpdate(myId);
  }, []);

  return (
    <Button>
      <Icon
        onClick={() => {
          getDataUpdate(myId);
          onToggle();
          // console.log("am in");
        }}
      >
        {" "}
        <BsFillCheckCircleFill />
      </Icon>

      <Icon
        style={{ color: "red" }}
        onClick={() => {
          deleteData(myId);
          console.log("am out");
        }}
      >
        {" "}
        <AiOutlineDelete />
      </Icon>
    </Button>
  );
};

export default MyTaskedBut;

const Icon = styled.div`
  margin: 0 5px;
`;

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
  }
`;
