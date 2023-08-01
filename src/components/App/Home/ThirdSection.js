import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import DynamicFont from "react-dynamic-font";
import ItemPNG from "../../../assets/images/home/section/section3-item.png";
import i18n from "../../../utils/i18n";
import { ProviderTitle } from "./SharedComponent";

const Container = styled(Grid)`
  width: 1280px;
  margin: 0 auto;

  position: relative;
  display: flex;
  justify-content: space-around;
`;

const ItemInnerLabel = styled.div`
  font-weight: bold;
  padding-bottom: 85px;
  margin: 0 45px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ItemInnerLabelValue = styled.div`
  color: #362f80;
  font-size: 50px;
`;

const ItemInnerLabelMeasurement = styled.div`
  font-size: ${(props) => i18n.language === "ta-IN" ? "18px" : "24px"};;
  color: #414141;
`;

const ItemBottomLabel = styled.div`
  color: ${({ theme }) => {
    return theme.whiteText ? theme.whiteText : "#262626";
  }};
  font-size: 30px;
`;

const ItemContainer = styled.div`
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcHomePage/section3.png"})
    no-repeat;
  background-position-x: center;
  width: 235px;
  height: 280px;
  color: #ffffff;
  text-align: center;
  padding-top: 65px;
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThirdSection = (props) => {
  const itemList = [
    {
      title: i18n.t("web.home.services.service1.title"),
      value: 30,
      measurement: i18n.t("second"),
    },
    {
      title: i18n.t("web.home.services.service2.title"),
      value: 50,
      measurement: i18n.t("second"),
    },
    {
      title: i18n.t("web.home.services.service4.title"),
      value: 80,
      measurement: i18n.t("platform"),
    },
  ];

  return (
    <OuterContainer>
      <ProviderTitle title={i18n.t("t10.home.section3.title")} />
      <Container>
        {itemList.map((item, index) => {
          return (
            <ItemContainer key={index}>
              <ItemInnerLabel>
                <ItemInnerLabelValue>{item.value}</ItemInnerLabelValue>
                <ItemInnerLabelMeasurement>
                  {item.measurement}
                </ItemInnerLabelMeasurement>
              </ItemInnerLabel>
              <ItemBottomLabel>
                <DynamicFont content={item.title}></DynamicFont>
              </ItemBottomLabel>
            </ItemContainer>
          );
        })}
      </Container>
    </OuterContainer>
  );
};

export default ThirdSection;
