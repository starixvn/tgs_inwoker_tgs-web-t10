import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

import ScrollAnimation from "react-animate-on-scroll";

import IconFeature1 from "../../../assets/images/home/section/icon-feature1.png";
import IconFeature2 from "../../../assets/images/home/section/icon-feature2.png";
import IconFeature3 from "../../../assets/images/home/section/icon-feature3.png";
import IconFeature4 from "../../../assets/images/home/section/icon-feature4.png";

import i18n from "../../../utils/i18n";

const Container = styled(Grid)`
  width: 1280px;
  margin: 0 auto;
  margin-top: 175px;
  position: relative;
`;

const FeatureContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 1280px;
`;

const FeatureBg = styled.div`
  background: url(${(props) => {
      return (
        process.env.PUBLIC_URL +
        `/assets/images/pcHomePage/rectangle${props.brand}.png`
      );
    }})
    no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;

  color: #fff;
`;

const FeatureIcon = styled.img``;

const FeatureRightContainer = styled.div``;
const FeatureTitle = styled.div`
  font-size: ${(props) => {
    switch (props.lang) {
      case "en-US":
      case "vi-VN":
      case "th-TH":
        return "1.5em";
      default:
        return "2em";
    }
  }};
  font-weight: bold;
  padding-bottom: 10px;
  color: ${({ theme }) => {
    return theme.whiteText ? theme.whiteText : "#262626";
  }};
  text-align: center;
`;

const FourthSection = (props) => {
  var featureList = [
    {
      icon: IconFeature1,
      title: i18n.t("t10.home.section3.content.first"),
      description: i18n.t("web.home.features.feature1.description"),
    },
    {
      icon: IconFeature3,

      title: i18n.t("t10.home.section3.content.second"),
      description: i18n.t("web.home.features.feature2.description"),
    },
    {
      icon: IconFeature2,
      title: i18n.t("t10.home.section3.content.third"),
      description: i18n.t("web.home.features.feature3.description"),
    },
    {
      icon: IconFeature4,
      title: i18n.t("t10.home.section3.content.forth"),
      description: i18n.t("web.home.features.feature4.description"),
    },
  ];
  return (
    <Container>
      <ScrollAnimation
        animateIn="fadeInLeft"
        duration={1}
        animateOnce={true}
        style={{
          overflow: "visible",
          position: "relative",
        }}
      >
        <FeatureContainer>
          {featureList.map((feature, index) => {
            return (
              <FeatureBg brand={props.brand}>
                <FeatureIcon src={feature.icon} alt={index}></FeatureIcon>
                <FeatureRightContainer>
                  <FeatureTitle lang={i18n.language}>
                    {feature.title}
                  </FeatureTitle>
                </FeatureRightContainer>
              </FeatureBg>
            );
          })}
        </FeatureContainer>
      </ScrollAnimation>
    </Container>
  );
};

export default FourthSection;
