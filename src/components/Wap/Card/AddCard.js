import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { walletAction } from "../../../api-services/actions/walletAction";
import { accountAction } from "../../../api-services/actions/accountAction";
import { RESET_WALLETRESULT } from "../../../api-services/constant/actionType";
import Header from "../../Wap/Share/Header";
import Textbox from "../../Wap/Share/Textbox";
import Button from "../../Wap/Share/Button";
import MessageDialog from "../../Wap/Share/MessageDialog";
import Loading from "../../Wap/Share/Loading";
import Modal from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Common from "../../../utils/Common";
const Container = styled.div`
  width: 100%;
`;

const BalanceLabel = styled.div`
  font-size: 36px;
  background: ${({ theme }) => theme.primary};
  text-align: center;
  color: #ffffff;
  padding: 15px;
`;

const SubTitle = styled.div`
  font-size: 34px;
  font-weight: 550;
  margin: 40px 0 0 50px;
  color: ${({ theme }) => theme.secondary};
`;

const BottomInfo = styled.div`
  font-size: 22px;
  font-weight: 600;
  height: 30px;
  color: #c40511;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/icon-red-info.png`})
    no-repeat left center;
  padding-left: 40px;
  display: table;
  margin: 0 auto;
`;
const StyledModalBank = withStyles((theme) => ({
  paper: {
    color: "#666666",
    padding: "0 30px",
    width: "750px",
    maxWidth: "750px",
    margin: 0,
    display: "block",
    position: "absolute",
    bottom: 0,
    height: "calc(100% - 580px)",
  },
}))(Modal);

const StyledListItem = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    padding: "10px",
  },
}))(ListItem);
const StyledListItemText = withStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: "50px",
    "& .MuiTypography-root": {
      fontSize: "28px",
    },
  },
}))(ListItemText);

class AddCard extends Component {
  state = {
    number: "",
    bankName: "",
    bankAccountName: "",
    channelOpen: false,
    bankTypeOpen: false,
    bankNameOpen: false,
    selectedChannelIndex: 0,
    selectedBankTypeIndex: 0,
    channelList: [],
    loading: false,
    showDialog: false,
    dialogMessage: "",
    disabledBankNameInput: false,

    name: "",
    phone: "",
  };
  componentDidMount() {
    if (this.props.wallet.withdrawalList.length === 0)
      this.props.getWithdrawalChannel();
    else this.formatChannelList();
  }
  componentDidUpdate(preProps, preState) {
    if (
      preProps.wallet.addBankCardResult !==
        this.props.wallet.addBankCardResult &&
      this.props.wallet.addBankCardResult !== null
    ) {
      if (this.props.wallet.addBankCardResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBankCardList();
        this.props.appHistory.goBack();
      } else {
        this.setState({
          ...this.state,
          showDialog: true,
          dialogMessage: this.props.wallet.addBankCardResult.info,
        });
      }
    }
    if (
      preProps.wallet.withdrawalList.length !==
      this.props.wallet.withdrawalList.length
    ) {
      this.formatChannelList();
    }
    if (preState.selectedBankTypeIndex !== this.state.selectedBankTypeIndex) {
      this.formatChannelList();
    }
  }
  formatChannelList = () => {
    var channel = [];
    if (this.props.wallet.withdrawalList.length > 0) {
      var channelList = this.props.wallet.withdrawalList[
        this.state.selectedBankTypeIndex
      ].channel;
      var addedChannel = [];
      if (this.props.wallet.withdrawalList.length > 0) {
        for (var i = 0; i < channelList.length; i++) {
          if (addedChannel.indexOf(channelList[i].channelid) < 0) {
            addedChannel.push(channelList[i].channelid);
            channel.push(channelList[i]);
          }
        }
      }
    }
    var disableInput = false;
    var bankName = "";
    if (channel.length > 0) {
      if (
        channel[this.state.selectedChannelIndex].channelcode !== "CustomBank"
      ) {
        disableInput = true;
        bankName = channel[this.state.selectedChannelIndex].channelcode;
      }
    }
    this.setState({
      ...this.state,
      channelList: channel,
      bankName: bankName,
      disableBankNameInput: disableInput,
    });
    return channel;
  };
  handleCloseDialog() {
    this.setState({
      ...this.state,
      showDialog: false,
      dialogMessage: "",
    });
  }
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleNextClick = () => {
    var selected = this.props.wallet.withdrawalList[
      this.state.selectedBankTypeIndex
    ];
    var selectedChannel = this.state.channelList[
      this.state.selectedChannelIndex
    ];
    var detail = {};

    if (selected.banktype === "Bank") {
      if (this.state.bankAccountName === "") {
        this.props.alert(
          "",
          config.features.AddCard_DisplayFPS
            ? i18n.t("hk28.card.addCard.msgEnterBankAccountName")
            : i18n.t("card.addCard.msgEnterBankAccountName")
        );
        return;
      }

      if (this.state.number === "") {
        this.props.alert(
          "",
          config.features.AddCard_DisplayFPS
            ? i18n.t("hk28.msgEnterWithdrawalNumber")
            : i18n.t("common.msgEnterWithdrawalNumber")
        );
        return;
      }

      detail = {
        bankAccount: this.state.number,
        bankName: this.state.bankName,
        name: this.state.bankAccountName,
        bankBranch: this.state.bankBranch,
      };
    } else if (
      selected.banktype === "ThirdParty" ||
      selected.banktype === "FPS"
    ) {
      if (this.state.phone.length < 8 || this.state.phone.length > 10) {
        this.props.alert("", i18n.t("common.noReachMin"));
        return;
      }
      if (this.state.name === "") {
        this.props.alert("", i18n.t("profile.nameVerify.msgPlsEnterName"));
        return;
      }

      detail = {
        username: this.state.name,
        phone: this.state.phone,
      };
    } else {
      detail = {
        address: this.state.number,
      };
    }
    this.props.addBankCard(
      selectedChannel.channelid,
      selected.banktype,
      detail
    );
  };

  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };
  handleBankNameChange = (e) => {
    this.setState({ ...this.state, bankName: e.target.value });
  };
  handleBankAccountNameChange = (e) => {
    this.setState({ ...this.state, bankAccountName: e.target.value });
  };

  handleBankBranchChange = (e) => {
    this.setState({ ...this.state, bankBranch: e.target.value });
  };

  handleBankTypeClick = (index) => {
    this.setState({
      ...this.state,
      selectedBankTypeIndex: index,
      selectedChannelIndex: 0,
      bankTypeOpen: false,
    });
  };
  handleChannelClick = (index) => {
    var disableInput = false;
    var bankName = "";
    if (this.state.channelList[index].channelcode !== "CustomBank") {
      disableInput = true;
      bankName = this.state.channelList[index].channelcode;
    }
    this.setState({
      ...this.state,
      selectedChannelIndex: index,
      bankName: bankName,
      disableBankNameInput: disableInput,
      channelOpen: false,
    });
  };

  handleBankNameClick = (name) => {
    this.setState({
      ...this.state,
      bankName: name,
      bankNameOpen: false,
    });
  };
  render() {
    const bankList = [
      "กสิกรไทย (Kasikorn Bank- KKR)",
      "ไทยพาณิชย์ (Siam Commercial Bank - SCB)",
      "กรุงไทย (KrungThai Bank - KTB)",
      "กรุงเทพ (Bankok Bank - BBL)",
      "ออมสิน (Government Savings Bank - GSB)",
      "ทหารไทยธนาชาต (TMBThanachart Bank - TTB)",
      "กรุงศรี (Bank of Ayudhya - KrungSri)",
      "ธ.ก.ส (Bank for Agriculture and Agricultural Cooperatives - BAAC)",
      "ยูโอบี (United Overseas Bank - UOB)",
      "ซีไอเอ็มบีไทย (CIMB THAI - CIMB)",
      "เกียรตินาคินภทัร (Kiatnakin Phatra Bank - KKP)",
      "อาคารสงเคราะห์ (Government Housing Bank - GH)",
    ];

    const isEwallet =
      this.state.channelList.length &&
      this.state.channelList[this.state.selectedChannelIndex].channelcode ===
        "E-wallet";

    const eWalletCustom = isEwallet && config.features.AddCard_EWalletCustoms;

    return (
      <Container>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("card.addCard.title")}
          position={"sticky"}
          backgroundColor={"transparent"}
        ></Header>
        <BalanceLabel>
          {Common.formatNumberWithThousand(
            this.props.wallet.mainBalance +
              this.props.game.providerList
                .filter(
                  (item) => item.status === 0 && item.transferwallet === true
                )
                .reduce((a, v) => (a = a + v.balance), 0)
          )}
        </BalanceLabel>

        <SubTitle>{i18n.t("card.addCard.title")}</SubTitle>
        {!config.features.AddCard_HideCertainField && (
          <Textbox
            style={{ margin: "20px auto 20px auto" }}
            value={
              this.props.wallet.withdrawalList.length > 0
                ? this.props.wallet.withdrawalList[
                    this.state.selectedBankTypeIndex
                  ].banktype
                : ""
            }
            onClick={() => this.setState({ ...this.state, bankTypeOpen: true })}
            type={"text"}
            label={i18n.t("common.withdrawalBankType")}
            disabled={true}
          ></Textbox>
        )}

        {!(config.features.AddCard_HideChannel || eWalletCustom) && (
          <Textbox
            style={{ margin: "20px auto 20px auto" }}
            value={
              this.state.channelList.length > 0
                ? i18n.t(
                    this.state.channelList[this.state.selectedChannelIndex]
                      .channelname
                  )
                : ""
            }
            onClick={() => this.setState({ ...this.state, channelOpen: true })}
            type={"text"}
            label={i18n.t("common.withdrawalChannel")}
            disabled={true}
          ></Textbox>
        )}

        {(() => {
          if (
            this.props.wallet.withdrawalList.length > 0 &&
            this.props.wallet.withdrawalList[this.state.selectedBankTypeIndex]
              .banktype === "Bank"
          ) {
            return (
              <React.Fragment>
                {!(
                  config.features.AddCard_HideCertainField || eWalletCustom
                ) && (
                  <>
                    <Textbox
                      style={{ margin: "20px auto 20px auto" }}
                      value={this.state.bankName}
                      onChange={this.handleBankNameChange}
                      type={"text"}
                      disabled={
                        config.features.AddCard_BankDropdown ||
                        this.state.disabledBankNameInput
                      }
                      onClick={() =>
                        this.setState({ ...this.state, bankNameOpen: true })
                      }
                      placeholder={
                        config.features.AddCard_DisplayFPS
                          ? i18n.t("hk28.card.addCard.msgEnterBankName")
                          : i18n.t("card.addCard.msgEnterBankName")
                      }
                      label={
                        config.features.AddCard_DisplayFPS
                          ? i18n.t("hk28.card.addCard.BankName")
                          : i18n.t("card.addCard.BankName")
                      }
                      maxLength={255}
                    ></Textbox>
                    {(() => {
                      if (config.features.AddCard_BankBranch) {
                        return (
                          <Textbox
                            style={{ margin: "20px auto 20px auto" }}
                            value={this.state.bankBranch}
                            onChange={this.handleBankBranchChange}
                            type={"text"}
                            placeholder={i18n.t(
                              "card.addCard.branchPlaceHolder"
                            )}
                            label={i18n.t("card.addCard.branch")}
                            maxLength={255}
                          ></Textbox>
                        );
                      }
                    })()}
                  </>
                )}

                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  value={this.state.bankAccountName}
                  onChange={this.handleBankAccountNameChange}
                  type={"text"}
                  placeholder={
                    eWalletCustom
                      ? i18n.t("card.addCard.eWalletAccount")
                      : config.features.AddCard_DisplayFPS
                      ? i18n.t("hk28.card.addCard.BankAccountName")
                      : i18n.t("card.addCard.BankAccountName")
                  }
                  label={
                    eWalletCustom
                      ? i18n.t("card.addCard.eWalletAccount")
                      : config.features.AddCard_DisplayFPS
                      ? i18n.t("hk28.card.addCard.BankAccountName")
                      : i18n.t("card.addCard.BankAccountName")
                  }
                  maxLength={255}
                ></Textbox>
              </React.Fragment>
            );
          }
        })()}

        {this.props.wallet.withdrawalList.length > 0 &&
        (this.props.wallet.withdrawalList[this.state.selectedBankTypeIndex]
          .banktype === "ThirdParty" ||
          this.props.wallet.withdrawalList[this.state.selectedBankTypeIndex]
            .banktype === "FPS") ? (
          <div>
            <Textbox
              style={{ margin: "20px auto 20px auto" }}
              value={this.state.name}
              onChange={(e) => {
                let value = e.target.value;
                this.setState({
                  ...this.state,
                  name: value,
                });
              }}
              type={"text"}
              placeholder={
                config.features.AddCard_InputAddFPS
                  ? i18n.t("custom.addcard.msgPlsEnterName")
                  : i18n.t("profile.nameVerify.msgPlsEnterName")
              }
              label={
                config.features.AddCard_InputAddFPS
                  ? i18n.t("custom.addcard.name")
                  : i18n.t("profile.nameVerify.title")
              }
            ></Textbox>
            <Textbox
              style={{ margin: "20px auto 20px auto" }}
              value={this.state.phone}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/[^0-9]/gi, "");
                this.setState({
                  ...this.state,
                  phone: value,
                });
              }}
              type={"text"}
              placeholder={
                config.features.AddCard_InputAddFPS
                  ? i18n.t("custom.addcard.msgEnterPhone")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("bet28.msgEnterPhone")
                  : i18n.t("common.msgEnterPhone")
              }
              label={
                config.features.AddCard_InputAddFPS
                  ? i18n.t("custom.addcard.phoneNumber")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("bet28.phoneNumber")
                  : i18n.t("common.phoneNumber")
              }
            ></Textbox>
            <BottomInfo>{i18n.t("card.addCard.desc")}</BottomInfo>
            <Button
              style={{ margin: "40px auto 0 auto" }}
              label={i18n.t("common.confirm")}
              onClick={this.handleNextClick}
              disabled={this.state.name === "" || this.state.phone === ""}
            ></Button>
          </div>
        ) : (
          <div>
            <Textbox
              style={{ margin: "20px auto 20px auto" }}
              value={this.state.number}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/[^A-Za-z0-9]/gi, "");
                this.setState({
                  ...this.state,
                  number: value,
                });
              }}
              type={"text"}
              placeholder={
                eWalletCustom
                  ? i18n.t("card.addCard.msgEnterPhone")
                  : config.features.AddCard_DisplayGCash
                  ? i18n.t("piso.msgEnterWithdrawalNumber")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("hk28.msgEnterWithdrawalNumber")
                  : i18n.t("common.msgEnterWithdrawalNumber")
              }
              label={
                eWalletCustom
                  ? i18n.t("card.addCard.phone")
                  : config.features.AddCard_DisplayGCash
                  ? i18n.t("piso.withdrawalNumber")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("hk28.withdrawalNumber")
                  : i18n.t("common.withdrawalNumber")
              }
            ></Textbox>
            <BottomInfo>{i18n.t("card.addCard.desc")}</BottomInfo>
            <Button
              style={{ margin: "40px auto 0 auto" }}
              label={i18n.t("common.confirm")}
              onClick={this.handleNextClick}
              disabled={(() => {
                if (this.props.wallet.withdrawalList.length <= 0) return true;
                var bankType = this.props.wallet.withdrawalList[
                  this.state.selectedBankTypeIndex
                ].banktype;

                var bankAccountName = this.state.bankAccountName;

                var number = this.state.number;

                if (bankType === "Bank") {
                  if (bankAccountName === "" || number === "") {
                    return true;
                  }
                } else if (bankType === "Crypto") {
                  if (number === "") {
                    return true;
                  }
                }
                return false;
              })()}
            ></Button>
          </div>
        )}

        <StyledModalBank
          onClose={() => this.setState({ ...this.state, bankTypeOpen: false })}
          open={this.state.bankTypeOpen}
        >
          {this.props.wallet.withdrawalList.length > 0 &&
            this.props.wallet.withdrawalList.map((item, index) => {
              return (
                <StyledListItem
                  button
                  key={index}
                  onClick={() => this.handleBankTypeClick(index)}
                >
                  {/* <StyledListItemIcon>
                  <StyledListItemImage src={item.file}></StyledListItemImage>
                </StyledListItemIcon> */}
                  <StyledListItemText
                    primary={item.banktype}
                  ></StyledListItemText>
                </StyledListItem>
              );
            })}
        </StyledModalBank>
        <StyledModalBank
          onClose={() => this.setState({ ...this.state, channelOpen: false })}
          open={this.state.channelOpen}
        >
          {this.state.channelList.map((item, index) => {
            return (
              <StyledListItem
                button
                key={index}
                onClick={() => this.handleChannelClick(index)}
              >
                <StyledListItemText
                  primary={i18n.t(item.channelname)}
                ></StyledListItemText>
              </StyledListItem>
            );
          })}
        </StyledModalBank>
        <StyledModalBank
          onClose={() => this.setState({ ...this.state, bankNameOpen: false })}
          open={config.features.AddCard_BankDropdown && this.state.bankNameOpen}
        >
          {bankList.map((item, index) => {
            return (
              <StyledListItem
                button
                key={index}
                onClick={() => this.handleBankNameClick(item)}
              >
                <StyledListItemText primary={i18n.t(item)}></StyledListItemText>
              </StyledListItem>
            );
          })}
        </StyledModalBank>

        <MessageDialog
          onClose={() => this.handleCloseDialog()}
          open={this.state.showDialog}
          message={this.state.dialogMessage}
          onClick={() => this.handleCloseDialog()}
        ></MessageDialog>
        <Loading
          show={this.state.loading || this.props.wallet.loading}
        ></Loading>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    balance: state.account.info.balance,
    wallet: state.wallet,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    addBankCard: (channelid, bankType, address) =>
      dispatch(walletAction.addBankCard(channelid, bankType, address)),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
