import { Grid, Container as MContainer } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

import ItemPNG from "../../../assets/images/home/section/section3-item.png";
import i18n from "../../../utils/i18n";

const Container = styled(Grid)`
  width: 1400px;
  margin: 175px auto;
`;

const ProviderTitle = styled.div`
  color: #fff;
  font-size: 2.5em;
  text-align: center;
  height: 125px;
`;

const ProviderContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 20px;
`;
const ProviderIMG = styled.div`
  background: url("${process.env.PUBLIC_URL}/assets/images/provider/${(props) =>
  props.provider}.png") no-repeat;
  width: 130px;
  height: 66px;
`;

const FifthSection = (props) => {
  return (
    <Container>
      <ProviderTitle>{i18n.t("web.footer.footerDescTitle")}</ProviderTitle>
      <ProviderContainer>
        {props.providerList.map((item, index) => {
          return (
            <ProviderIMG
              key={index}
              provider={item.abbreviation.toLowerCase()}
              title={item.name}
            ></ProviderIMG>
          );
        })}
      </ProviderContainer>
    </Container>
  );
};

export default FifthSection;
