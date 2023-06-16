import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import { ProviderTitle } from "./SharedComponent";
import config from "../../../config/config";

const Container = styled(Grid)`
  width: 1400px;
  margin: 20px auto 175px auto;
`;

const ProviderContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 20px;
`;
const ProviderIMG = styled.div`
  background: url("${process.env.PUBLIC_URL}/assets/images/provider/${({
      alternate,
    }) => {
      return alternate && "alternate/";
    }}${(props) => props.provider}.png")
    no-repeat center;
  background-size: contain;
  width: 100%;
  height: 66px;
`;

const Background = styled.div``;

const FifthSection = (props) => {
  return (
    <>
      <ProviderTitle title={i18n.t("t10.home.section4.title")} />
      <Container>
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
                <Background>
                  <ProviderIMG
                    alternate={config.features.UseAlternateLogo}
                    key={index}
                    provider={item.abbreviation.toLowerCase()}
                    title={item.name}
                  ></ProviderIMG>
                </Background>
              );
            })}
        </ProviderContainer>
      </Container>
    </>
  );
};

export default FifthSection;
