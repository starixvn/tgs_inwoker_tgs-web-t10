import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../../../Share/TextField";
import IconInputReceivePNG from "../../../../../../assets/images/icon-input-receive.png";
import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";
import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";
const Container = styled.div``;
const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  font-size: 15px;
  text-align: center;
  margin-top: 90px;
  padding: 0 30px;
  color: ${({ theme }) => theme.secondary};
`;
const LabelLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;

function Approved(props) {
  return (
    <Container>
      <CustomTextField
        placeholder={
          config.features.Profile_CustomIdentityPageTranslation
            ? i18n.t("piso.profile.enterFullName")
            : i18n.t("profile.nameVerify.msgPlsEnterName")
        }
        adornment={IconInputReceivePNG}
        defaultValue={props.account.info.member_name}
        readOnly={true}
        maxLength={256}
      ></CustomTextField>

      {
        //  <Content>
        //  {i18n.t("profile.nameVerify.toEdit")}
        //  <LabelLink
        //    onClick={() =>
        //      props.handleCSClick(
        //        props.account.info.member_username,
        //        props.account.info.member_username
        //      )
        //    }
        //  >
        //    {i18n.t("common.customerService")}
        //  </LabelLink>
        //</Content>
      }
    </Container>
  );
}

export default connect(null, null)(withSnackbar(Approved));
