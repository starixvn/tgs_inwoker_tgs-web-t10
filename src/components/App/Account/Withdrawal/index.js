import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Redirect } from "react-router";
import IconWithdrawRedPNG from "../../../../assets/images/icon-withdraw.png";
import { withRouter } from "react-router-dom";
import Loading from "../../Loading";
import NameVerification from "../../Share/NameVerification";
// import PassSetting from "./PassSetting";

import AddCard from "./AddCard";
import AddCardSuccess from "./AddCardSuccess";
import CardManage from "./CardManage";
import Main from "./Main";
import Success from "./Success";
import config from "../../../../config/config";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";

import { walletAction } from "../../../../api-services/actions/walletAction";
import { WalletService } from "../../../../api-services/services/WalletService";
import { RESET_WALLETRESULT } from "../../../../api-services/constant/actionType";
import { withSnackbar } from "notistack";
import i18n from "../../../../utils/i18n";
import Disabled from "./Disabled";
import PopupAnnouncement from "../../Home/PopupAnnouncement";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box

  width: 100%;
  min-height: 611px;

`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 24px;

  background: url(${IconWithdrawRedPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const InnerWrap = styled.div`
  width: 935px;
  min-height: 532px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
  border-radius: 10px;
`;

class Withdrawal extends Component {
  state = {
    loading: false,
    bankCardList: [],
    defaultCard: 0,
    addCard: {
      number: "",
      password: "",
    },
    isAddCardSuccess: false,
    displayView: 1,
    showMessagebox: false,
    messageboxText: "",
    withdrawalInfo: {
      bonus_limit_list: [],
    },
    minWithdrawLimit: 0,
    enableAddCard: false,
    openAnnouncement: false,
  };

  urlParams = new URLSearchParams(this.props.location.search);
  async componentDidMount() {
    this.props.getWithdrawalChannel();
    WalletService.GetMinWithdrawLimit().then((e) => {
      if (e.IsSuccess) {
        this.setState({
          ...this.state,
          minWithdrawLimit: e.data,
        });
      }
    });
    if (this.props.wallet.bankCardList.length === 0)
      this.props.getBankCardList();

    if (this.urlParams.has("do")) {
      const value = this.urlParams.get("do");
      if (value === "addCard") {
        this.setState({
          ...this.state,
          enableAddCard: true,
        });
      }
    }
    this.countDownInterval = setInterval(() => {
      this.props.getWithdrawalChannel(); // call api every 30 min
    }, 30 * 60 * 1000);
  }

  componentDidUpdate(preProps) {
    if (
      preProps.wallet.deleteBankCardResult !==
        this.props.wallet.deleteBankCardResult &&
      this.props.wallet.deleteBankCardResult !== null
    ) {
      if (this.props.wallet.deleteBankCardResult.IsSuccess) {
        this.props.getBankCardList();
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(
            this.props.wallet.deleteBankCardResult.info
          ),
          {
            variant: "error",
          }
        );
      }
      this.props.resetResult();
    }
    if (
      preProps.wallet.addBankCardResult !==
        this.props.wallet.addBankCardResult &&
      this.props.wallet.addBankCardResult !== null
    ) {
      if (this.props.wallet.addBankCardResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBankCardList();
        this.setState({
          ...this.state,
          loading: false,
          isAddCardSuccess: true,
        });
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(
            this.props.wallet.addBankCardResult.info
          ),
          {
            variant: "error",
          }
        );
      }
    }

    if (
      preProps.wallet.withdrawalResult !== this.props.wallet.withdrawalResult &&
      this.props.wallet.withdrawalResult !== null
    ) {
      if (this.props.wallet.withdrawalResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.setState({ ...this.state, displayView: 4 });
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(this.props.wallet.withdrawalResult.info),
          {
            variant: "error",
          }
        );
        // if (this.props.wallet.withdrawalResult.code === 207) {
        //   this.props.enqueueSnackbar(i18n.t("common.msgRequiredTurnover"), {
        //     variant: "error",
        //   });
        // } else if (this.props.wallet.withdrawalResult.code === 901) {
        //   this.props.enqueueSnackbar(
        //     i18n.t("common.msgInvalidWithdrawalPassword"),
        //     {
        //       variant: "error",
        //     }
        //   );
        // } else {
        //   this.props.enqueueSnackbar(this.props.wallet.withdrawalResult.info, {
        //     variant: "error",
        //   });
        // }
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.countDownInterval);
  }

  handleAddCardNextClick = (channelid, bankType, detail) => {
    //clear url params
    window.history.pushState({}, null, "withdrawal");
    this.props.addBankCard(channelid, bankType, detail);
  };

  // handleBindCardClick = (number, password) => {
  //   this.setState({ ...this.state, loading: true });
  //   WalletService.AddBankCard(
  //     this.props.token,
  //     this.props.account.info.member_name,
  //     number,
  //     1,
  //     password
  //   ).then(response => {
  //     if (response.IsSuccess) {
  //       this.GetBankCardList();
  //       this.setState({
  //         ...this.state,
  //         loading: false,
  //         isAddCardSuccess: true
  //       });
  //     } else {
  //       this.props.enqueueSnackbar(response.msg, {
  //         variant: "error"
  //       });
  //       this.setState({
  //         ...this.state,
  //         loading: false
  //         // showMessagebox: true,
  //         // messageboxText: response.msg
  //       });
  //     }
  //   });
  // };
  handleBindCardClick = () => {
    this.setState({ ...this.state, isAddCardSuccess: false, displayView: 2 });
  };
  handleGoWithdrawClick = () => {
    this.setState({ ...this.state, isAddCardSuccess: false, displayView: 1 });
  };
  handleCSClick = () => {
    this.props.onhandleCSClick(
      this.props.account.info.member_id,
      this.props.account.info.member_name,
      ""
    );
  };
  handleManageCardClick = () => {
    if (
      !(
        config.features.AddCard_NotAllowedEditDelete ||
        config.features.ChangesNotAllowed ||
        this.props.wallet.bankCardList.length >=
          config.features.AddCard_MaximumCardAllowed
      )
    ) {
      this.setState({ ...this.state, displayView: 3 });
    } else {
      this.setState({ ...this.state, openAnnouncement: true });
    }
  };
  handleAddCardClick = () => {
    if (
      !(
        config.features.AddCard_NotAllowedEditDelete ||
        config.features.ChangesNotAllowed ||
        this.props.wallet.bankCardList.length >=
          config.features.AddCard_MaximumCardAllowed
      )
    ) {
      this.setState({ ...this.state, displayView: 2 });
    } else {
      this.props.enqueueSnackbar(i18n.t("card.toEdit"), {
        variant: "error",
      });
    }
  };
  handleCardManageBack = () => {
    this.setState({ ...this.state, displayView: 1 });
  };
  handleAddCardBack = () => {
    this.setState({ ...this.state, displayView: 3 });
  };
  handleDeleteCardClick = (id) => {
    if (
      config.features.ChangesNotAllowed ||
      config.features.AddCard_NotAllowedEditDelete
    ) {
      this.props.enqueueSnackbar(i18n.t("card.toEdit"), {
        variant: "error",
      });
    } else {
      this.props.deleteBankCard(id);
    }

    // this.setState({ ...this.state, loading: true });
    // WalletService.DeleteBankCard(this.props.token, id).then((response) => {
    //   if (response.IsSuccess) {
    //     this.GetBankCardList();
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //     });
    //   } else {
    //     this.props.enqueueSnackbar(response.msg, {
    //       variant: "error",
    //     });
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //       // showMessagebox: true,
    //       // messageboxText: response.msg
    //     });
    //   }
    // });
  };
  handleReportClick = () => {
    this.props.onhandleClickTab("report");
  };
  handleSuccessConfirmClick = () => {
    this.setState({ ...this.state, displayView: 1 });
  };
  handleWithdrawalClick = (bankid, amount, password) => {
    const formatedamount = amount.toString().replace(/,/g, "");
    if (config.features.Withdrawal_HundredDigit) {
      if (!/^[1-9][0-9]{0,17}00$/.test(formatedamount)) {
        this.props.enqueueSnackbar(i18n.t("withdrawal.msgMustHundred"), {
          variant: "warning",
        });
        return;
      }
    }
    if (bankid == 0) {
      this.props.enqueueSnackbar(i18n.t("withdrawal.msgEnterBank"), {
        variant: "warning",
      });
      return;
    }
    if (parseFloat(formatedamount) < 0) {
      this.props.enqueueSnackbar(i18n.t("withdrawal.msgInvalidAmt"), {
        variant: "warning",
      });
      return;
    }

    if (
      parseFloat(formatedamount) > parseFloat(this.props.wallet.mainBalance)
    ) {
      this.props.enqueueSnackbar(i18n.t("withdrawal.msgInsufficient"), {
        variant: "warning",
      });
      return;
    }
    // if (password.length <= 0) {
    //   this.props.enqueueSnackbar(i18n.t("withdrawal.msgEnterWithdrawalPass"), {
    //     variant: "warning",
    //   });
    //   return;
    // }
    this.props.doWithdraw(formatedamount, password, bankid);
    // this.setState({ ...this.state, loading: true });
    // const result = WalletService.Withdrawal(
    //   this.props.token,
    //   bankid,
    //   formatedamount
    // );

    // result.then((response) => {
    //   if (response.IsSuccess) {
    //     // this.GetBankCardList();
    //     this.props.enqueueSnackbar(response.msg, {
    //       variant: "success",
    //     });
    //     this.GetWithdrawalDetails();
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //     });
    //   } else {
    //     this.props.enqueueSnackbar(response.msg, {
    //       variant: "error",
    //     });
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //       // showMessagebox: true,
    //       // messageboxText: response.msg
    //     });
    //   }
    // });
    //  return result;
  };
  render() {
    return (
      <Container>
        <PopupAnnouncement
          open={this.state.openAnnouncement}
          onClose={() => {
            this.setState({ ...this.state, openAnnouncement: false });
          }}
          text={i18n.t("card.toEdit")}
        ></PopupAnnouncement>
        <Title>
          <TitleIcon></TitleIcon>
          {i18n.t("withdrawal.title")}
        </Title>
        <InnerWrap>
          {(() => {
            if (this.props.account.loading === false) {
              if (this.props.account.info.member_name === "") {
                return (
                  <NameVerification token={this.props.token}></NameVerification>
                );
              } 
              // else if (
              //   (this.props.account.info.member_email === null ||
              //     this.props.account.info.member_email === "") &&
              //   config.features.EmailVerification &&
              //   !config.features.Withdrawal_Ignore_Verification
              // ) {
              //   return (
              //     <Redirect
              //       to={`/${i18n.language}/account/profile/member_email`}
              //     ></Redirect>
              //   );
              // } 
              else {
                if (
                  config.features.AddCard_NotAllowedEditDelete &&
                  !this.state.enableAddCard &&
                  this.props.wallet.bankCardList != null &&
                  this.props.wallet.bankCardList.length === 0
                ) {
                  return <Disabled handleCSClick={this.handleCSClick} />;
                } else {
                  if (
                    this.props.wallet.bankCardList != null &&
                    this.props.wallet.bankCardList.length === 0
                  ) {
                    return (
                      <AddCard
                        name={this.props.account.info.member_name}
                        onhandleNextClick={this.handleAddCardNextClick}
                        withdrawalList={this.props.wallet.withdrawalList}
                        showBack={false}
                        containCard={
                          this.props.wallet.bankCardList != null &&
                          this.props.wallet.bankCardList.length === 0
                        }
                      ></AddCard>
                    );
                  } else {
                    if (this.state.isAddCardSuccess === true) {
                      return (
                        <AddCardSuccess
                          onhandleBindCardClick={this.handleBindCardClick}
                          onhandleGoWithdrawClick={this.handleGoWithdrawClick}
                          onhandleCSClick={this.handleCSClick}
                          bankCardList={this.props.wallet.bankCardList}
                        ></AddCardSuccess>
                      );
                    } else {
                      switch (this.state.displayView) {
                        case 1:
                          return (
                            <Main
                              defaultCard={this.state.defaultCard}
                              cardList={this.props.wallet.bankCardList}
                              withdrawalInfo={this.state.withdrawalInfo}
                              onhandleManageCardClick={
                                this.handleManageCardClick
                              }
                              onhandleWithdrawalClick={
                                this.handleWithdrawalClick
                              }
                              account={this.props.account}
                              withdrawalMinLimit={
                                this.props.wallet.withdrawalMinLimit
                              }
                              withdrawalMaxLimit={
                                this.props.wallet.withdrawalMaxLimit
                              }
                              minWithdrawLimit={this.state.minWithdrawLimit}
                            ></Main>
                          );
                        case 2:
                          return (
                            <AddCard
                              name={this.props.account.info.member_name}
                              onhandleNextClick={this.handleAddCardNextClick}
                              onhandleBackClick={this.handleAddCardBack}
                              withdrawalList={this.props.wallet.withdrawalList}
                              showBack={true}
                              containCard={
                                this.props.wallet.bankCardList != null &&
                                this.props.wallet.bankCardList.length === 0
                              }
                            ></AddCard>
                          );
                        case 3:
                          return (
                            <CardManage
                              bankCardList={this.props.wallet.bankCardList}
                              onhandleAddCardClick={this.handleAddCardClick}
                              onhandleBackClick={this.handleCardManageBack}
                              onhandleDeleteCardClick={
                                this.handleDeleteCardClick
                              }
                              onhandleReportClick={this.handleReportClick}
                            ></CardManage>
                          );
                        case 4:
                          return (
                            <Success
                              handleConfirmClick={
                                this.handleSuccessConfirmClick
                              }
                              verified={
                                this.props.account.info.check_pass_account
                              }
                            ></Success>
                          );
                        default:
                          return null;
                      }
                    }
                  }
                }
              }
            }
          })()}

          <Loading show={this.state.loading}></Loading>
        </InnerWrap>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    account: state.account,

    game: state.game,
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    deleteBankCard: (id) => dispatch(walletAction.deleteBankCard(id)),
    addBankCard: (channelid, bankType, detail) =>
      dispatch(walletAction.addBankCard(channelid, bankType, detail)),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    doWithdraw: (amount, password, user_account_id) =>
      dispatch(walletAction.doWithdraw(amount, user_account_id, password)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Withdrawal))
);
