import React from "react";
import styled from "styled-components";

const TitleBackground = styled.div`
  height: 100px;
  width: 800px;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcHomePage/titlesection.png"})
    no-repeat center;
  background-size: 100%;
  background-position: bottom;
`;

const ProviderTitleContainer = styled.div`
  color: #19bc9b;
  font-size: 2.5em;
  width: 100%;
  text-align: center;
  height: 125px;
  display: flex;
  font-weight: bold;
  position: relative;

  justify-content: center;
  margin-bottom: 15px;
`;

const TheTitleText = styled.div`
  position: absolute;
  font-size: 50px;
  bottom: 40px;
  text-transform: uppercase;
`;

export const ProviderTitle = ({ title }) => {
  return (
    <ProviderTitleContainer>
      <TheTitleText>{title}</TheTitleText>
      <TitleBackground />
    </ProviderTitleContainer>
  );
};
