import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundText>404 - Not Found</NotFoundText>
      {/* <NotFoundImage src="/ministry.jpg" alt="Not Found" /> */}
      <HomeLink to="/">Go to Home</HomeLink>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NotFoundText = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const NotFoundImage = styled.img`
  width: 300px;
  height: auto;
`;

const HomeLink = styled(Link)`
  text-decoration: none;
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;
