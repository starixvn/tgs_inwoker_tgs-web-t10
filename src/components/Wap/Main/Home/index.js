import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import { accountAction } from "../../../../api-services/actions/accountAction";
import { GameTypeEnum } from "../../../../api-services/utils/Enum";

import Common from "../../../../utils/Common";

import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import TemplateSwitcher from "./scene-1";
import GamePicker from "./scene-2";
import Banner from "./scene-1/banner";
import LiveChat from "../../../Share/live-chat";
const StyledAppBar = withStyles({
  root: {
    boxShadow: "none",
  },
})(AppBar);

const CustomAppBar = styled(StyledAppBar)`
  background: none;
`;

const GameListContainer = styled.div`
  padding-bottom: 100px;
`;

const NewAppBar = styled.div`
  height: 125px;
  background: ${({ theme }) => theme.appbar};
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0px 0px 0px 0px;
`;

const LogoHolder = styled.div`
  background: url("${({ img }) => img}") no-repeat left center;
  background-size: contain;
  width: 200px;
  height: 100px;
  margin-left: 30px;
  ${({ moveUp }) => {
    return moveUp ? `margin-bottom: 30px;` : "";
  }}
`;

const CustomButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;

const CustomColoredButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ primary, theme }) => {
    return primary ? theme.buttonBackground : "transparent";
  }};
  border: ${({ primary, theme }) => {
    return primary
      ? `solid 1px ${theme.buttonBackground}`
      : `solid 1px ${theme.primaryText}`;
  }};
  color: ${({ primary, theme }) => {
    return primary ? theme.buttonText2 : theme.primaryText;
  }};
  padding: 10px 40px;
  font-size: 28px;
  margin: 0px 10px;
  border-radius: 15px;
`;
const UsernameContainer = styled.div`
  color: ${({ primary, theme }) => {
    return primary ? theme.buttonText2 : "";
  }};
  font-size: 30px;
  font-weight: bold;
  margin-right: 20px;
`;

const UsernameText = styled.div`
  color: ${({ theme }) => theme.primaryText};
`;

const Balance = styled.div`
  font-size: 20px;
  text-align: right;
  font-weight: normal;
`;

const SceneTwoAppBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const SceneTwoAppBarTitle = styled.div`
  font-size: 50px;
  font-weight: bold;
`;

const BackButton = styled.div`
  width: 50px;
  height: 50px;
  mask: ${`url(${
    process.env.PUBLIC_URL + "/assets/images/wapp/btn-back-white.png"
  }) no-repeat center /
  contain;`};
  background: #fff;
  position: absolute;
  bottom: 10px;
  left: 15px;
`;
const TheContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PhoneHolder = styled.div`
  font-size: 20px;
  width: 100%;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: #fff;
  margin-right: 10px;
  mask: ${({ src }) => {
    return `url(${src}) no-repeat center /
contain;`;
  }};
`;

const MakeFloatCenter = styled.div`
  display: flex;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
`;

const RightContainer = styled.div`
  padding-right: 215px;
`;

var sortingHK28 = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SLOT,
  GameTypeEnum.FISH,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.LOTTERYLOBBY,
];

var sortingSKY = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.FISH,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.LOTTERYLOBBY,
];

var sortingPB = [
  GameTypeEnum.SLOT,
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.FISH,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.QIPAILOBBY,
];

var sortingWLGHK = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.SPORTS,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.FISH,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.SLOT,
  GameTypeEnum.TABLEGAME,
];

var sortingGMO = [
  GameTypeEnum.LIVELOBBY,
  GameTypeEnum.QIPAILOBBY,
  GameTypeEnum.TABLEGAME,
  GameTypeEnum.FISH,
  GameTypeEnum.SPORTS,
  GameTypeEnum.LOTTERYLOBBY,
  GameTypeEnum.ESPORTS,
  GameTypeEnum.SLOT,
];
class Home extends Component {
  state = {
    value: 0,
    marqueeText: [],
    banner_list: [],
    gameTypeListSorting: [],
    selectedGameType: 0,
    tab1: {
      limit: 10,
      page: 0,
      totalPage: 0,
      list: [],
      verifyList: [],
    },
    tab2: {
      limit: 10,
      page: 0,
      totalPage: 0,
      list: [],
    },
    loading: true,
    scene: 1,
    selected: "",
    listOfGame: [],
  };

  componentWillUnmount() {
    if (config.wapVersion === 2) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  componentDidMount() {
    if (config.wapVersion === 2) {
      window.addEventListener("scroll", this.handleScroll);
    }
    if (this.props.game.homePageGameList.length > 0) {
      var gameTypeListSorting = this.formatSortedGameList();
      this.setState({
        ...this.state,
        gameTypeListSorting: gameTypeListSorting,
        selectedGameType: gameTypeListSorting[0],
      });
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var gameTypeListSorting = this.formatSortedGameList();
      this.setState({
        ...this.state,
        gameTypeListSorting: gameTypeListSorting,
        selectedGameType: gameTypeListSorting[0],
      });
    }
  }

  formatSortedGameList() {
    var currentType = -1;
    var gameTypeListSorting = [];
    var displayGameType = Common.GetDisplayGameType();

    this.props.game.homePageGameList
      .filter((a) => {
        // if (a.type !== GameTypeEnum.ESPORTS) {
        //   // #stupidButWorkingSolution
        //   return displayGameType.indexOf(a.type) >= 0;
        // }
        return displayGameType.indexOf(a.type) >= 0;
      })
      .sort((a, b) => {
        return a.type - b.type;
      })
      .map((row, index) => {
        if (currentType !== row.type) {
          gameTypeListSorting.push(row.type);
        }
        currentType = row.type;
      });

    return gameTypeListSorting.sort((a, b) => {
      if (config.features.MenuItem_Sorting_WLGHK)
        return sortingWLGHK.indexOf(a) - sortingWLGHK.indexOf(b);
      else if (config.features.MenuItem_Sorting_HK28)
        return sortingHK28.indexOf(a) - sortingHK28.indexOf(b);
      else if (config.features.MenuItem_Sorting_SKY)
        return sortingSKY.indexOf(a) - sortingSKY.indexOf(b);
      else if (config.features.MenuItem_Sorting_PB)
        return sortingPB.indexOf(a) - sortingPB.indexOf(b);
      else if (config.features.MenuItem_Sorting_GMO)
        return sortingGMO.indexOf(a) - sortingGMO.indexOf(b);
      else return a - b;
    });
  }

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  handleScroll = (e) => {
    const doc = document.documentElement;

    let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    top = top + 530;

    let reachedTheForthItem =
      this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) > 3 &&
      this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) < 6;
    let reachedTheSeventhItem =
      this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) >= 6;
    if (this.state.gameTypeListSorting.length > 5) {
      if (reachedTheForthItem) {
        this.scrollRef.current.scrollTo(0, 500);
      } else if (reachedTheSeventhItem) {
        this.scrollRef.current.scrollTo(0, 750);
      } else {
        this.scrollRef.current.scrollTo(0, 0);
      }
    } else {
      this.scrollRef.current.scrollTo(
        0,
        this.state.gameTypeListSorting.indexOf(this.state.selectedGameType) *
          150
      );
    }

    var D = document;
    var docHeight = Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );
    var gameTypeListSorting = this.state.gameTypeListSorting;
    let gameType = gameTypeListSorting[0];
    if (window.innerHeight + window.scrollY >= docHeight - 2) {
      gameType = gameTypeListSorting[gameTypeListSorting.length - 1];
    } else {
      for (var i = gameTypeListSorting.length - 1; i >= 0; i--) {
        if (
          top >
          document.getElementById("gameType" + gameTypeListSorting[i]).offsetTop
        ) {
          gameType = gameTypeListSorting[i];
          break;
        }
      }
    }

    this.setState({ ...this.state, selectedGameType: gameType });
  };
  handleGameTypeClick = (gameType) => {
    let pos = document.getElementById("gameType" + gameType).offsetTop;

    window.scrollTo({ top: pos - 520, behavior: "smooth" });
  };

  handleJoinLotteryGame = (game) => {
    if (this.props.account.token != null) {
      window.open("/" + i18n.language + "/joinlottery/" + game, "_blank");
    } else {
      this.props.appHistory.push("/" + i18n.language + "/login");
    }
  };

  handleJoinOtherGame = (type, params, game_platform_id) => {
    if (!this.props.account.token) {
      this.props.appHistory.push("/" + i18n.language + "/login");
      return;
    }
    if (
      type === GameTypeEnum.SLOT ||
      type === GameTypeEnum.TIGERSLOT ||
      type === GameTypeEnum.TABLEGAME ||
      type === GameTypeEnum.FISH
    ) {
      this.props.navigate(`/slots/${params}/${type}`);
    } else {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0;
      var win = window.open(
        "/" + i18n.language + "/joinlobbygame/" + type + "/" + params,
        "_blank"
      );
      var timer = setInterval(function () {
        if (win.closed) {
          clearInterval(timer);
          if (document.getElementById("audio") != null)
            document.getElementById("audio").volume = 1.0;
        }
      }, 1000);
    }
  };

  handleGameClick = (type, params, game_platform_id) => {
    type === GameTypeEnum.LOTTERYLOBBY || type === GameTypeEnum.LOTTERY
      ? this.handleJoinLotteryGame(params)
      : this.handleJoinOtherGame(type, params, game_platform_id);
  };
  handleSignupClick = () => {
    this.props.appHistory.push("/" + i18n.language + "/login");
  };

  handleRegisterClick = () => {
    this.props.appHistory.push("/" + i18n.language + "/login?do=register");
  };
  handleLogout = () => {
    this.props.accountLogout(this.props.account.token).then((response) => {
      if (response.IsSuccess) {
        this.props.navigate("/" + i18n.language + "/login");
      }
    });
  };

  convertGameTypeToText = (gameType) => {
    switch (gameType) {
      case GameTypeEnum.LIVE:
        return i18n.t("wap.main.home.gameTab.live");
      case GameTypeEnum.LIVELOBBY:
        return i18n.t("wap.main.home.gameTab.live");
      case GameTypeEnum.QIPAI:
        return i18n.t("wap.main.home.gameTab.chess");
      case GameTypeEnum.QIPAILOBBY:
        return i18n.t("wap.main.home.gameTab.chess");
      case GameTypeEnum.SPORTS:
        return i18n.t("common.sport");
      case GameTypeEnum.ESPORTS:
        return i18n.t("common.esports");
      case GameTypeEnum.LOTTERYLOBBY:
        return i18n.t("wap.main.home.gameTab.lottery");
      case GameTypeEnum.SLOT:
        return i18n.t("wap.main.home.gameTab.slot");
      case GameTypeEnum.FISH:
        if (config.features.MenuItem_ShootFish) {
          return i18n.t("common.shootFish");
        } else {
          return i18n.t("wap.main.home.gameTab.fish");
        }

      case GameTypeEnum.TIGERSLOT:
      default:
        return i18n.t("wap.main.home.gameTab.electron");
    }
  };
  getImgPrefix(gameType) {
    switch (gameType) {
      case GameTypeEnum.FISH:
        return "fish";
      case GameTypeEnum.LIVE:
        return "live";
      case GameTypeEnum.LIVELOBBY:
        return "live";
      case GameTypeEnum.LOTTERY:
        return "lottery";
      case GameTypeEnum.LOTTERYLOBBY:
        return "lottery";
      case GameTypeEnum.QIPAI:
        return "chess";
      case GameTypeEnum.QIPAILOBBY:
        return "chess";
      case GameTypeEnum.SLOT:
        return "slot";
      case GameTypeEnum.SPORTS:
        return "sports";
      case GameTypeEnum.ESPORTS:
        return "esports";
      case GameTypeEnum.TIGERSLOT:
        return "slot";
      case GameTypeEnum.TABLEGAME:
        return "table";
      default:
        return "";
    }
  }
  getBannerTemplate(defaultVal) {
    switch (config.theme.toLowerCase()) {
      case "pb":
        return "T5";
      default:
        return defaultVal;
    }
  }

  gameMenu = [
    {
      image: "1",
      title: i18n.t("common.sport"),
      big: true,
      type: [GameTypeEnum.SPORTS],
      sorting: 1,
      sortingGMO: 5,
      sortingHK28: 2,
      sortingPB: 3,
      sortingSKY: 3,
      sortingWLGHK: 3,
    },
    {
      image: "2",
      title: i18n.t("common.live"),
      big: true,
      type: [GameTypeEnum.LIVELOBBY],
      sorting: 2,
      sortingGMO: 1,
      sortingHK28: 1,
      sortingPB: 2,
      sortingSKY: 1,
      sortingWLGHK: 1,
    },
    {
      image: "8",
      title: i18n.t("common.esports"),
      big: false,
      type: [GameTypeEnum.ESPORTS],
      sorting: 3,
      sortingGMO: 7,
      sortingHK28: 2,
      sortingPB: 4,
      sortingSKY: 7,
      sortingWLGHK: 4,
    },
    {
      image: "3",
      title: i18n.t("common.slot"),
      big: false,
      type: [GameTypeEnum.SLOT],
      sorting: 4,
      sortingGMO: 8,
      sortingHK28: 4,
      sortingPB: 1,
      sortingSKY: 5,
      sortingWLGHK: 7,
    },
    {
      image: "4",
      title: config.features.MenuItem_ShootFish
        ? i18n.t("common.shootFish")
        : i18n.t("common.fish"),
      big: false,
      type: [GameTypeEnum.FISH],
      sorting: 5,
      sortingGMO: 4,
      sortingHK28: 5,
      sortingPB: 6,
      sortingSKY: 4,
      sortingWLGHK: 5,
    },
    {
      image: "5",
      title: i18n.t("common.lottery"),
      big: false,
      type: [GameTypeEnum.LOTTERY],
      sorting: 6,
      sortingGMO: 6,
      sortingHK28: 7,
      sortingPB: 7,
      sortingSKY: 8,
      sortingWLGHK: 6,
    },
    {
      image: "6",
      title: i18n.t("common.electron"),
      big: false,
      type: [GameTypeEnum.TABLEGAME],
      sorting: 7,
      sortingGMO: 3,
      sortingHK28: 6,
      sortingPB: 5,
      sortingSKY: 6,
      sortingWLGHK: 8,
    },
    {
      image: "7",
      title: i18n.t("common.chess"),
      big: false,
      type: [GameTypeEnum.QIPAILOBBY],
      sorting: 8,
      sortingGMO: 2,
      sortingHK28: 3,
      sortingPB: 8,
      sortingSKY: 2,
      sortingWLGHK: 2,
    },
  ];

  gameMenu2 = [
    {
      image: "1",
      title: i18n.t("common.sport"),
      big: true,
      type: [GameTypeEnum.SPORTS],
      sorting: 1,
      sortingGMO: 5,
      sortingHK28: 2,
      sortingPB: 3,
      sortingSKY: 3,
      sortingWLGHK: 3,
    },
    {
      image: "8",
      title: i18n.t("common.esports"),
      big: false,
      type: [GameTypeEnum.ESPORTS],
      sorting: 2,
      sortingGMO: 7,
      sortingHK28: 2,
      sortingPB: 4,
      sortingSKY: 7,
      sortingWLGHK: 4,
    },
    {
      image: "2",
      title: i18n.t("common.live"),
      big: true,
      type: [GameTypeEnum.LIVELOBBY],
      sorting: 3,
      sortingGMO: 1,
      sortingHK28: 1,
      sortingPB: 2,
      sortingSKY: 1,
      sortingWLGHK: 1,
    },
    {
      image: "7",
      title: i18n.t("common.chess"),
      big: false,
      type: [GameTypeEnum.QIPAILOBBY],
      sorting: 4,
      sortingGMO: 2,
      sortingHK28: 3,
      sortingPB: 8,
      sortingSKY: 2,
      sortingWLGHK: 2,
    },
    {
      image: "4",
      title: config.features.MenuItem_ShootFish
        ? i18n.t("common.shootFish")
        : i18n.t("common.fish"),
      big: false,
      type: [GameTypeEnum.FISH],
      sorting: 5,
      sortingGMO: 4,
      sortingHK28: 5,
      sortingPB: 6,
      sortingSKY: 4,
      sortingWLGHK: 5,
    },
    {
      image: "5",
      title: i18n.t("common.lottery"),
      big: false,
      type: [GameTypeEnum.LOTTERY],
      sorting: 6,
      sortingGMO: 6,
      sortingHK28: 7,
      sortingPB: 7,
      sortingSKY: 8,
      sortingWLGHK: 6,
    },
    {
      image: "3",
      title: i18n.t("common.slot"),
      big: false,
      type: [GameTypeEnum.SLOT],
      sorting: 7,
      sortingGMO: 8,
      sortingHK28: 4,
      sortingPB: 1,
      sortingSKY: 5,
      sortingWLGHK: 7,
    },

    {
      image: "6",
      title: i18n.t("common.electron"),
      big: false,
      type: [GameTypeEnum.TABLEGAME],
      sorting: 8,
      sortingGMO: 3,
      sortingHK28: 6,
      sortingPB: 5,
      sortingSKY: 6,
      sortingWLGHK: 8,
    },
  ];

  shiftScene = (scene, type) => {
    this.setState({
      ...this.state,
      scene: scene,
      selected: type,
    });
  };

  changeShowGame = (type) => {
    this.setState({
      selected: type,
      listOfGame: this.props.game.homePageGameList.filter(
        (game) => type.indexOf(game.type) >= 0
      ),
    });
  };

  scenes = (scene) => {
    switch (scene) {
      case 1:
        return (
          <TemplateSwitcher
            template={config.wapVersion}
            gameTypeListSorting={this.state.gameTypeListSorting}
            homePageGameList={this.props.game.homePageGameList}
            getImgPrefix={this.getImgPrefix}
            selectedGameType={this.state.selectedGameType}
            convertGameTypeToText={this.convertGameTypeToText}
            handleGameTypeClick={this.handleGameTypeClick}
            handleGameClick={this.handleGameClick}
            gameMenu={this.gameMenu}
            gameMenu2={this.gameMenu2}
            shiftScene={this.shiftScene}
            changeShowGame={this.changeShowGame}
            scrollRef={this.scrollRef}
            handleSignupClick={this.handleSignupClick}
            listOfGame={this.state.listOfGame}
            getBannerTemplate={this.getBannerTemplate}
          />
        );
      case 2:
        return (
          <GamePicker
            template={config.wapVersion}
            listOfGame={this.state.listOfGame}
            gameTypeListSorting={this.state.gameTypeListSorting}
            homePageGameList={this.props.game.homePageGameList}
            getImgPrefix={this.getImgPrefix}
            selectedGameType={this.state.selectedGameType}
            convertGameTypeToText={this.convertGameTypeToText}
            handleGameTypeClick={this.handleGameTypeClick}
            handleGameClick={this.handleGameClick}
            gameMenu={this.gameMenu}
            shiftScene={this.shiftScene}
            changeShowGame={this.changeShowGame}
            selected={this.state.selected}
          />
        );
      default:
        return "";
    }
  };
  getVIPName = (id) => {
    switch (id) {
      case 1:
        return "VIP1";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        return "";
    }
  };
  updownSwitcher = (template) => {
    switch (template) {
      case 1:
      case "1":
        return "up";
      case 2:
      case "2":
        return "fixed";
      case 3:
      case "3":
        return "scroll";
      case 4:
      case "4":
        return "no-gap-down";
      case 5:
      case "5":
        return "scroll";
      case 6:
      case "6":
        return "no-gap-up";
      case 7:
      case "7":
        return "no-gap-up";
      case 8:
      case "8":
        return "no-gap-up";
      case 9:
      case "9":
        return "no-gap-up";
      case 10:
        return "no-gap-up";
      default:
        return "up";
    }
  };

  render() {
    return (
      <React.Fragment>
        <CustomAppBar position="fixed" color="default" scene={this.state.scene}>
          {/* {(() => {
            if (this.props.ui.board_list.length === 0) {
              return <React.Fragment></React.Fragment>;
            } else {
              return <Slider list={this.props.ui.board_list}></Slider>;
            }
          })()} */}
          {this.state.scene === 1 ? (
            <NewAppBar>
              <div>
                <TheContainer>
                  <LogoHolder
                    moveUp={
                      config.features.DisplayPhone || config.features.CustomVIP
                    }
                    img={
                      this.props.general.brand &&
                      this.props.general.brand.mobileLogoUrl
                    }
                  />
                  {(() => {
                    if (!this.props.account.token) {
                      return (
                        <MakeFloatCenter>
                          <CustomButtonContainer>
                            <CustomColoredButton
                              onClick={this.handleSignupClick}
                            >
                              {i18n.t("common.login")}
                            </CustomColoredButton>
                            <CustomColoredButton
                              primary
                              onClick={this.handleRegisterClick}
                            >
                              {i18n.t("common.register")}
                            </CustomColoredButton>
                          </CustomButtonContainer>
                        </MakeFloatCenter>
                      );
                    } else {
                      return (
                        <MakeFloatCenter>
                          <CustomButtonContainer>
                            <UsernameContainer>
                              <UsernameText>
                                {this.props.account.info.member_username}
                              </UsernameText>

                              {config.features.HomePageDisplayBalance && (
                                <Balance>
                                  {this.props.wallet.mainSymbol +
                                    Common.formatNumberWithThousand(
                                      this.props.wallet.mainBalance +
                                        this.props.game.providerList
                                          .filter(
                                            (item) =>
                                              item.status === 0 &&
                                              item.transferwallet === true
                                          )
                                          .reduce(
                                            (a, v) => (a = a + v.balance),
                                            0
                                          )
                                    )}
                                </Balance>
                              )}
                            </UsernameContainer>
                            <CustomColoredButton
                              primary
                              onClick={this.handleLogout}
                            >
                              {i18n.t("common.exit")}
                            </CustomColoredButton>
                          </CustomButtonContainer>
                        </MakeFloatCenter>
                      );
                    }
                  })()}
                </TheContainer>
              </div>
              {config.features.DisplayPhone &&
                this.props.general.brandsSupport.length > 0 && (
                  <PhoneHolder>
                    <LeftContainer>
                      <Icon
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/phone.png`
                        }
                      ></Icon>
                      {this.props.general.brandsSupport &&
                        this.props.general.brandsSupport.length > 0 &&
                        this.props.general.brandsSupport[0].phone}

                      {this.props.account.token && config.features.CustomVIP && (
                        <React.Fragment>
                          <Icon
                            style={{ marginLeft: "10px" }}
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/wapp/vip.png`
                            }
                          ></Icon>
                          {this.getVIPName(
                            this.props.account.info.member_level_id
                          )}
                        </React.Fragment>
                      )}
                    </LeftContainer>
                    <RightContainer></RightContainer>
                  </PhoneHolder>
                )}
            </NewAppBar>
          ) : (
            <NewAppBar>
              <SceneTwoAppBar>
                <div
                  onClick={() => {
                    this.shiftScene(1, "");
                    this.changeShowGame("");
                  }}
                >
                  <BackButton />
                </div>
                <SceneTwoAppBarTitle>
                  {this.gameMenu
                    .filter((a) => a.type === this.state.selected)
                    .map((data) => {
                      return data.title;
                    })}
                </SceneTwoAppBarTitle>
                <div></div>
              </SceneTwoAppBar>
            </NewAppBar>
          )}

          {
            //  this.state.scene === 1 && (
            //    <div>
            //      <SliderContainer>
            //        <Slider list={this.props.ui.board_list}></Slider>
            //      </SliderContainer>
            //      <AnnouncementContainer>
            //        <AnnouncementTitle>
            //          <AnnounceIcon
            //            icon={
            //              process.env.PUBLIC_URL +
            //              `/assets/images/wapp/announce.svg`
            //            }
            //          />
            //          {i18n.t('wap.main.home.profile.announcement')}
            //        </AnnouncementTitle>
            //        <MarqueeContainer>
            //          <Marquee />
            //        </MarqueeContainer>
            //      </AnnouncementContainer>
            //    </div>
            //  )
          }
          {
            //    <FixedContainer>
            //    <AnnouncementContainer>
            //      <AnnouncementTitle>
            //        {i18n.t('wap.main.home.profile.announcement')}
            //      </AnnouncementTitle>
            //      <MarqueeContainer>
            //        <Marquee />
            //      </MarqueeContainer>
            //    </AnnouncementContainer>
            //    <ProfileContainer
            //      src={
            //        process.env.PUBLIC_URL + `/assets/images/wapp/home-profile.png`
            //      }
            //    >
            //      <ProfileContainerTop>
            //        {(() => {
            //          if (this.props.account.token != null) {
            //            return (
            //              <React.Fragment>
            //                <WelcomeLabel>
            //                  {i18n.t(
            //                    'wap.main.home.profile.welcomeBack'
            //                  )}
            //                </WelcomeLabel>
            //                <WelcomeUsernameLabel>
            //                  {this.props.account.info.member_username}
            //                </WelcomeUsernameLabel>
            //              </React.Fragment>
            //            )
            //          } else {
            //            return (
            //              <WelcomeLabel>
            //                {i18n.t(
            //                  'wap.main.home.profile.pleaseLogin'
            //                )}
            //              </WelcomeLabel>
            //            )
            //          }
            //        })()}
            //
            //        <ProfileLink onClick={() => this.props.navigate('/profile')}>
            //          {i18n.t('wap.main.home.profile.profile')}
            //        </ProfileLink>
            //      </ProfileContainerTop>
            //      <ProfileContainerBottom>
            //        <BalanceContainer>
            //          {(() => {
            //            if (this.props.account.token != null) {
            //              return (
            //                <React.Fragment>
            //                  <BalanceAmount>
            //                    {this.props.wallet.mainSymbol}{' '}
            //                    {Common.formatNumberWithThousand(
            //                      this.props.wallet.mainBalance +
            //                        this.props.game.providerList
            //                          .filter(
            //                            (item) =>
            //                              item.status === 0 &&
            //                              item.transferwallet === true
            //                          )
            //                          .reduce((a, v) => (a = a + v.balance), 0)
            //                    )}
            //                  </BalanceAmount>
            //                  <WalletTypeLabel>
            //                    {i18n.t(
            //                      'wap.main.home.profile.mainAccount'
            //                    )}
            //                  </WalletTypeLabel>
            //                </React.Fragment>
            //              )
            //            } else {
            //              return (
            //                <ButtonSignup onClick={this.handleSignupClick}>
            //                  {i18n.t(
            //                    'wap.main.home.profile.loginRegister'
            //                  )}
            //                </ButtonSignup>
            //              )
            //            }
            //          })()}
            //        </BalanceContainer>
            //        <WalletActionContainer>
            //          <WalletActionUL>
            //            <WalletActionLI
            //              onClick={() => this.props.navigate('/deposit')}
            //            >
            //              <WalletActionIcon
            //                img={
            //                  process.env.PUBLIC_URL +
            //                  `/assets/images/wapp/icon-deposit.png`
            //                }
            //              ></WalletActionIcon>
            //              {i18n.t('common.deposit')}
            //            </WalletActionLI>
            //            <WalletActionLI
            //              onClick={() => this.props.navigate('/transfer')}
            //            >
            //              <WalletActionIcon
            //                img={
            //                  process.env.PUBLIC_URL +
            //                  `/assets/images/wapp/icon-transfer.png`
            //                }
            //              ></WalletActionIcon>
            //              {i18n.t('common.transfer')}
            //            </WalletActionLI>
            //            <WalletActionLI
            //              onClick={() => this.props.navigate('/withdrawal')}
            //            >
            //              <WalletActionIcon
            //                img={
            //                  process.env.PUBLIC_URL +
            //                  `/assets/images/wapp/icon-withdrawal.png`
            //                }
            //              ></WalletActionIcon>
            //              {i18n.t('common.withdrawal')}
            //            </WalletActionLI>
            //          </WalletActionUL>
            //        </WalletActionContainer>
            //      </ProfileContainerBottom>
            //    </ProfileContainer>
            //  </FixedContainer>
          }
        </CustomAppBar>
        {this.state.scene === 1 && (
          <Banner
            height={config.brand === "GMO" && "315px"}
            sameAsText={config.brand === "GMO"}
            updown={this.updownSwitcher(config.wapVersion)}
            banner={this.props.general.banner}
          />
        )}
        <GameListContainer scene={this.state.scene}>
          {this.scenes(this.state.scene)}
        </GameListContainer>
        {config.features.LiveChatVendor.brand &&
          config.features.LiveChatVendor.license && (
            <LiveChat
              license={config.features.LiveChatVendor.license}
              vendor={config.features.LiveChatVendor.brand}
            />
          )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    ui: state.ui,
    wallet: state.wallet,
    game: state.game,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
