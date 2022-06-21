import React from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  height: 800px;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/pcHomePage/section2-gameapp.png"})
    no-repeat center;
  background-size: contain;
  width: 80%;
  position: relative;
`;

const ProviderTitle = styled.div`
  color: #107f9d;
  font-size: 2.5em;

  height: 125px;
`;

const TheFloatContent = styled.div`
  position: absolute;
  right: 150px;
  bottom: 20%;
  width: 400px;
  height: 350px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
`;

const SecondSection = (props) => {
  return (
    <Container>
      <ProviderTitle>{i18n.t("web.footer.footerDescTitle")}</ProviderTitle>
      <Content>
        <TheFloatContent>content placeholder</TheFloatContent>
      </Content>
    </Container>
  );
};

export default SecondSection;
