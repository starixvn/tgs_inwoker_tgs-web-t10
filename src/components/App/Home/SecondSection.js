import React from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import { ProviderTitle } from "./SharedComponent";
import { utility } from "../../../utils/utility";
import config from "../../../config/config";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  height: 800px;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcHomePage/" +
    (utility.assetsSwitcher
      ? utility.assetsSwitcher(config.features.UseBrandAssets)
      : "") +
    "section2-gameapp.png"})
    no-repeat center;
  background-size: contain;
  width: 80%;
  position: relative;
`;

const TheFloatContent = styled.div`
  position: absolute;
  right: 150px;
  bottom: 20%;
  width: 400px;
  height: 350px;

  border-radius: 12px;
  padding: 12px;
`;

const SecondSection = (props) => {
  return (
    <Container>
      <ProviderTitle title={i18n.t("t10.home.section2.title")} />
      <Content>
        <TheFloatContent></TheFloatContent>
      </Content>
    </Container>
  );
};

export default SecondSection;
