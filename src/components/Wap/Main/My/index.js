import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { accountAction } from "../../../../api-services/actions/accountAction";
import { walletAction } from "../../../../api-services/actions/walletAction";
import CircularProgress from "@material-ui/core/CircularProgress";

import BtnLogout from "../../../Share/ButtonBlankWap";
import Common from "../../../../utils/Common";

import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
const StyledAppBar = withStyles((theme) => ({
  root: {
    display: "block",
    background: "transparent",
    boxShadow: "none",
    //  background:
    //    `linear-gradient(rgba(` +
    //    theme.palette.primary.mainRgb +
    //    `, 0.8), rgba(` +
    //    theme.palette.primary.mainGradientRgb +
    //    `, 0.8)), url(${BgProfilePNG})`,
  },
}))(AppBar);
const Container = styled.div`
  width: 100%;

  min-height: 100vh;
`;
const LevelContainer = styled.div`
  float: right;

  margin: 30px 20px 0 0;
`;
const VipLevelLabel = styled.span`
  font-size: 28px;
  margin-top: 2px;
  display: inline-block;
  color: #01f1fe;
`;

const AvatarContainer = styled.div`
  width: 188px;
  height: 188px;
  float: left;
  margin: 20px 0 0 70px;
`;
const AvatarImg = styled.img`
  width: 170px;
`;
const InfoContainer = styled.div`
  float: left;
  margin: 20px 0 0 0px;
  width: 460px;
  overflow: visible;
`;

const NameContainer = styled.div`
  float: left;

  font-size: 40px;
  font-weight: 600;

  color: ${({ theme }) => theme.secondary};
`;

const MainWalletContainer = styled.div`
  font-size: 28px;
  margin-top: 12px;
`;
const TotalWalletContainer = styled.div`
  font-size: 28px;
  margin-top: 12px;
`;
const WalletLabel = styled.div`
  color: ${({ theme }) => theme.secondary};
  float: left;
`;
const WalletAmount = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  float: left;
  margin-left: 15px;
`;
const IconContainer = styled.div`
  width: 716px;
  height: 190px;
  border-radius: 30px;
  box-shadow: 0px 3px 12px 0 rgba(0, 0, 0, 0.6);
  border: solid 1px #a9a9a9;
  background-image: linear-gradient(to top, #e0e0e0, #ffffff);

  margin: 10px auto 30px auto;
  padding: 40px 30px 0 30px;
`;
const IconColumn = styled.div`
  width: 33%;
  float: left;
  position: relative;
`;
const IconImg = styled.div`
  background: url(${(props) => props.src}) no-repeat center center;
  width: 65px;
  height: 60px;
  margin: 0 auto;
  display: block;
`;
const IconLabel = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-size: 28px;
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
`;

const ListView = styled.div`
  padding: 10px 30px 90px 30px;
`;
const ListItem = styled.div`
  border-radius: 6px;
  box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.25);
  border: solid 1px #ffffff;
  background-image: linear-gradient(to top, #e0e0e0, #ffffff);

  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-position: center 40px;

  width: 166px;
  height: 154px;
  border-radius: 6px;
  box-shadow: 0px 4px 12px 0 rgba(0, 0, 0, 0.8);
  border: solid 1px #ffffff;

  font-size: 20px;

  float: left;
  margin: 15px 32px;

  text-align: center;
  color: ${(props) =>
    props.disabled ? `rgba(61, 61, 61, 0.3)` : props.theme.secondary};
  padding-top: 110px;
  position: relative;
`;
const RedDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #e23a3f;
  border-radius: 50%;
  position: absolute;
`;

const MessageRedDot = styled(RedDot)`
  display: block;
  position: relative;
`;

const ProfileMenuHolder = styled.div`
  padding: 20px;
`;

const ProfileMenuWrapper = styled.div`
  background: white;
  padding: 10px 20px;
  border-radius: 20px;
`;

const ProfileMenuList = styled.div`
  font-size: 24px;
  padding: 20px 20px;
  display: flex;
  border-bottom: solid 1px rgba(30, 30, 30, 0.5);
  justify-content: space-between;
  align-items: center;

  :last-child {
    border-bottom: 0px;
  }
`;

const TheUserContainer = styled.div`
  padding: 20px 0px;
`;

const TextAndIcon = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/${icon}.svg`
    }) no-repeat center /
    contain;`;
  }};
`;

const Notification = styled.div`
  position: relative;
`;
class My extends Component {
  constructor(props) {
    super(props);
    var balance = 0;
    var loaded = true;
    if (this.props.wallet.balanceList.length > 0) {
      balance = this.getTotalBalance();
      loaded = true;
    }
    this.state = {
      balance: balance,
      balanceLoaded: loaded,
      avatarError: false,
    };
  }
  componentDidMount() {
    if (this.props.account.token === null) {
      this.props.appHistory.replace("/" + i18n.language + "/login");
    }
    if (this.props.wallet.balanceList.length <= 0) {
      this.props.getBalanceList();
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.balanceList.length !==
        this.props.wallet.balanceList.length &&
      this.props.wallet.balanceList.length > 0
    ) {
      this.setState({
        ...this.state,
        balance: this.getTotalBalance(),
        balanceLoaded: true,
      });
    }
  }
  getTotalBalance = () => {
    var balance = 0;
    for (let i = 0; i < this.props.wallet.balanceList.length; i++) {
      try {
        balance += parseFloat(
          this.props.wallet.balanceList[i].balance.replace(/,/g, "")
        );
      } catch (e) {}
    }
    return balance;
  };
  handleLogoutClick = () => {
    this.props.accountLogout(this.props.account.token).then((response) => {
      if (response.IsSuccess) {
        this.props.navigate("/" + i18n.language + "/");
      }
    });
  };

  profileMenu = [
    {
      icon: "icon-profile-profile",
      title: i18n.t("wap.main.account.personalInfo"),
      to: "/profile",
    },
    {
      icon: "icon-profile-inbox",
      title: i18n.t("wap.main.account.inbox"),
      to: "/inbox",
      notification: this.props.account.info.message_num > 0 ? true : false,
    },
    {
      icon: "icon-profile-report",
      title: i18n.t("wap.main.account.betReport"),
      to: "/report/2",
    },
    {
      icon: "icon-profile-withdrawal",
      title: i18n.t("wap.main.account.withdrawal"),
      to: "/report/3",
    },
    {
      icon: "icon-profile-topup",
      title: i18n.t("wap.main.account.deposit"),
      to: "/report/4",
    },
    {
      icon: "icon-profile-report-transfer",
      title: i18n.t("wap.main.account.transfer"),
      to: "/report/6",
    },
    {
      icon: "icon-vip",
      title: "VIP",
      to: "/vip",
    },
  ];

  noTransfer = [
    {
      icon: "icon-profile-profile",
      title: i18n.t("wap.main.account.personalInfo"),
      to: "/profile",
    },
    {
      icon: "icon-profile-inbox",
      title: i18n.t("wap.main.account.inbox"),
      to: "/inbox",
      notification: this.props.account.info.message_num > 0 ? true : false,
    },
    {
      icon: "icon-profile-report",
      title: i18n.t("wap.main.account.betReport"),
      to: "/report/2",
    },
    {
      icon: "icon-profile-withdrawal",
      title: i18n.t("wap.main.account.withdrawal"),
      to: "/report/3",
    },
    {
      icon: "icon-profile-topup",
      title: i18n.t("wap.main.account.deposit"),
      to: "/report/4",
    },
    {
      icon: "icon-vip",
      title: "VIP",
      to: "/vip",
    },
  ];

  render() {
    return (
      <Container>
        <StyledAppBar position="fixed" color="default">
          <LevelContainer onClick={() => this.props.navigate("/vip")}>
            <VipLevelLabel>
              {this.props.account.vip.curr_vip.title}
            </VipLevelLabel>
          </LevelContainer>
          <div className="clear"></div>

          <div className="clear"></div>
          {
            //     <IconContainer>
            //     <IconColumn onClick={() => this.props.navigate('/deposit')}>
            //       <IconImg
            //         src={
            //           process.env.PUBLIC_URL +
            //           `/assets/images/wapp/icon-profile-deposit.png`
            //         }
            //       ></IconImg>
            //       <IconLabel>{i18n.t('common.deposit')}</IconLabel>
            //     </IconColumn>
            //     <IconColumn onClick={() => this.props.navigate('/transfer')}>
            //       <IconImg
            //         src={
            //           process.env.PUBLIC_URL +
            //           `/assets/images/wapp/icon-profile-transfer.png`
            //         }
            //       ></IconImg>
            //       <IconLabel>{i18n.t('common.transfer')}</IconLabel>
            //     </IconColumn>
            //     <IconColumn onClick={() => this.props.navigate('/withdrawal')}>
            //       <IconImg
            //         src={
            //           process.env.PUBLIC_URL +
            //           `/assets/images/wapp/icon-profile-withdrawal.png`
            //         }
            //       ></IconImg>
            //       <IconLabel>{i18n.t('common.withdrawal')}</IconLabel>
            //     </IconColumn>
            //   </IconContainer>
          }
        </StyledAppBar>
        <TheUserContainer>
          <AvatarContainer>
            <AvatarImg
              src={process.env.PUBLIC_URL + `/assets/images/wapp/avatar.png`}
            ></AvatarImg>
          </AvatarContainer>
          <InfoContainer>
            <NameContainer>
              {this.props.account.info.member_username}
              {/* (VIP {this.props.account.info.member_level_id}) */}
            </NameContainer>

            <div className="clear"></div>
            <MainWalletContainer>
              <WalletLabel>
                {i18n.t("wap.main.account.mainAccount")}
              </WalletLabel>
              <WalletAmount>
                {this.props.wallet.mainSymbol}
                {Common.formatNumberWithThousand(this.props.wallet.mainBalance)}
              </WalletAmount>
            </MainWalletContainer>
            <TotalWalletContainer>
              <WalletLabel>{i18n.t("wap.main.account.totalFund")}</WalletLabel>
              <WalletAmount>
                {(() => {
                  if (this.state.balanceLoaded) {
                    return (
                      this.props.wallet.mainSymbol +
                      Common.formatNumberWithThousand(
                        this.props.wallet.mainBalance +
                          this.props.game.providerList
                            .filter(
                              (item) =>
                                item.status === 0 &&
                                item.transferwallet === true
                            )
                            .reduce((a, v) => (a = a + v.balance), 0)
                      )
                    );
                  } else {
                    return (
                      <CircularProgress
                        size={25}
                        color={"secondary"}
                        style={{ margin: "6px 0 0 10px" }}
                      ></CircularProgress>
                    );
                  }
                })()}
              </WalletAmount>
            </TotalWalletContainer>
          </InfoContainer>
        </TheUserContainer>
        <ListView>
          <ProfileMenuHolder>
            <ProfileMenuWrapper>
              {(this.props.game.containTransferWallet
                ? this.profileMenu
                : this.noTransfer
              ).map((data, index) => {
                return (
                  <ProfileMenuList onClick={() => this.props.navigate(data.to)}>
                    <TextAndIcon>
                      <Icon icon={data.icon} />
                      <div>{data.title}</div>
                    </TextAndIcon>
                    <Notification>
                      {data.title === i18n.t("wap.main.account.inbox") &&
                      this.props.account.info.message_num > 0 ? (
                        <MessageRedDot />
                      ) : (
                        ""
                      )}
                    </Notification>
                  </ProfileMenuList>
                );
              })}
              {config.features.HaveDownloadFeature && (
                <ProfileMenuList
                  onClick={() => this.props.navigate("/main/download")}
                >
                  <TextAndIcon>
                    <Icon icon="icon-download" />
                    <div>{i18n.t("wap.main.account.appDownload")}</div>
                  </TextAndIcon>
                </ProfileMenuList>
              )}
              {config.features.HaveAffiliateFeature && (
                <ProfileMenuList
                  onClick={() => this.props.navigate("/affiliate")}
                >
                  <TextAndIcon>
                    <Icon icon="icon-affiliate" />
                    <div>{i18n.t("web.account.affiliate")}</div>
                  </TextAndIcon>
                </ProfileMenuList>
              )}

              <ProfileMenuList
                onClick={() => {
                  if (
                    this.props.wallet.bankCardList != null &&
                    this.props.wallet.bankCardList.length === 0 &&
                    config.features.AddCard_NotAllowedEditDelete
                  ) {
                    this.props.alert("", i18n.t("card.toEdit"));
                  } else {
                    this.props.navigate("/card");
                  }
                }}
              >
                <TextAndIcon>
                  <Icon icon="icon-profile-card" />
                  <div>{i18n.t("wap.main.account.manageBank")}</div>
                </TextAndIcon>
              </ProfileMenuList>

              <ProfileMenuList
                onClick={() => this.props.navigate("/setting/language")}
              >
                <TextAndIcon>
                  <Icon icon="icon-profile-language" />
                  <div>{i18n.t("common.language")}</div>
                </TextAndIcon>
              </ProfileMenuList>
            </ProfileMenuWrapper>
          </ProfileMenuHolder>
          {
            //    <ListItem
            //    icon={
            //      process.env.PUBLIC_URL +
            //      `/assets/images/wapp/icon-profile-profile.png`
            //    }
            //    onClick={() => this.props.navigate('/profile')}
            //  >
            //    {i18n.t('wap.main.account.personalInfo')}
            //  </ListItem>
            //  <ListItem
            //    icon={
            //      process.env.PUBLIC_URL +
            //      `/assets/images/wapp/icon-profile-inbox.png`
            //    }
            //    onClick={() => this.props.navigate('/inbox')}
            //  >
            //    {i18n.t('wap.main.account.inbox')}
            //
            //    <MessageRedDot
            //      style={
            //        this.props.account.info.message_num > 0
            //          ? { display: 'block' }
            //          : { display: 'none' }
            //      }
            //    ></MessageRedDot>
            //  </ListItem>
            //  {/* <ListItem
            //    icon={IconProfileCashflowPNG}
            //    onClick={() => this.props.navigate("/report/1")}
            //  >
            //    {i18n.t("wap.main.account.transferReport")}
            //  </ListItem> */}
            //
            //  <ListItem
            //    icon={
            //      process.env.PUBLIC_URL +
            //      `/assets/images/wapp/icon-profile-report.png`
            //    }
            //    onClick={() => this.props.navigate('/report/2')}
            //  >
            //    {i18n.t('wap.main.account.betReport')}
            //  </ListItem>
            //  <ListItem
            //    icon={
            //      process.env.PUBLIC_URL +
            //      `/assets/images/wapp/icon-profile-cashflow.png`
            //    }
            //    onClick={() => this.props.navigate('/report/3')}
            //  >
            //    {i18n.t('report.withdrawalDetails')}
            //  </ListItem>
            //  <ListItem
            //    icon={
            //      process.env.PUBLIC_URL +
            //      `/assets/images/wapp/icon-profile-cashflow.png`
            //    }
            //    onClick={() => this.props.navigate('/report/4')}
            //  >
            //    {i18n.t('report.depositDetails')}
            //  </ListItem>
            //  <ListItem
            //    icon={
            //      process.env.PUBLIC_URL +
            //      `/assets/images/wapp/icon-profile-cashflow.png`
            //    }
            //    onClick={() => this.props.navigate('/report/6')}
            //  >
            //    {i18n.t('report.transfer.title')}
            //  </ListItem>
            //  <ListItem
            //    icon={
            //      process.env.PUBLIC_URL +
            //      `/assets/images/wapp/icon-profile-card.png`
            //    }
            //    onClick={() => this.props.navigate('/card')}
            //  >
            //    {i18n.t('wap.main.account.manageBank')}
            //  </ListItem>
            //
            //  {/*   <ListItem
            //    icon={IconProfileRecommendPNG}
            //    onClick={() => this.props.navigate("/affiliate")}
            //  >
            //    {i18n.t("wap.main.account.affiliate")}
            //  </ListItem> */}
            //
            //  {/* <ListItem
            //    icon={IconProfileAboutPNG}
            //    onClick={() => this.props.navigate("/aboutus")}
            //  >
            //    {i18n.t("wap.main.account.question")}
            //  </ListItem> */}
            //
            //  {/* <ListItem
            //    icon={IconProfileDownloadPNG}
            //    onClick={() =>
            //      window.open(
            //        "http://app.633download.com/app/download?key=lss014",
            //        "_blank"
            //      )
            //    }
            //  >
            //    {i18n.t("wap.main.account.appDownload")}
            //  </ListItem> */}
            //  <ListItem
            //    icon={
            //      process.env.PUBLIC_URL +
            //      `/assets/images/wapp/icon-profile-language.png`
            //    }
            //    onClick={() => this.props.navigate('/setting/language')}
            //  >
            //    {i18n.t('common.language')}
            //  </ListItem>
          }
          <div className="clear"></div>
          <BtnLogout
            onClick={this.handleLogoutClick}
            name={i18n.t("wap.main.account.signout")}
            style={{ margin: "30px auto 10px auto" }}
          ></BtnLogout>
        </ListView>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(My);
