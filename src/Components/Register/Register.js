import React, { useState } from "react";
import styled from "styled-components";
import { app } from "../../Base";
import firebase from "firebase/compat";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = async () => {
    try {
      const userData = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (userData) {
        await app
          .firestore()
          .collection("myUserData")
          .doc(userData.user.uid)
          .set({
            userName,
            email,
            password,
            avatar: userName.charAt(0),
          });
      }

      setUserName("");
      setPassword("");
      setEmail("");

      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const signUpWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const userData = await app.auth().signInWithPopup(provider);

    navigate("/");

    if (userData) {
      await app.firestore().collection("myUserData").doc().set({
        userName: userData.user.displayName,
        email: userData.user.email,
        avatar: userData.user.photoUrl,
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Card>
          <Input
            placeholder="Enter your userName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <Input
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div>{error}</div>
          <Button
            onClick={() => {
              console.log("am in");
              signUp();
            }}
          >
            Sign up
          </Button>
          <Text>
            Sign up with <span onClick={signUpWithGoogle}>Google</span>
          </Text>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Register;

const Text = styled.div`
  span {
    color: red;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
  margin: 5px 0;
  border-radius: 4px;
  padding-left: 5px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: coral;
  color: white;

  ::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const Button = styled.button`
  width: 60%;
  height: 50px;
  border-radius: 5px;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: red;
  margin: 20px auto;
  font-size: 17px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  outline: none;
  border: none;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
