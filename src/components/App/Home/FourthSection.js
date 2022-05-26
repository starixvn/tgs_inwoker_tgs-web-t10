import React from "react";
import styled from "styled-components";
import BackgroundPng from "../../../assets/images/home/section/section4-bg.jpg";

import Common from "../../../utils/Common";
import ScrollAnimation from "react-animate-on-scroll";
const Background = styled.div`
  height: 580px;

  z-index: 3;
  background: url(${BackgroundPng}) center no-repeat;
  padding-top: 40px;
`;

const RightDesc = styled.img`
  position: absolute;
  right: 50%;
  top: 66px;
  margin-right: -347px;
`;
const FourthSection = (props) => {
  return (
    <Background>
      <ScrollAnimation
        animateIn="fadeInLeft"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible", position: "relative" }}
      >
        <RightDesc
          src={
            process.env.PUBLIC_URL +
            "/assets/images/" +
            Common.getLanguagePrefixFolder() +
            "/section3-desc.png"
          }
        ></RightDesc>
      </ScrollAnimation>
    </Background>
  );
};

export default FourthSection;
