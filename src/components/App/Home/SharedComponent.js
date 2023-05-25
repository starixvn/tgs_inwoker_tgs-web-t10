import React from "react";
import styled from "styled-components";

const TitleBackground = styled.div`
  height: 85px;
  width: 800px;
  mask: url(${process.env.PUBLIC_URL +
    "/assets/images/pcHomePage/titlesection.png"})
    no-repeat bottom;
  mask-size: 100%;
  background-color: ${({ theme }) => theme.homeHeaderBackgroundColor};
`;

const ProviderTitleContainer = styled.div`
  font-size: 2.5em;
  width: 100%;
  text-align: center;
  height: 125px;
  display: flex;
  font-weight: bold;
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  padding-bottom: 20px;
`;

const TheTitleText = styled.div`
  position: absolute;
  font-size: 50px;
  z-index: 1;
  width: 800px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.homeHeaderTextColor};
  padding-bottom: 20px;
  font-weight: bold;
`;

const BigWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  padding-bottom: 20px;
  margin-bottom: 25px;
`;

export const ProviderTitle = ({ title }) => {
  return (
    <BigWrapper>
      <ProviderTitleContainer>
        <TheTitleText>{title}</TheTitleText>
        <TitleBackground />
      </ProviderTitleContainer>
    </BigWrapper>
  );
};
