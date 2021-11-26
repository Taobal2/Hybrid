import React, { useContext } from "react";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../Global/AuthProvider";
import { app } from "../../Base";

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  return (
    <Container>
      <Wrapper>
        <Logo />

        <Navigation>
          <NavHolder to="/">
            <Icon>
              <AiFillHome />
            </Icon>
            <Nav>Home</Nav>
          </NavHolder>

          {currentUser ? (
            <NavHolder to="/tasked">
              <Icon>
                <FaTasks />
              </Icon>
              <Nav>Create a task</Nav>
            </NavHolder>
          ) : null}
        </Navigation>

        <Register>
          {currentUser ? <Logo /> : null}

          {currentUser ? (
            <NavHolder1
              onClick={() => {
                app.auth().signOut();
              }}
            >
              <Icon>
                <FiLogIn />
              </Icon>
              <Nav>Log out</Nav>
            </NavHolder1>
          ) : (
            <NavHolder to="/reg">
              <Icon>
                <FiLogIn />
              </Icon>
              <Nav>Log in</Nav>
            </NavHolder>
          )}
        </Register>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Register = styled.div`
  margin: 0 10px;
  display: flex;
  align-items: center;
`;

const Navigation = styled.div`
  display: flex;
  flex: 1;
`;

const NavHolder1 = styled.div`
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  transition: all 350ms;
  color: white;

  :hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const NavHolder = styled(Link)`
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 10px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  transition: all 350ms;
  color: white;

  :hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const Nav = styled.div`
  font-size: 18px;
`;

const Icon = styled.div`
  margin-right: 5px;
  font-size: 23px;
  margin-top: 6px;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  margin: 0px 20px;
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: red;
  color: white;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
