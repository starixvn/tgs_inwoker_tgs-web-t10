import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import config from "../../config/config";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";

import { accountAction } from "../../api-services/actions/accountAction";
import { walletAction } from "../../api-services/actions/walletAction";
import { SHOWING_DIALOG } from "../../api-services/constant/actionType";
import { SHOW_LOGIN } from "../../api-services/constant/actionType";
import { GameTypeEnum } from "../../api-services/utils/Enum";

import { Link } from "react-router-dom";
import GuestContainer from "./GuestContainer";
import MemberContainer from "./MemberContainer";
import IconPhonePNG from "../../assets/images/icon-mobile.png";

import { withSnackbar } from "notistack";
import Common from "../../utils/Common";

import i18n from "../../utils/i18n";
import LanguangeChanger from "./LanguagePicker";
import Slider from "react-slick";
import { generalAction } from "../../api-services/actions/generalAction";
import { uiAction } from "../../api-services/actions/uiAction";
import { GeneralService } from "../../api-services/services/GeneralService";
import ErrorSwitcher from "../../utils/ErrorSwitcher";
import { AppHistory } from "../../history/History";
import { SortedMenuList } from "../../utils/HeaderSorting";
import OnlineUserDisplayer from "../Share/online-user-displayer";
import { GameService } from "../../api-services/services/GameService";
const moment = require("moment");

const InnerWrap = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;
  font-size: ${(props) => i18n.language === "ta-IN" ? "12px" : "14px"};
`;

const TopMostHeader = styled.div`
  background: ${({ theme }) => theme.toppestHeader};
  color: white;
  display: flex;
  justify-content: center;
  padding: 4px 0;
`;

const HeaderContent = styled.div`
  width: 1280px;
  display: flex;
  justify-content: space-between;
`;

const TheContent = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const LeftContent = styled(TheContent)`
  @media (max-width: 1279px) {
    display: none;
  }
`;

const TimerContainer = styled.div`
  font-family: arial;
  font-size: ${(props) => i18n.language === "ta-IN" ? "12px" : "14px"};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 950px) {
    display: none;
  }
`;

const TimerSpan = styled.span`
  width: 190px;
`;

const CustomLink = styled(Link)`
  color: #f6f6f6;

  &:hover {
    color: #fde73f;
    text-decoration: underline;
  }
`;

const LanguageContainer = styled.div`
  float: left;

  padding-right: 5px;
  position: relative;
  display: inline-block;
`;
const GameName = styled.div`
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  font-size: ${(props) => (i18n.language === "en-US" ? "20px" : "22px")};
  width: 100px;
  position: absolute;
  text-align: ${(props) => (i18n.language === "en-US" ? "left" : "right")};
  transition: transform 0.6s;
  top: 30px;
  left: ${(props) => (i18n.language === "en-US" ? "50px" : "20px")};
  transform-origin: bottom center;
  transform: translateY(-160px) scale(1);
  animation-duration: 200ms;
  animation-delay: ${(props) => `${100 + props.index * 100}`}ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
`;

const HotGameIcon = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  margin: 3px 5px 0 0;
  height: 19px;
  width: 19px;
  position: absolute;
  top: 30px;
  right: 0;
`;
const BottomContainer = styled.div``;
const LogoContainer = styled.div`
  background-image: url("${(props) => props.img}");
  background-repeat: no-repeat;
  background-size: 75%;
  background-position: center;
  height: 90px;
  ${(props) => {
    if (props.headerCustom === true) {
      return `width:180px;`;
    } else {
      return `width:270px;`;
    }
  }}

  float: left;
  &:hover {
    cursor: pointer;
  }
`;

const RightMenuContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const RightMenuUL = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 0;
  margin: 0;
`;

const RightMenuTextSpan = styled.span`
  font-size: ${(props) => i18n.language === "ta-IN" ? "13px" : "16px"};
  margin: 0 auto;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
`;

const MouseOverContainer = styled.div`
  width: 100%;
  height: 0px;

  position: fixed;
  left: 0;
  top: 156px;
  z-index: 1;
  cursor: default;
  transition: height 0.5s;
`;
const MouseOverBackground = styled.div`
  width: 100%;

  background-color: rgba(0, 0, 0, 0.75);
  height: 160px;
  position: absolute;
  bottom: 30px;
`;

const RightMenuImg = styled.div`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  ${(props) => `background-image:url(${props.img});`}

  ${(props) =>
    props.active
      ? `

  background-image:url(${props.hoverimg});
  `
      : `
  
  `}
`;
const MouseOverInner = styled.div`
  width: 1410px;
  height: 161px;
  margin: 0 auto;
`;

const GameImg = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  background-position: center bottom;
  background-size: auto 150px;
  height: 150px;
  overflow: visible;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 10px;
  transition: transform 0.6s;

  transform-origin: center bottom;
  transform: scale(1);
  &:after {
    content: "${(props) => props.text}";
    color: ${(props) => props.theme.primaryText};
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;

    bottom: 25%;
    right: -53%;
    transform: translateX(-50%);
    width: 80%;
    display: flex;
    justify-content: center;
    height: 50px;
  }
`;
const breatheAnimation = keyframes`

 to { transform:translateY(0px); }

`;
const RightMenuLI = styled.div`
  display: inline-block;
  ${(props) => {
    if (props.headerCustom === true) {
      return `min-width: 106px;`;
    } else {
      return `min-width: 95px;`;
    }
  }}
  max-width: 120px;

  line-height: 50px;
  text-align: center;
  color: ${({ theme }) => theme.bodyText};
  border-bottom: solid 4px transparent;
  cursor: pointer;

  ${({ active, theme }) => {
    return active
      ? `  color: ${theme.primary} !important;
  border-bottom: solid 4px ${theme.primary};`
      : "";
  }}

  :hover {
    border-bottom: solid 4px ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
  }

  &:hover ${MouseOverContainer} {
    height: 188px;
  }
  &:hover ${RightMenuImg} {
    ${(props) => `background-image:url(${props.hoverimg});`}
  }
  &:hover ${GameImg} {
    animation-name: ${breatheAnimation};
  }
  background-repeat: no-repeat;
  background-position: 15% center;
  ${({ active }) => {
    return (
      active &&
      ` border-bottom: solid 4px ${({ theme }) => theme.primary};
   color: ${({ theme }) => theme.primary};`
    );
  }}
`;

const CustomVIPHeaderButton = styled.div`
  display: inline-block;
  min-width: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 20px;
  padding-top: 4px;
  font-size: 16px;
  letter-spacing: 3px;
  cursor: pointer;
  border-bottom: solid 4px transparent;
  color: ${({ theme }) => (theme.whiteText ? theme.whiteText : "#000")};

  ${({ active, theme }) => {
    return active
      ? `  color: ${theme.primary} !important;
  border-bottom: solid 4px ${theme.primary};`
      : "";
  }}

  :hover {
    color: ${({ theme }) => theme.primary};
    border-bottom: solid 4px ${({ theme }) => theme.primary};
  }
`;
const IconPhone = styled.div`
  mask: url(${(props) => props.img}) no-repeat;
  background: #fff;
  mask-size: contain;
  width: 15px;
  height: 15px;
`;

const ThePhoneContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => i18n.language === "ta-IN" ? "12px" : "14px"};
`;

const CustomAppBar = styled(AppBar)`
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
  height: 190px;
  background: ${({ theme }) => theme.bottomHeader};
  box-shadow: ${({ theme }) => theme.headerShadow};
`;

const GameFrameWrapper = styled.div`
  width: 100%;
  height: 100%;
  height: 161px;
`;

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;

  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: not-allowed;
  pointer-event: none;
  color: white;
  font-size: 20px;
  text-transform: capitalize;
  font-weight: bold;
`;

const GameFrame = styled.div`
  max-width: 290px;
  float: left;
  min-height: 160px;
  position: relative;
  transition: transform 0.6s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameImg}{
        filter: brightness(40%) grayscale(200%);
      }

      ${Maintenance}{

        display: flex;
      }

  
    
    
    `
      : ``;
  }}
`;

const styles = {
  root: {
    flexGrow: 1,
  },
  show: {
    transform: "translateY(0)",
    transition: "transform .5s",
  },
  hide: {
    transform: "translateY(-110%)",
    transition: "transform .5s",
  },
  minIcon: {
    width: "25px",
    height: "25px",
    margin: "20px 0 0 15px",
    transition: "all .3s",
  },
  maxIcon: {
    width: "100%",
    height: "40px",
    margin: "30px 0 0 0",
    transition: "all .3s",
  },
  maxLabel: {
    transition: "all .3s",
  },
  minLabel: {
    transition: "all .3s",
    transform: "translate(18px, -30px)",
  },
  maxMenu: {
    transition: "height .3s",
  },
  minMenu: {
    transition: "height .3s",
  },
};

const TheLogoHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "/",
      hovermenu: "",
      shouldShow: null,
      isHoverMenu: false,
      isHoverSubMenuContainer: false,
      open: false,
      dialog: "",
      systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    };
    this.lastScroll = null;

    this.handleScroll = this.handleScroll.bind(this);
  }

  updateInterval = null;
  tickCount = 0;

  async componentDidMount() {
    this.setState({ selected: this.props.location.pathname });

    this.FireTimerToUpdateBalance();
  }

  FireTimerToUpdateBalance = () => {
    this.updateInterval = setInterval(() => {
      this.setState({
        ...this.state,
        systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      });
      const localStorageToken = localStorage.getItem("token0");
      if (
        this.props.account.token === localStorageToken &&
        localStorageToken !== null
      ) {
        this.tickCount++;
        if (this.tickCount >= 10) {
          this.tickCount = 0;
          if (!config.features.Register_CustomFlow_IDR)
            this.props.getBalanceList(false);
          else if (
            config.features.Register_CustomFlow_IDR &&
            this.props.wallet.bankCardList.length > 0
          )
            this.props.getBalanceList(false);
        }
      }
    }, 1000);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleDialogChange = (dialog) => {
    this.setState({ ...this.state, dialog: dialog });
  };
  handleScroll(evt) {
    const lastScroll = window.scrollY;
    if (lastScroll > 160) {
      this.setState({ ...this.state, shouldShow: false });
    } else {
      this.setState({ ...this.state, shouldShow: true });
    }
    return;
  }

  onhandleLogout = () => {
    this.props.logout(this.props.account.token);
    this.props.history.push("/");
  };
  onhandleLogoClick = () => {
    this.setState({ selected: "/" });
    this.props.history.push("/");
  };
  onhandleTransfer = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/transfer");
  };
  onhandleDeposit = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/deposit");
  };
  handleInboxClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/inbox");
  };
  handleProfileClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/profile");
  };
  handleWithdrawClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/withdrawal");
  };
  handleRefreshBalanceClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.tickCount = 0;
    this.props.updateBalanceList();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => this.props.getGameBalance(a.gpcode));
  };
  handleDownloadAppsClick = () => {
    this.setState({ selected: "/download" });
    this.props.history.push("/download");
    //alert("敬请期待");
  };
  handleContactUsClick = () => {
    this.props.history.push("/aboutus/contactus");
  };
  HighlightLink = (link) => {};
  handleMenuMouseOver = (to) => {
    this.setState({ ...this.state, hovermenu: to, isHoverMenu: true });
  };
  handleMenuMouseLeave = () => {
    this.setState({ ...this.state, isHoverMenu: false });
  };
  handleClickMenu = (path) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.setState({ ...this.state, selected: path });
    this.props.history.push(`/${path}`);
  };

  RightMenuItem = (to, label, subMenuImg) => {
    const { classes } = this.props;
    return (
      <RightMenuLI
        headerCustom={config.features.HeaderCustom}
        active={this.state.selected === `${to}`}
        onClick={() => this.handleClickMenu(to)}
        onMouseOver={() => this.handleMenuMouseOver(to)}
        onMouseLeave={this.handleMenuMouseLeave}
      >
        <RightMenuTextSpan
          className={`${
            this.state.shouldShow === null
              ? classes.maxLabel
              : this.state.shouldShow
              ? classes.maxLabel
              : classes.minLabel
          }`}
        >
          {label}
        </RightMenuTextSpan>
      </RightMenuLI>
    );
  };
  MouseOverItem = (to, image) => {
    return (
      <CustomLink to={to} onClick={() => this.setState({ selected: to })}>
        <img src={image} alt=""></img>
      </CustomLink>
    );
  };

  handleJoinLotteryGame = (name) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    Common.closePreviousPopup();
    if (this.props.account.token != null) {
      if (this.props.history.location.pathname.indexOf("play") >= 0) {
        AppHistory.goBack();
      }
      Common.PopupCenter("/joinlottery/" + name, name, 1280, 720);
    } else {
      this.props.showLogin(true);
    }
  };

  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    var slotPageGameType = [
      GameTypeEnum.SLOT,
      GameTypeEnum.TIGERSLOT,
      GameTypeEnum.SPORTS,
      GameTypeEnum.ESPORTS,
      GameTypeEnum.TABLEGAME,
      GameTypeEnum.FISH,
      GameTypeEnum.RNGSPORTS,
    ];
    Common.closePreviousPopup();
    if (slotPageGameType.indexOf(gameType) >= 0) {
      if (
        gameType === GameTypeEnum.SPORTS ||
        gameType === GameTypeEnum.ESPORTS ||
        gameType === GameTypeEnum.RNGSPORTS
      ) {
        if (!this.props.account.token) {
          this.props.showLogin(true);
        } else {
          if (gameType === GameTypeEnum.RNGSPORTS) {
            this.props.history.push("/sports/" + gameCode);
          } else if (gameCode === "WGFM" || gameCode === "WGVIA") {
            if (document.getElementById("audio") != null)
              document.getElementById("audio").volume = 0;
            if (this.props.history.location.pathname.indexOf("play") >= 0) {
              AppHistory.goBack();
            }
            // this.handleRefreshBalanceClick();
            var win = Common.PopupCenter(
              `/joinlobbygame/${gameType}/${gameCode}`,
              gameCode,
              1280,
              720
            );
            // var win = window.open(
            //   ,
            //   "_blank"
            // );
            var timer = setInterval(function () {
              if (win.closed) {
                clearInterval(timer);
                if (document.getElementById("audio") != null)
                  document.getElementById("audio").volume = 1.0;
              }
            }, 1000);
          } else {
            // this.handleRefreshBalanceClick();
            this.props.history.push(
              "/sports/play/" + gameCode + "/" + gameType
            );
          }
        }
      } else {
        this.props.history.push(`/${path}/${gameCode}`);
      }
    } else {
      if (!this.props.account.token) {
        this.props.showLogin(true);
        return;
      }
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0;
      if (this.props.history.location.pathname.indexOf("play") >= 0) {
        AppHistory.goBack();
      }
      // this.handleRefreshBalanceClick();
      var win = Common.PopupCenter(url, gameCode, 1280, 720);
      var timer = setInterval(function () {
        if (win.closed) {
          clearInterval(timer);
          if (document.getElementById("audio") != null)
            document.getElementById("audio").volume = 1.0;
        }
      }, 1000);
    }
  };
  handleBookmarkClick = () => {
    let pageTitle = document.title;
    let pageURL = document.location;
    try {
      // Internet Explorer solution
      eval(
        "window.external.AddFa-vorite(pageURL, pageTitle)".replace(/-/g, "")
      );
    } catch (e) {
      try {
        // Mozilla Firefox solution
        window.sidebar.addPanel(pageTitle, pageURL, "");
      } catch (e) {
        // Opera solution
        if (typeof window.opera == "object") {
          e.rel = "sidebar";
          e.title = pageTitle;
          e.url = pageURL;
          return true;
        } else {
          // The rest browsers (i.e Chrome, Safari)

          alert(
            i18n.t("web.header.plsClick") +
              (navigator.userAgent.toLowerCase().indexOf("mac") !== -1
                ? "Cmd"
                : "Ctrl") +
              "+D" +
              i18n.t("web.header.bookmark")
          );
        }
      }
    }
    return false;
  };

  changeLanguage = (language) => {
    this.props.getBanner();
    this.props.getMarquee(language);
    this.props.getAnnouncement(language);
    GeneralService.GetLocalization().then((response) => {
      if (response.IsSuccess) {
        ErrorSwitcher.setTranslation(response.data);
      }
    });
  };

  handleCockfight = (item) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      if (item.include.indexOf("SM01") >= 0) {
        this.popup = window.open("", "Cockfight");
        GameService.GetCockfight()
          .then((e) => {
            this.popup.document.write(e.data);
            this.popup.document.close();
            this.popup.focus();
          })
          .catch((e) => {
            this.popup.close();
          });
      }
    }
  };

  handleOtherCockfightGame = (game) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      AppHistory.push("/sports/play/" + game.name + "/" + GameTypeEnum.SPORTS);
    }
  };

  consolidateJoinGame = (game, item) => {
    if (game.type === GameTypeEnum.COCKFIGHT) {
      if (game.name === "SM01") {
        this.handleCockfight(item);
      } else {
        this.handleOtherCockfightGame(game);
      }
    } else if (
      game.type === GameTypeEnum.LOTTERYLOBBY ||
      game.type === GameTypeEnum.LOBBY
    ) {
      this.handleJoinLotteryGame(game.gpcode);
    } else {
      this.handleJoinGameClick(
        game.type,
        item.path,
        game.gpcode,
        "/joingame/" + game.type + "/" + game.gpcode
      );
    }
  };

  filterGameList = (item) => {
    if (item.include && item.include !== undefined) {
      this.props.game.homePageGameList.map((game) => {
        if (item.include.indexOf(game.game_platform_name) >= 0) {
          game.type = item.gameType[0];
        }
        return item;
      });
    }

    return this.props.game.homePageGameList.filter((game) => {
      return item.gameType.indexOf(game.type) >= 0;
    });
  };

  render() {
    const { classes } = this.props;
    const settings = {
      className: "headerSubmenu",
      slidesToShow: 4,
      slidesToScroll: 4,
    };

    var liveSorting = ["EVO", "SG", "WM", "SW", "AB", "AG", "BG"];

    var currentPage = window.location.pathname.split("/").pop();

    return (
      <CustomAppBar hide={this.props.hide}>
        <TopMostHeader>
          <HeaderContent>
            <LeftContent>
              <TimerContainer>
                <TimerSpan>GMT+8 {this.state.systemDateTime}</TimerSpan>
              </TimerContainer>
              {!config.features.DisplayPhone && (
                <ThePhoneContainer>
                  <IconPhone img={IconPhonePNG}></IconPhone>
                  <div>
                    {this.props.general.brandsSupport &&
                      this.props.general.brandsSupport.length >= 1 &&
                      this.props.general.brandsSupport[0].phone}
                  </div>
                </ThePhoneContainer>
              )}
              <LanguageContainer>
                <LanguangeChanger
                  language={this.props.general.brandLanguage}
                  changeLanguage={this.changeLanguage}
                />
              </LanguageContainer>
            </LeftContent>
            <TheContent style={{ justifyContent: "flex-end" }}>
              {config.features.OnlineUser && (
                <OnlineUserDisplayer color={"#fff"} size={i18n.language === "ta-IN" ? "12px" : "14px"} />
              )}

              {(() => {
                if (!this.props.general.isMaintenance) {
                  if (
                    this.props.account.token !== this.props.account.info.token
                  ) {
                    return (
                      <GuestContainer
                        onhandleShowCSClick={this.props.onhandleShowCSClick}
                        onhandleContactUsClick={this.handleContactUsClick}
                        onDialogChange={this.handleDialogChange}
                      ></GuestContainer>
                    );
                  } else {
                    return (
                      <MemberContainer
                        onhandleLogout={this.onhandleLogout}
                        onhandleTransfer={this.onhandleTransfer}
                        onhandleDeposit={this.onhandleDeposit}
                        onhandleInboxClick={this.handleInboxClick}
                        onhandleWithdrawClick={this.handleWithdrawClick}
                        onhandleProfileClick={this.handleProfileClick}
                        onhandleRefreshBalanceClick={
                          this.handleRefreshBalanceClick
                        }
                        wallet={this.props.wallet}
                        account={this.props.account}
                        game={this.props.game}
                      ></MemberContainer>
                    );
                  }
                }
              })()}
            </TheContent>
          </HeaderContent>
        </TopMostHeader>
        <TheLogoHolder>
          <LogoContainer
            headerCustom={config.features.HeaderCustom}
            img={
              this.props.general.brand &&
              this.props.general.brand.desktopLogoUrl
            }
            onClick={this.onhandleLogoClick}
            className={`${
              this.state.shouldShow === null
                ? classes.maxMenu
                : this.state.shouldShow
                ? classes.maxMenu
                : classes.minMenu
            }`}
          />
        </TheLogoHolder>
        <InnerWrap>
          <BottomContainer>
            <RightMenuContainer>
              <RightMenuUL
                className={`${
                  this.state.shouldShow === null
                    ? classes.maxMenu
                    : this.state.shouldShow
                    ? classes.maxMenu
                    : classes.minMenu
                }`}
              >
                <CustomVIPHeaderButton
                  active={currentPage === "vip"}
                  onClick={() => this.handleClickMenu("vip")}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      "/assets/images/wapp/home-vip.png"
                    }
                    alt=""
                    style={{ height: 20, marginRight: 10 }}
                  />{" "}
                  VIP
                </CustomVIPHeaderButton>

                {SortedMenuList.map((item, index) => {
                  var gameList = this.filterGameList(item).sort((a, b) => {
                    if (config.features.LiveGame_Sorting_SKY) {
                      var sortDGFirst = ["DG"];
                      return (
                        sortDGFirst.indexOf(b.abbreviation) -
                        sortDGFirst.indexOf(a.abbreviation)
                      );
                    } else return b - a;
                  });
                  return (
                    gameList.length !== 0 && (
                      <RightMenuLI
                        headerCustom={config.features.HeaderCustom}
                        key={index}
                        active={currentPage === `${item.path}`}
                        onClick={() => this.handleClickMenu(item.path)}
                        onMouseOver={() => this.handleMenuMouseOver(item.path)}
                        onMouseLeave={this.handleMenuMouseLeave}
                        hoverimg={item.hoverImg}
                      >
                        <RightMenuTextSpan
                          className={`${
                            this.state.shouldShow === null
                              ? classes.maxLabel
                              : this.state.shouldShow
                              ? classes.maxLabel
                              : classes.minLabel
                          }`}
                        >
                          {i18n.t(item.title)}
                        </RightMenuTextSpan>
                        <MouseOverContainer
                          onClick={(e) => e.stopPropagation()}
                          style={
                            this.state.shouldShow === null
                              ? { top: "186px" }
                              : this.state.shouldShow
                              ? { top: "186px" }
                              : { top: "114px" }
                          }
                        >
                          <MouseOverBackground>
                            <MouseOverInner>
                              {(() => {
                                return gameList.length <= 5 ? (
                                  gameList.map((game, index) => {
                                    return (
                                      <GameFrame
                                        key={index}
                                        style={{
                                          width: `calc(1264px / ${gameList.length})`,
                                        }}
                                        //TODO: To remove
                                        maintenance={game.status !== 0}
                                      >
                                        <GameFrameWrapper>
                                          <Maintenance>
                                            {i18n.t("transfer.maintenance")}
                                          </Maintenance>
                                          {(() => {
                                            var gameCode =
                                              game.abbreviation.toLowerCase();
                                            if (gameCode === "joker") {
                                              return (
                                                <HotGameIcon></HotGameIcon>
                                              );
                                            }
                                          })()}
                                          {(() => {
                                            var gameCode =
                                              game.abbreviation.toLowerCase();
                                            if (
                                              config.features.SportsHideLogo
                                            ) {
                                              if (gameCode === "wgvia") {
                                                return (
                                                  <GameName index={index}>
                                                    {i18n.t("common.horserace")}
                                                  </GameName>
                                                );
                                              } else if (gameCode === "wgfm") {
                                                return (
                                                  <GameName index={index}>
                                                    {i18n.t("common.sport")}
                                                  </GameName>
                                                );
                                              }
                                            }
                                          })()}

                                          <GameImg
                                            index={index}
                                            img={`${
                                              process.env.PUBLIC_URL
                                            }/assets/images/pcHeaderMenu/${
                                              item.path
                                            }/${game.abbreviation.toLowerCase()}.png`}
                                            alt=""
                                            onClick={() => {
                                              this.consolidateJoinGame(
                                                game,
                                                item
                                              );
                                            }}
                                          ></GameImg>
                                        </GameFrameWrapper>
                                      </GameFrame>
                                    );
                                  })
                                ) : (
                                  <Slider {...settings}>
                                    {gameList.map((game, index) => {
                                      return (
                                        <GameFrame
                                          key={index}
                                          style={{
                                            width: `calc(1264px / ${gameList.length})`,
                                          }}
                                          maintenance={game.status !== 0}
                                        >
                                          <GameFrameWrapper>
                                            <Maintenance>
                                              {i18n.t("transfer.maintenance")}
                                            </Maintenance>
                                            {(() => {
                                              var gameCode =
                                                game.abbreviation.toLowerCase();
                                              if (gameCode === "joker") {
                                                return (
                                                  <HotGameIcon></HotGameIcon>
                                                );
                                              }
                                            })()}
                                            {(() => {
                                              var gameCode =
                                                game.abbreviation.toLowerCase();
                                              if (
                                                config.features.SportsHideLogo
                                              ) {
                                                if (gameCode === "wgvia") {
                                                  return (
                                                    <GameName index={index}>
                                                      {i18n.t(
                                                        "common.horserace"
                                                      )}
                                                    </GameName>
                                                  );
                                                } else if (
                                                  gameCode === "wgfm"
                                                ) {
                                                  return (
                                                    <GameName index={index}>
                                                      {i18n.t("common.sport")}
                                                    </GameName>
                                                  );
                                                }
                                              }
                                            })()}

                                            <GameImg
                                              index={index}
                                              img={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/pcHeaderMenu/${
                                                item.path
                                              }/${game.abbreviation.toLowerCase()}.png`}
                                              alt=""
                                              onClick={() => {
                                                this.consolidateJoinGame(
                                                  game,
                                                  item
                                                );
                                              }}
                                            ></GameImg>
                                          </GameFrameWrapper>
                                        </GameFrame>
                                      );
                                    })}
                                  </Slider>
                                );
                              })()}
                            </MouseOverInner>
                          </MouseOverBackground>
                        </MouseOverContainer>
                      </RightMenuLI>
                    )
                  );
                })}

                {this.RightMenuItem(
                  "promotion",
                  i18n.t("common.promotion"),
                  null
                )}
              </RightMenuUL>
            </RightMenuContainer>
          </BottomContainer>
        </InnerWrap>
      </CustomAppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // screenWidth: state.ui.screenWidth,
    // screenHeight: state.ui.screenHeight,
    ui: state.ui,
    account: state.account,
    game: state.game,
    general: state.general,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBanner: () => dispatch(generalAction.getBanner()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getAnnouncement: (language) => dispatch(uiAction.getAnnouncement(language)),
    // updateScreenSize: (width, height) => {
    //   dispatch({ type: UPDATING_SCREEN_SIZE, width, height });
    // },
    // checkTokenIsValid: token =>
    //   dispatch(accountAction.checkTokenIsValid(token)),
    logout: (token) => dispatch(accountAction.accountLogout(token)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getBalanceList: (loading) => dispatch(walletAction.getBalanceList(loading)),
    updateBalanceList: (loading) => dispatch(walletAction.updateBalanceList()),
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withSnackbar(withStyles(styles)(Header)))
);
