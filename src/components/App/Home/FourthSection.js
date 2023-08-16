import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

import ScrollAnimation from "react-animate-on-scroll";

import i18n from "../../../utils/i18n";
import { utility } from "../../../utils/utility";
import config from "../../../config/config";

const Container = styled(Grid)`
  width: 1280px;
  margin: 0 auto;
  margin-top: 175px;
  position: relative;
`;

const FeatureContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 1280px;
  gap: 20px;
  text-align: justify;
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

const FeatureRightContainer = styled.div`
  color: ${({ theme }) => {
    return theme.primaryText;
  }};
`;
const FeatureTitle = styled.div`
  margin-bottom: 10px;
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
      icon: "feature1",
      title: i18n.t("t10.home.section3.content.first"),
      description: i18n.t("web.home.features.feature1.description"),
    },
    {
      icon: "feature2",

      title: i18n.t("t10.home.section3.content.second"),
      description: i18n.t("web.home.features.feature2.description"),
    },
    {
      icon: "feature3",
      title: i18n.t("t10.home.section3.content.third"),
      description: i18n.t("web.home.features.feature3.description"),
    },
    {
      icon: "feature4",
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
                <FeatureIcon
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/images/pcHomePage/" +
                    (utility.assetsSwitcher
                      ? utility.assetsSwitcher(config.features.UseBrandAssets)
                      : "") +
                    feature.icon +
                    ".png"
                  }
                  alt={index}
                ></FeatureIcon>
                <FeatureRightContainer>
                  <FeatureTitle lang={i18n.language}>
                    {feature.title}
                  </FeatureTitle>
                  <div>{feature.description}</div>
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
