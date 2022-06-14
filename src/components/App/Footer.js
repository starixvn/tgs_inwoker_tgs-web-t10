import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import config from "../../config/config";
import i18n from "../../utils/i18n";

const Container = styled.div`
  width: 100%;
  padding: 32px 0;
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
  background: #262626;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const BottomContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
  color: #fff;
`;
const CopyRightLine1 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const CopyRightLine2 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const Version = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;

function Footer(props) {
  return (
    <Container hide={props.hide}>
      <BottomContainer>
        <CopyRightLine1>{i18n.t("web.footer.copyright")}</CopyRightLine1>
        <CopyRightLine2>
          {i18n
            .t("web.footer.copyrightLine2")
            .replace(/{brand}/g, config.brandName)}
        </CopyRightLine2>
        <Version>Version {process.env.REACT_APP_VERSION}</Version>
      </BottomContainer>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};
export default connect(mapStateToProps, null)(withRouter(Footer));
