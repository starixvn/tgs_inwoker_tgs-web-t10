import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";

const Container = styled(Grid)`
  width: 1400px;
  margin: 175px auto;
`;

const ProviderTitle = styled.div`
  color: #107f9d;
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
        {props.providerList
          .filter((gp) => {
            if (gp.abbreviation.includes("TCG")) {
              return gp.abbreviation === "TCG_SEA";
            } else {
              return gp;
            }
          })
          .map((item, index) => {
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
