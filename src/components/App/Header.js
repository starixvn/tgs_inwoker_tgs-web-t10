import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes, withTheme } from "styled-components";

import config from "../../config/config";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { accountAction } from "../../api-services/actions/accountAction";
import { walletAction } from "../../api-services/actions/walletAction";
import { SHOWING_DIALOG } from "../../api-services/constant/actionType";
import { SHOW_LOGIN } from "../../api-services/constant/actionType";
import { GameTypeEnum } from "../../api-services/utils/Enum";

import BtnCSPNG from "../../assets/images/btn-cs.png";
import BtnCSPNG_PB from "../../assets/images/btn-cs-pb.png";

import BtnCSHoverPNG from "../../assets/images/btn-cs-hover.png";
import BtnCSHoverPNG_PB from "../../assets/images/btn-cs-hover-pb.png";

import { Link } from "react-router-dom";
import GuestContainer from "./GuestContainer";
import MemberContainer from "./MemberContainer";

import TopMenuLivePNG_PB from "../../assets/images/top-menu-live-pb.png";
import TopMenuQipaiPNG_PB from "../../assets/images/top-menu-qipai-pb.png";
import TopMenuSportsPNG_PB from "../../assets/images/top-menu-sports-pb.png";
import TopMenuLotteryPNG_PB from "../../assets/images/top-menu-lottery-pb.png";
import TopMenueSportsPNG_PB from "../../assets/images/top-menu-gun-pb.png";
import TopMenuTigerPNG_PB from "../../assets/images/top-menu-tiger-pb.png";
import TopMenuFishPNG_PB from "../../assets/images/top-menu-fish-pb.png";
import TopMenuPromoPNG_PB from "../../assets/images/top-menu-promo-pb.png";
import TopMenuSlotPNG_PB from "../../assets/images/top-menu-slot-pb.png";

import TopMenuLivePNG from "../../assets/images/top-menu-live.png";
import TopMenuQipaiPNG from "../../assets/images/top-menu-qipai.png";
import TopMenuSportsPNG from "../../assets/images/top-menu-sports.png";
import TopMenuLotteryPNG from "../../assets/images/top-menu-lottery.png";
import TopMenueSportsPNG from "../../assets/images/top-menu-gun.png";
import TopMenuTigerPNG from "../../assets/images/top-menu-tiger.png";
import TopMenuFishPNG from "../../assets/images/top-menu-fish.png";
import TopMenuPromoPNG from "../../assets/images/top-menu-promo.png";
import TopMenuSlotPNG from "../../assets/images/top-menu-slot.png";

import TopMenuLiveHoverPNG from "../../assets/images/top-menu-live-hover.png";
import TopMenuQipaiHoverPNG from "../../assets/images/top-menu-qipai-hover.png";
import TopMenuSportsHoverPNG from "../../assets/images/top-menu-sports-hover.png";
import TopMenuLotteryHoverPNG from "../../assets/images/top-menu-lottery-hover.png";
import TopMenueSportsHoverPNG from "../../assets/images/top-menu-gun-hover.png";
import TopMenuTigerHoverPNG from "../../assets/images/top-menu-tiger-hover.png";
import TopMenuFishHoverPNG from "../../assets/images/top-menu-fish-hover.png";
import TopMenuPromoHoverPNG from "../../assets/images/top-menu-promo-hover.png";
import TopMenuSlotHoverPNG from "../../assets/images/top-menu-slot-hover.png";

import IconPhonePNG from "../../assets/images/icon-mobile.png";
import HotGamePNG from "../../assets/images/slot-hotgame.png";
import HotGameActivePNG from "../../assets/images/slot-hotgame-active.png";

import { withSnackbar } from "notistack";
import Common from "../../utils/Common";

import i18n from "../../utils/i18n";
import Slider from "react-slick";
import LanguageChanger from "../Share/language-changer";
import { uiAction } from "../../api-services/actions/uiAction";
import { generalAction } from "../../api-services/actions/generalAction";
import { GeneralService } from "../../api-services/services/GeneralService";
import ErrorSwitcher from "../../utils/ErrorSwitcher";

const moment = require("moment");

const btnCSSwitcher = () => {
  switch (config.theme.toLowerCase()) {
    case "pb":
      return `${BtnCSPNG_PB}`;
    default:
      return `${BtnCSPNG}`;
  }
};

const btnCSHoverSwitcher = () => {
  switch (config.theme.toLowerCase()) {
    case "pb":
      return `${BtnCSHoverPNG_PB}`;
    default:
      return `${BtnCSHoverPNG}`;
  }
};

const InnerWrap = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  width: 100%;
  font-size: 14px;
`;
const TopContainer = styled.div`
  height: 50px;
  border-bottom: 1px solid #2d3e45;
`;
const TimerContainer = styled.div`
  padding-top: 15px;
  font-family: arial;
  float: left;
  @media (max-width: 950px) {
    display: none;
  }
`;

const TimerSpan = styled.span`
  color: ${({ theme }) => theme.pcHeaderText};
  float: left;
  min-width: 100px;
`;
const PhoneNumberSpan = styled.span`
  color: ${({ theme }) => theme.pcHeaderText};
  float: left;
`;

const IconPhone = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  float: left;
  width: 20px;
  height: 20px;
`;
const LinkContainer = styled.div`
  color: ${({ theme }) => theme.pcHeaderText};
  float: left;
  padding: 0px 10px;
  @media (max-width: 950px) {
    display: none;
  }
`;
const CustomLink = styled(Link)`
  color: ${({ theme }) => theme.pcHeaderText};

  &:hover {
    color: ${({ theme }) => theme.pcHeaderTextHover};
    text-decoration: underline;
  }
`;

const RightContainer = styled.div`
  float: right;
  padding-top: 5px;
`;

const BtnAppsAndCS = styled.div`
  width: 77px;
  display: flex;
  align-items: center;
  word-wrap: break-word;
  height: 30px;
  margin-top: 3px;
  float: right;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const BtnCS = styled(BtnAppsAndCS)`
  margin-right: 8px;

  background-image: url(${({ theme }) => btnCSSwitcher()});
  color: ${({ theme }) => theme.pcHeaderText};
  &:hover {
    background-image: url(${({ theme }) => btnCSHoverSwitcher()});
    color: ${({ theme }) => theme.pcHeaderTextHover};
  }
  padding-left: 32px;
  line-height: 10px;
`;

const BottomContainer = styled.div`
  display: grid;
  grid-template-columns: 230px auto;
  grid-gap: 5px;
  @media (max-width: 1279px) {
    grid-template-columns: auto;
  }
`;
const LogoContainer = styled.div`
  background-image: url("${(props) => props.img}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  width: 100%;
  height: 90px;
  margin-top: 10px;
  float: left;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1279px) {
    display: none;
  }
`;

const RightMenuContainer = styled.div`
  float: right;
`;
const RightMenuUL = styled.ul`
  display: flex;
  align-items: stretch; /* Default */
  justify-content: space-between;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 110px;
`;

const RightMenuTextSpan = styled.span`
  font-size: ${(props) => (i18n.language === "vi-VN" ? "15px" : "16px")};

  margin: 0 auto;
  display: block;

  padding-top: 6px;
  text-align: center;
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
  width: 1280px;
  height: 161px;
  margin: 0 auto;
`;

const GameImg = styled.img`
  height: 130px;

  position: absolute;

  padding-bottom: 10px;
  transition: transform 0.6s;
  bottom: 0;
  right: 0;
  transform-origin: bottom center;
  transform: translateY(-160px) scale(1);
  animation-duration: 200ms;
  animation-delay: ${(props) => `${100 + props.index * 100}`}ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
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
const breatheAnimation = keyframes`

 to { transform:translateY(0px); }

`;
const RightMenuLI = styled.li`
  display: inline-block;
  width: 130px;
  height: 95%;
  color: ${({ theme }) => theme.pcHeaderRightMenu};
  border-bottom: solid 4px transparent;
  @media (max-width: 925px) {
    width: 100px;
  }
  @media (max-width: 770px) {
    width: 80px;
  }
  @media (max-width: 650px) {
    width: 100px;
  }
  &:hover {
    border-bottom: solid 4px ${({ theme }) => theme.pcHeaderRightMenuHover};
    color: ${({ theme }) => theme.pcHeaderRightMenuHover};

    cursor: pointer;
  }
  &:hover ${MouseOverContainer} {
    height: 190px;
  }
  &:hover ${RightMenuImg} {
    ${(props) => `background-image:url(${props.hoverimg});`}
  }
  &:hover ${GameImg} {
    animation-name: ${breatheAnimation};
  }
  &:hover ${GameName} {
    animation-name: ${breatheAnimation};
  }
  background-repeat: no-repeat;
  background-position: 15% center;
  ${(props) =>
    props.active
      ? `
  border-bottom: solid 4px ${props.theme.pcHeaderRightMenuHover};
  color: ${props.theme.pcHeaderRightMenuHover};


  `
      : `
  
  `}
`;

const StyledAppBar = withStyles((theme) => ({
  root: {
    "& .MuiToolbar-regular": {
      margin: "0 auto",
    },
  },
}))(AppBar);

const CustomAppBar = styled(StyledAppBar)`
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
  background: ${({ theme }) => theme.pcAppBar};
`;

const GameFrameWrapper = styled.div`
  width: 100%;
  height: 100%;
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

  text-transform: capitalize;

  font-weight: bold;
  font-size: 18px;
  user-select: none;
  cursor: not-allowed;
`;

const GameFrame = styled.div`
  max-width: 255px;
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

      ${GameName}{
        filter: brightness(40%) grayscale(200%);
      }
    
    
    
    `
      : ``;
  }}
`;
const HotGameIcon = styled.div`
  background: url(${HotGameActivePNG}) no-repeat;
  background-repeat: no-repeat;
  background-position: center;
  margin: 3px 5px 0 0;
  height: 19px;
  width: 19px;
  position: absolute;
  top: 30px;
  right: 0;
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
    height: "110px",
    transition: "height .3s",
  },
  minMenu: {
    height: "64px",
    transition: "height .3s",
  },
};

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
    this.props.history.push("/" + i18n.language + "/");
  };
  onhandleLogoClick = () => {
    this.setState({ selected: "/" });
    this.props.history.push("/" + i18n.language + "/");
  };
  onhandleTransfer = () => {
    this.props.history.push("/" + i18n.language + "/account/transfer");
  };
  onhandleDeposit = () => {
    this.props.history.push("/" + i18n.language + "/account/deposit");
  };
  handleInboxClick = () => {
    this.props.history.push("/" + i18n.language + "/account/inbox");
  };
  handleRefreshBalanceClick = () => {
    this.tickCount = 0;
    this.props.updateBalanceList();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .map((a) => this.props.getGameBalance(a.abbreviation));
  };
  handleDownloadAppsClick = () => {
    this.setState({ selected: "/download" });
    this.props.history.push("/" + i18n.language + "/download");
    //alert("敬请期待");
  };
  handleContactUsClick = () => {
    this.props.history.push("/" + i18n.language + "/aboutus/contactus");
  };
  HighlightLink = (link) => {};
  handleMenuMouseOver = (to) => {
    this.setState({ ...this.state, hovermenu: to, isHoverMenu: true });
  };
  handleMenuMouseLeave = () => {
    this.setState({ ...this.state, isHoverMenu: false });
  };
  handleClickMenu = (path) => {
    if (path === "vip" && !this.props.account.token) {
      this.props.showLogin(true);
    } else {
      this.setState({ ...this.state, selected: path });
      this.props.history.push("/" + i18n.language + `/${path}`);
    }
  };

  rightMenuImageSwitcher = (item, isHover) => {
    switch (config.theme.toLowerCase()) {
      case "pb":
        return item.img_PB;
      default:
        return isHover ? item.hoverImg : item.img;
    }
  };

  RightMenuItem = (to, image, label, imageHover, subMenuImg, img_PB) => {
    const { classes, theme } = this.props;

    return (
      <RightMenuLI
        active={this.state.selected === `${to}`}
        onClick={() => this.handleClickMenu(to)}
        onMouseOver={() => this.handleMenuMouseOver(to)}
        onMouseLeave={this.handleMenuMouseLeave}
        hoverimg={this.rightMenuImageSwitcher(
          { img: image, hoverImg: imageHover, img_PB: img_PB },
          true
        )}
      >
        <RightMenuImg
          img={this.rightMenuImageSwitcher(
            { img: image, hoverImg: imageHover, img_PB: img_PB },
            false
          )}
          hoverimg={this.rightMenuImageSwitcher(
            { img: image, hoverImg: imageHover, img_PB: img_PB },
            true
          )}
          active={this.state.selected === `${to}`}
          className={`${
            this.state.shouldShow === null
              ? classes.maxIcon
              : this.state.shouldShow
              ? classes.maxIcon
              : classes.minIcon
          }`}
        ></RightMenuImg>
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
        {(() => {
          if (subMenuImg != null) {
            return (
              <MouseOverContainer
                onClick={(e) => e.stopPropagation()}
                style={
                  this.state.shouldShow === null
                    ? { top: "156px" }
                    : this.state.shouldShow
                    ? { top: "156px" }
                    : { top: "114px" }
                }
              >
                <MouseOverBackground>{subMenuImg}</MouseOverBackground>
              </MouseOverContainer>
            );
          } else {
            return null;
          }
        })()}
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
    if (this.props.account.token != null) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0.0;
      var win = window.open(
        "/" + i18n.language + "/joinlottery/" + name,
        "gamewindow",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
      );
      var timer = setInterval(function () {
        if (win.closed) {
          clearInterval(timer);
          if (document.getElementById("audio") != null)
            document.getElementById("audio").volume = 1.0;
        }
      }, 1000);
    } else {
      this.props.showLogin(true);
    }
  };

  handleJoinGameClick = (gameType, path, gameCode, url) => {
    var slotPageGameType = [
      GameTypeEnum.SLOT,
      GameTypeEnum.TIGERSLOT,
      GameTypeEnum.SPORTS,
      GameTypeEnum.ESPORTS,
      GameTypeEnum.TABLEGAME,
      GameTypeEnum.FISH,
    ];
    if (slotPageGameType.indexOf(gameType) >= 0) {
      if (gameType == GameTypeEnum.SPORTS || gameType == GameTypeEnum.ESPORTS) {
        if (!this.props.account.token) {
          this.props.showLogin(true);
        } else {
          if (gameCode === "WGFM" || gameCode === "WGVIA") {
            if (document.getElementById("audio") != null)
              document.getElementById("audio").volume = 0;
            var win = window.open(
              `/${i18n.language}/joinlobbygame/${gameType}/${gameCode}`,
              "gamewindow2"
            );
            var timer = setInterval(function () {
              if (win.closed) {
                clearInterval(timer);
                if (document.getElementById("audio") != null)
                  document.getElementById("audio").volume = 1.0;
              }
            }, 1000);
          } else {
            this.props.history.push(
              "/" + i18n.language + "/sports/play/" + gameCode + "/" + gameType
            );
          }
        }
      } else {
        this.props.history.push(`/${i18n.language}/${path}/${gameCode}`);
      }
    } else {
      if (!this.props.account.token) {
        this.props.showLogin(true);
        return;
      }
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0;
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
              (navigator.userAgent.toLowerCase().indexOf("mac") != -1
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
  render() {
    const { classes, theme } = this.props;

    var containEsports = this.props.game.homePageGameList.filter((game) => {
      return game.type === GameTypeEnum.ESPORTS;
    });

    const MenuItemList = [
      {
        path: "live",
        title: i18n.t("common.live"),
        img: TopMenuLivePNG,
        img_PB: TopMenuLivePNG_PB,
        hoverImg: TopMenuLiveHoverPNG,
        gameType: [GameTypeEnum.LIVELOBBY],
        sorting: 1,
        sortingGMO: 1,
        sortingHK28: 1,
        sortingPB: 2,
        sortingSKY: 1,
        sortingWLGHK: 1,
      },
      {
        path: "chess",
        title: i18n.t("common.chess"),
        img: TopMenuQipaiPNG,
        img_PB: TopMenuQipaiPNG_PB,
        hoverImg: TopMenuQipaiHoverPNG,
        gameType: [GameTypeEnum.QIPAILOBBY],
        sorting: 2,
        sortingGMO: 2,
        sortingHK28: 3,
        sortingPB: 8,
        sortingSKY: 2,
        sortingWLGHK: 2,
      },
      {
        path: "sports",
        title: i18n.t("common.sport"),
        img: TopMenuSportsPNG,
        img_PB: TopMenuSportsPNG_PB,
        hoverImg: TopMenuSportsHoverPNG,
        gameType: [GameTypeEnum.SPORTS],
        sorting: 3,
        sortingGMO: 5,
        sortingHK28: 2,
        sortingPB: 3,
        sortingSKY: 3,
        sortingWLGHK: 3,
      },
      {
        path: "esports",
        title: i18n.t("common.esports"),
        img: TopMenueSportsPNG,
        img_PB: TopMenueSportsPNG_PB,
        hoverImg: TopMenueSportsHoverPNG,
        gameType: [GameTypeEnum.ESPORTS],
        sorting: 4,
        sortingGMO: 7,
        sortingHK28: 2,
        sortingPB: 4,
        sortingSKY: 7,
        sortingWLGHK: 4,
      },
      {
        path: "lottery",
        title: i18n.t("common.lottery"),
        img: TopMenuLotteryPNG,
        img_PB: TopMenuLotteryPNG_PB,
        hoverImg: TopMenuLotteryHoverPNG,
        gameType: [GameTypeEnum.LOTTERYLOBBY],
        sorting: 5,
        sortingGMO: 6,
        sortingHK28: 7,
        sortingPB: 7,
        sortingSKY: 8,
        sortingWLGHK: 6,
      },
      {
        path: `slots`,
        title: i18n.t("common.slot"),
        img: TopMenuTigerPNG,
        img_PB: TopMenuTigerPNG_PB,
        hoverImg: TopMenuTigerHoverPNG,
        gameType: [GameTypeEnum.SLOT],
        sorting: 6,
        sortingGMO: 8,
        sortingHK28: 4,
        sortingPB: 1,
        sortingSKY: 5,
        sortingWLGHK: 7,
      },
      {
        path: `electron`,
        title: i18n.t("common.electron"),
        img: TopMenuSlotPNG,
        img_PB: TopMenuSlotPNG_PB,
        hoverImg: TopMenuSlotHoverPNG,
        gameType: [GameTypeEnum.TABLEGAME],
        sorting: 7,
        sortingGMO: 3,
        sortingHK28: 6,
        sortingPB: 5,
        sortingSKY: 6,
        sortingWLGHK: 8,
      },
      {
        path: `fish`,
        title: config.features.MenuItem_ShootFish
          ? i18n.t("common.shootFish")
          : i18n.t("common.fish"),
        img: TopMenuFishPNG,
        img_PB: TopMenuFishPNG_PB,
        hoverImg: TopMenuFishHoverPNG,
        gameType: [GameTypeEnum.FISH],
        sorting: 8,
        sortingGMO: 4,
        sortingHK28: 5,
        sortingPB: 6,
        sortingSKY: 4,
        sortingWLGHK: 5,
      },
    ];

    const settings = {
      className: "headerSubmenu",
      slidesToShow: 4,
      slidesToScroll: 4,
    };

    return (
      <CustomAppBar hide={this.props.hide}>
        <InnerWrap>
          <TopContainer>
            <TimerContainer>
              <TimerSpan>GMT+8 {this.state.systemDateTime}</TimerSpan>
            </TimerContainer>
            {config.features.DisplayPhone && (
              <TimerContainer style={{ marginLeft: "10px" }}>
                <IconPhone img={IconPhonePNG}></IconPhone>
                <PhoneNumberSpan>
                  {this.props.general.brandsSupport &&
                    this.props.general.brandsSupport.length >= 1 &&
                    this.props.general.brandsSupport[0].phone}
                </PhoneNumberSpan>
              </TimerContainer>
            )}
            <LinkContainer>
              <LanguageChanger
                language={this.props.general.brandLanguage}
                changeLanguage={this.changeLanguage}
              />
            </LinkContainer>
            <RightContainer>
              <BtnCS onClick={this.props.onhandleShowCSClick}>
                {i18n.t("common.cs")}
              </BtnCS>
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
                        onhandleRefreshBalanceClick={
                          this.handleRefreshBalanceClick
                        }
                        wallet={this.props.wallet}
                        game={this.props.game}
                        account={this.props.account}
                      ></MemberContainer>
                    );
                  }
                }
              })()}{" "}
            </RightContainer>
          </TopContainer>
          <BottomContainer>
            <LogoContainer
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
            ></LogoContainer>
            <RightMenuContainer>
              <RightMenuUL
                className="top-menu"
                className={`${
                  this.state.shouldShow === null
                    ? classes.maxMenu
                    : this.state.shouldShow
                    ? classes.maxMenu
                    : classes.minMenu
                }`}
              >
                {MenuItemList.sort((a, b) => {
                  if (config.features.MenuItem_Sorting_HK28) {
                    return a.sortingHK28 > b.sortingHK28 ? 1 : -1;
                  } else if (config.features.MenuItem_Sorting_WLGHK) {
                    return a.sortingWLGHK > b.sortingWLGHK ? 1 : -1;
                  } else if (config.features.MenuItem_Sorting_SKY) {
                    return a.sortingSKY > b.sortingSKY ? 1 : -1;
                  } else if (config.features.MenuItem_Sorting_PB) {
                    return a.sortingPB > b.sortingPB ? 1 : -1;
                  } else if (config.features.MenuItem_Sorting_GMO) {
                    return a.sortingGMO > b.sortingGMO ? 1 : -1;
                  } else {
                    return a.sorting > b.sorting ? 1 : -1;
                  }
                }).map((item, index) => {
                  var list = this.props.game.homePageGameList
                    .filter((game) => item.gameType.indexOf(game.type) >= 0)
                    .sort((a, b) => {
                      if (config.features.LiveGame_Sorting_SKY) {
                        var sortDGFirst = ["DG"];
                        return (
                          sortDGFirst.indexOf(b.abbreviation) -
                          sortDGFirst.indexOf(a.abbreviation)
                        );
                      } else return b - a;
                    });
                  if (list.length > 0) {
                    return (
                      <RightMenuLI
                        key={index}
                        active={this.state.selected === `${item.path}`}
                        onClick={() => this.handleClickMenu(item.path)}
                        onMouseOver={() => this.handleMenuMouseOver(item.path)}
                        onMouseLeave={this.handleMenuMouseLeave}
                        hoverimg={this.rightMenuImageSwitcher(item, true)}
                      >
                        <RightMenuImg
                          img={this.rightMenuImageSwitcher(item, false)}
                          hoverimg={this.rightMenuImageSwitcher(item, true)}
                          active={this.state.selected === `${item.path}`}
                          className={`${
                            this.state.shouldShow === null
                              ? classes.maxIcon
                              : this.state.shouldShow
                              ? classes.maxIcon
                              : classes.minIcon
                          }`}
                        ></RightMenuImg>
                        <RightMenuTextSpan
                          className={`${
                            this.state.shouldShow === null
                              ? classes.maxLabel
                              : this.state.shouldShow
                              ? classes.maxLabel
                              : classes.minLabel
                          }`}
                        >
                          {item.title}
                        </RightMenuTextSpan>
                        <MouseOverContainer
                          onClick={(e) => e.stopPropagation()}
                          style={
                            this.state.shouldShow === null
                              ? { top: "156px" }
                              : this.state.shouldShow
                              ? { top: "156px" }
                              : { top: "114px" }
                          }
                        >
                          <MouseOverBackground>
                            <MouseOverInner>
                              {(() => {
                                return list.length <= 5 ? (
                                  list.map((game, index) => {
                                    return (
                                      <GameFrame
                                        key={index}
                                        style={{
                                          width: `calc(1264px / ${list.length})`,
                                        }}
                                        //TODO: To remove
                                        maintenance={game.status != 0}
                                      >
                                        <GameFrameWrapper>
                                          <Maintenance>
                                            {i18n.t("transfer.maintenance")}
                                          </Maintenance>
                                          {(() => {
                                            var gameCode = game.abbreviation.toLowerCase();
                                            if (gameCode === "joker") {
                                              return (
                                                <HotGameIcon></HotGameIcon>
                                              );
                                            }
                                          })()}
                                          {(() => {
                                            var gameCode = game.abbreviation.toLowerCase();
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
                                            src={`${
                                              process.env.PUBLIC_URL
                                            }/assets/images/pcHeaderMenu/${
                                              item.path
                                            }/${game.abbreviation.toLowerCase()}${
                                              config.features.SportsHideLogo &
                                              (game.abbreviation.toLowerCase() ===
                                                "wgvia" ||
                                                game.abbreviation.toLowerCase() ===
                                                  "wgfm")
                                                ? "-HKJP"
                                                : ""
                                            }.png`}
                                            alt=""
                                            onClick={() => {
                                              if (
                                                game.type ===
                                                  GameTypeEnum.LOTTERYLOBBY ||
                                                game.type === GameTypeEnum.LOBBY
                                              ) {
                                                this.handleJoinLotteryGame(
                                                  game.abbreviation
                                                );
                                              } else {
                                                this.handleJoinGameClick(
                                                  game.type,
                                                  item.path,
                                                  game.abbreviation,
                                                  "/" +
                                                    i18n.language +
                                                    "/joingame/" +
                                                    game.type +
                                                    "/" +
                                                    game.abbreviation
                                                );
                                              }
                                            }}
                                          ></GameImg>
                                        </GameFrameWrapper>
                                      </GameFrame>
                                    );
                                  })
                                ) : (
                                  <Slider {...settings}>
                                    {list.map((game, index) => {
                                      return (
                                        <GameFrame
                                          key={index}
                                          style={{
                                            width: `calc(1264px / ${list.length})`,
                                          }}
                                          //TODO: To remove
                                          maintenance={game.status != 0}
                                        >
                                          <GameFrameWrapper>
                                            <Maintenance>
                                              {i18n.t("transfer.maintenance")}
                                            </Maintenance>
                                            {(() => {
                                              var gameCode = game.abbreviation.toLowerCase();
                                              if (gameCode === "joker") {
                                                return (
                                                  <HotGameIcon></HotGameIcon>
                                                );
                                              }
                                            })()}
                                            {(() => {
                                              var gameCode = game.abbreviation.toLowerCase();
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
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/pcHeaderMenu/${
                                                item.path
                                              }/${game.abbreviation.toLowerCase()}${
                                                config.features.SportsHideLogo &
                                                (game.abbreviation.toLowerCase() ===
                                                  "wgvia" ||
                                                  game.abbreviation.toLowerCase() ===
                                                    "wgfm")
                                                  ? "-HKJP"
                                                  : ""
                                              }.png`}
                                              alt=""
                                              onClick={() => {
                                                if (
                                                  game.type ===
                                                    GameTypeEnum.LOTTERYLOBBY ||
                                                  game.type ===
                                                    GameTypeEnum.LOBBY
                                                ) {
                                                  this.handleJoinLotteryGame(
                                                    game.abbreviation
                                                  );
                                                } else {
                                                  this.handleJoinGameClick(
                                                    game.type,
                                                    item.path,
                                                    game.abbreviation,
                                                    "/" +
                                                      i18n.language +
                                                      "/joingame/" +
                                                      game.type +
                                                      "/" +
                                                      game.abbreviation
                                                  );
                                                }
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
                    );
                  } else {
                    return null;
                  }
                })}

                {this.RightMenuItem(
                  "promotion",
                  TopMenuPromoPNG,
                  i18n.t("common.promotion"),
                  TopMenuPromoHoverPNG,
                  null,
                  TopMenuPromoPNG_PB
                )}

                {config.features.HomePage_DisplayVIP &&
                  this.RightMenuItem(
                    "vip",
                    TopMenuPromoPNG,
                    "VIP",
                    TopMenuPromoHoverPNG,
                    null,
                    TopMenuPromoPNG_PB
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
    wallet: state.wallet,
    general: state.general,
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
  )(withSnackbar(withStyles(styles)(withTheme(Header))))
);
