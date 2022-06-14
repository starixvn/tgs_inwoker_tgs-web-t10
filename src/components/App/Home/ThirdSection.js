import { Grid, Container as MContainer } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import DynamicFont from "react-dynamic-font";
import ItemPNG from "../../../assets/images/home/section/section3-item.png";
import i18n from "../../../utils/i18n";

const Container = styled(Grid)`
  width: 1280px;
  margin: 0 auto;
  margin-top: 175px;
  position: relative;
  display: flex;
  justify-content: space-around;
`;

const ItemInnerLabel = styled.div`
  font-size: 38px;
  font-weight: bold;
  padding-bottom: 100px;
  margin: 0 45px;
  color: #007797;
`;

const ItemBottomLabel = styled.div`
  color: #262626;
  font-size: 30px;
`;

const ItemContainer = styled.div`
  background: url(${ItemPNG}) no-repeat;
  background-position-x: center;
  width: 235px;
  height: 280px;
  color: #ffffff;
  text-align: center;
  padding-top: 85px;
`;

const ThirdSection = (props) => {
  const itemList = [
    {
      title: i18n.t("web.home.services.service1.title"),
      value: i18n.t("web.home.services.service1.value"),
    },
    {
      title: i18n.t("web.home.services.service2.title"),
      value: i18n.t("web.home.services.service2.value"),
    },
    {
      title: i18n.t("web.home.services.service4.title"),
      value: i18n.t("web.home.services.service4.value"),
    },
  ];

  return (
    <Container>
      {itemList.map((item, index) => {
        return (
          <ItemContainer key={index}>
            <ItemInnerLabel>
              <DynamicFont content={item.value}></DynamicFont>
            </ItemInnerLabel>
            <ItemBottomLabel>
              <DynamicFont content={item.title}></DynamicFont>
            </ItemBottomLabel>
          </ItemContainer>
        );
      })}
    </Container>
  );
};

export default ThirdSection;
