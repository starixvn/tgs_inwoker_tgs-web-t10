import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Textbox from "../Share/Textbox";
import TextboxWithButton from "../Share/TextboxWithButton";
import BaseProfile from "./BaseProfile";
import { accountAction } from "../../../api-services/actions/accountAction";
import { AccountService } from "../../../api-services/services/AccountService";
import styled from "styled-components";
import BottomNote from "../Share/BottomNote";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
const Container = styled.div`
  margin: 0 auto;

  width: 635px;
  height: 80px;
  border-radius: 6px;

  background-color: #ffffff;
`;
const SelectContainer = styled.select`
  width: 100%;
  height: 100%;
  border: none;
  color: #000;
  font-size: 30px;
  background-color: #fff;
`;
const CustomText = styled.div`
  width: 700px;
  height: 170px;
  padding: 20px 20px 0 20px;
  margin: 20px auto;
`;
const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) => theme.secondary};
`;
const CustomInput = styled.input`
  height: 50px;
  width: 405px;
  font-size: 28px;
  margin-top: 18px;
  border-radius: 16px;
  padding: 16px 32px;
  font-weight: 500;
  border: 0;
  display: flex;
  flex: 1;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 28px;
  }
  &:disabled {
    background: #fff;

    opacity: 1;
  }
`;
class Phone extends BaseProfile {
  state = {
    countdownToken: 0,
    areacode: config.features.PhonePrefix,
    phone: "",
    code: "",
    isNew: false,
    isConfigured: false,
    securityKey: "",
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.check_pass_phone) isConfigured = true;
    this.setState({
      ...this.state,
      phone: isConfigured ? this.props.account.info.member_phone : "",
      code: "",
      isNew: !this.props.account.info.check_pass_phone,
      isConfigured: isConfigured,
    });
  }

  handleChangePhone = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };

  handleChangeCode = (e) => {
    this.setState({ ...this.state, code: e.target.value });
    this.onTextChanged();
  };
  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    } else {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
    }
  };
  handleGetCodeClick = (e) => {
    if (this.state.countdownToken > 0) return;
    if (!this.state.phone)
      return this.showErrorMessage(i18n.t("common.msgEnterPhone"));
    if (
      this.state.phone.length < 8 ||
      this.state.phone.length > (config.features.MAX_PHONE_LENGTH || 10)
    ) {
      this.props.alert("", i18n.t("common.noReachMin"));
      return;
    }
    this.showLoading(true);
    AccountService.VerifyPhone(this.state.phone, this.state.areacode)
      .then((response) => {
        if (response.IsSuccess) {
          this.setState({
            ...this.state,
            countdownToken: 60,
            securityKey: response.data,
          });
          this.showInfoMessage(i18n.t("common.msgTokenSent"));
          setTimeout(() => {
            this.checkCountdownToken();
          }, 1000);
        } else {
          this.showErrorMessage(response.info);
        }
        this.showLoading(false);
      })
      .catch((err) => {
        this.showErrorMessage(err);

        this.showLoading(false);
      });
  };

  isDisableButton = () => {
    const code = this.state.code;
    const phone = this.state.phone;
    return !(code && phone);
  };
  showErrorMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "error"
    // });
  };
  showInfoMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "info"
    // });
  };
  handleSubmitClicked = () => {
    this.showLoading(true);
    AccountService.UpdatePhone(this.state.securityKey, this.state.code)
      .then((response) => {
        if (response.IsSuccess) {
          this.props.getAccountInfo().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                code: "",
                securityKey: "",
                countdownToken: 0,
                isNew: false,
                isConfigured: true,
              });
            }
            this.showLoading(false);
          });
        } else {
          this.showErrorMessage(response.info);
          this.showLoading(false);
        }
      })
      .catch((err) => {
        this.showErrorMessage(err);
        this.showLoading(false);
      });
  };

  render() {
    return this.setupContent(
      i18n.t("common.phoneNumber"),
      <React.Fragment>
        <CustomText>
          <CustomLabel>{i18n.t("common.phoneNumber")}</CustomLabel>
          <Container
            style={{
              margin: "18px 5px 0 0",
              width: "180px",
              float: "left",
              padding: "10px",
            }}
          >
            <SelectContainer
              value={this.state.areacode}
              onChange={(e) => {
                this.setState({ ...this.state, areacode: e.target.value });
              }}
              disabled={
                this.state.isConfigured ? this.state.isConfigured : false
              }
            >
              <option value={config.features.PhonePrefix}>
                {config.features.PhonePrefix}
              </option>
            </SelectContainer>
          </Container>
          <CustomInput
            style={this.props.color ? { color: this.props.color } : {}}
            type={"text"}
            value={this.state.phone}
            placeholder={i18n.t("common.msgEnterPhone")}
            disabled={this.state.isConfigured ? this.state.isConfigured : false}
            onChange={this.handleChangePhone}
            maxLength={config.features.MAX_PHONE_LENGTH || 10}
          ></CustomInput>
        </CustomText>

        {(() => {
          if (!this.state.isConfigured) {
            return (
              <TextboxWithButton
                buttonlabel={
                  this.state.countdownToken <= 0
                    ? i18n.t("common.msgSendToken")
                    : i18n.t("common.btnTokenResendLabel") +
                      "(" +
                      this.state.countdownToken +
                      "s)"
                }
                style={{ margin: "20px auto 20px auto" }}
                value={this.state.code}
                onChange={this.handleChangeCode}
                placeholder={i18n.t("common.msgEnterPhoneCode")}
                label={i18n.t("common.token")}
                onClick={this.handleGetCodeClick}
              ></TextboxWithButton>
            );
          }
        })()}
      </React.Fragment>,
      this.state.isConfigured
        ? i18n.t("common.configured")
        : i18n.t("common.complete"),
      (() => {
        if (this.state.isConfigured) {
          return (
            <BottomNote
              text1={i18n.t("profile.phone.toEdit")}
              link={
                config.features.ChangesNotAllowed ||
                config.features.Profile_ExistingDetails_ViewOnly
                  ? "../chat"
                  : "./changephone"
              }
              text2={i18n.t(
                config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly
                  ? "common.customerService"
                  : "profile.phone.here"
              )}
            ></BottomNote>
          );
        }
      })()
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Phone));
