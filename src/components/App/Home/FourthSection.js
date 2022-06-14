import React from "react";
import { Grid, Container as MContainer } from "@material-ui/core";
import styled from "styled-components";

import Common from "../../../utils/Common";
import ScrollAnimation from "react-animate-on-scroll";

import IconFeature1 from "../../../assets/images/home/section/icon-feature1.png";
import IconFeature2 from "../../../assets/images/home/section/icon-feature2.png";
import IconFeature3 from "../../../assets/images/home/section/icon-feature3.png";
import IconFeature4 from "../../../assets/images/home/section/icon-feature4.png";
import FeatureBackgroundPNG from "../../../assets/images/home/section/section4-rectangle.png";
import i18n from "../../../utils/i18n";

const Container = styled(Grid)`
  width: 1280px;
  margin: 0 auto;
  margin-top: 175px;
  position: relative;
  display: flex;
`;

const FeatureContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 75px 25px;
`;

const FeatureBg = styled.div`
  width: 599px;
  height: 205px;
  background: url(${(props) => {
      return (
        process.env.PUBLIC_URL +
        `/assets/images/pcHomePage/rectangle${props.brand}.png`
      );
    }})
    no-repeat;
  display: flex;
  align-items: center;
  color: #fff;
`;

const FeatureIcon = styled.img`
  width: 72px;
  height: 72px;
  margin: 0 35px;
  object-fit: contain;
`;

const FeatureRightContainer = styled.div`
  margin-right: 34px;
`;
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
`;
const FeatureDesc = styled.div`
  font-size: ${(props) => {
    switch (props.lang) {
      case "en-US":
      case "vi-VN":
      case "th-TH":
        return "1em";
      default:
        return "1.2em";
    }
  }};
`;

const FourthSection = (props) => {
  var featureList = [
    {
      icon: IconFeature1,
      title: i18n.t("web.home.features.feature1.title"),
      description: i18n.t("web.home.features.feature1.description"),
    },
    {
      icon: IconFeature2,
      title: i18n.t("web.home.features.feature2.title"),
      description: i18n.t("web.home.features.feature2.description"),
    },
    {
      icon: IconFeature3,
      title: i18n.t("web.home.features.feature3.title"),
      description: i18n.t("web.home.features.feature3.description"),
    },
    {
      icon: IconFeature4,
      title: i18n.t("web.home.features.feature4.title"),
      description: i18n.t("web.home.features.feature4.description"),
    },
  ];
  return (
    <Container>
      <ScrollAnimation
        animateIn="fadeInLeft"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible", position: "relative" }}
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
                  <FeatureDesc lang={i18n.language}>
                    {feature.description}
                  </FeatureDesc>
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
