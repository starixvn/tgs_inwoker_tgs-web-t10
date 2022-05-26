import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Common from "../../../utils/Common";

import Slider from "./Slider";
import { withRouter } from "react-router-dom";

import Marquee from "./Marquee";

import {
  SHOW_MODAL,
  SHOW_LOGIN,
} from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";

import i18n from "../../../utils/i18n";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";
import BGJPG from "../../../assets/images/home/section/bg.jpg";
import Section1ChessPNG from "../../../assets/images/home/section/section1-chess.png";
import Section1FishPNG from "../../../assets/images/home/section/section1-fish.png";
import Section1LotteryPNG from "../../../assets/images/home/section/section1-lottery.png";
import Section1SlotPNG from "../../../assets/images/home/section/section1-slot.png";
import Section1ElectronPNG from "../../../assets/images/home/section/section1-electron.png";
import Section1SportPNG from "../../../assets/images/home/section/section1-sport.png";
import Section1LivePNG from "../../../assets/images/home/section/section1-live.png";
import TextBgPNG from "../../../assets/images/home/section/text-bg.png";
import ScrollAnimation from "react-animate-on-scroll";
import { Grid } from "@material-ui/core";

import config from "../../../config/config";

import PopupAnnouncement from "./PopupAnnouncement";
const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  position: relative;
`;

const MarqueeContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const SectionContainer = styled.div`
  background: url(${BGJPG}) no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
`;
const FirstSection = styled.div`
  width: 1280px;
  margin: 0 auto;
  min-height: 460px;
  padding-top: 110px;
  overflow: auto;
`;
const FirstSectionItemBg2 = styled.div`
  background: url(${TextBgPNG}) no-repeat;
  background-size: 283px 50px;
  position: absolute;
  bottom: 44px;
  left: 13px;
  height: 50px;
  width: 0;
  transition: width 300ms linear;
`;
const FirstSectionItemBg = styled(Grid)`
  position: absolute;
  bottom: 38px;
  left: ${(props) => (i18n.language === "vi-VN" ? "0px" : "16px")};
  height: 68px;
  width: 283px;
  padding-left: 30px;
`;
const FirstSectionItemLabel = styled(Grid)`
  text-transform: uppercase;
`;
const FirstSectionItem = styled(Grid)`
  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
  margin: 0 auto;
  width: 320px;
  height: 282px;
  color: #fff;
  font-size: ${(props) => (i18n.language === "vi-VN" ? "1.4em" : "1.6em")};
  padding-top: 215px;
  padding-left: 38px;
  position: relative;
  &:hover {
    cursor: pointer;
    ${FirstSectionItemBg2} {
      width: 283px;
    }
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);

    var displayGame = this.getHomePageDisplayGame();

    this.state = {
      marqueeText: [],
      banner_list: [],
      wm: displayGame.wm,
      ky: displayGame.ky,
      openAnnouncement: false,
      showPromotion: false,
    };
  }

  componentDidMount() {
    // let promotionId = "";
    // let promotionChannelId = "";
    // if (this.props.match.params) {
    //   promotionId = this.props.match.params.promotionid || "";
    //   promotionChannelId = this.props.match.params.promotionchannelid || "";
    // }
    // localStorage.setItem("promotionId", promotionId);
    // localStorage.setItem("promotionChannelId", promotionChannelId);
  }
  componentDidUpdate(preProps) {
    if (config.features.PopupAnnouncement) {
      if (
        this.props.ui.mains &&
        this.props.ui.mains !== preProps.ui.mains &&
        this.props.ui.mains.length > 0
      ) {
        this.setState({
          openAnnouncement: true,
          showPromotion: false,
        });
      }
    }

    if (config.features.PopupPromotion) {
      if (
        this.props.general.promotionList.items !==
          preProps.general.promotionList.items &&
        this.props.general.promotionList.items.length > 0
      ) {
        if (!this.state.openAnnouncement) {
          this.setState({
            showPromotion: true,
          });
        }
      }
    }

    if (
      preProps.game.homePageGameList.length !==
        this.props.game.homePageGameList.length &&
      this.props.game.homePageGameList.length > 0
    ) {
      var displayGame = this.getHomePageDisplayGame();
      this.setState({
        ...this.state,
        wm: displayGame.wm,
        ky: displayGame.ky,
      });
    }
  }
  getHomePageDisplayGame() {
    var wm = null,
      ky = null;
    if (this.props.game.homePageGameList.length > 0) {
      var wmList = this.props.game.homePageGameList.filter(
        (item) => item.type === "Wm"
      );
      var kyList = this.props.game.homePageGameList.filter(
        (item) => item.abbreviation === "Ky"
      );
      if (wmList.length >= 1) {
        wm = wmList[0];
      } else {
        wm = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.LIVE
        )[0];
      }
      if (kyList.length >= 1) {
        ky = kyList[0];
      } else {
        ky = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.QIPAI
        )[0];
      }
    }

    return { wm, ky };
  }
  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (this.props.token !== "" && this.props.token !== null) {
      var slotPageGameType = [
        GameTypeEnum.FISH,
        GameTypeEnum.SLOT,
        GameTypeEnum.TIGERSLOT,
        GameTypeEnum.SPORTS,
        GameTypeEnum.ESPORTS,
        GameTypeEnum.TABLEGAME,
      ];
      if (slotPageGameType.indexOf(gameType) >= 0) {
        if (
          gameType == GameTypeEnum.SPORTS ||
          gameType == GameTypeEnum.ESPORTS
        ) {
          if (!this.props.token) {
            this.props.showLogin(true);
          } else {
            this.props.history.push(
              `/${i18n.language}/sports/play/${gameCode}/${gameType}`
            );
          }
        } else {
          this.props.history.push(`/${i18n.language}/${path}/${gameCode}`);
        }
      } else {
        Common.PopupCenter(url, gameCode, 1280, 720);
      }
    } else {
      this.props.showLogin(true);
    }
  };

  handleNavigateClick = (url) => {
    this.props.history.push(url);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  render() {
    return (
      <HomeContainer>
        <SliderContainer>
          <Slider list={this.props.ui.board_list}></Slider>
          <MarqueeContainer>
            <Marquee text={this.props.ui.marqueeText}></Marquee>
          </MarqueeContainer>
        </SliderContainer>
        <SectionContainer>
          <FirstSection
            style={{
              display: "grid",
              "grid-template-columns": config.features
                .HomePage_FirstSection6Widget
                ? "auto auto auto"
                : "auto auto auto auto",
            }}
          >
            {(() => {
              const MenuItemList = [
                {
                  path: "sports",
                  title: config.features.MenuItem_HeaderSportsTranslation2
                    ? i18n.t("mess888.wap.sports")
                    : i18n.t("web.home.Section1Sport"),
                  img: Section1SportPNG,
                  gameType: [GameTypeEnum.SPORTS, GameTypeEnum.ESPORTS],
                  sortingHK28: 2,
                  sorting: 1,
                },
                {
                  path: "chess",
                  title: i18n.t("web.home.Section1Chess"),
                  img: Section1ChessPNG,
                  gameType: [GameTypeEnum.QIPAILOBBY],
                  sortingHK28: 3,
                  sorting: 2,
                },
                {
                  path: `slots`,
                  title: i18n.t("web.home.Section1Slot"),
                  img: Section1SlotPNG,
                  gameType: [GameTypeEnum.SLOT],
                  sortingHK28: 4,
                  sorting: 3,
                },
                {
                  path: `electron`,
                  title: i18n.t("web.home.Section1Electron"),
                  img: Section1ElectronPNG,
                  gameType: [GameTypeEnum.TABLEGAME],
                  sortingHK28: 6,
                  sorting: 4,
                },
                {
                  path: `fish`,
                  title: i18n.t("web.home.Section1Fishing"),
                  img: Section1FishPNG,
                  gameType: [GameTypeEnum.FISH],
                  sortingHK28: 5,
                  sorting: 5,
                },
                {
                  path: "lottery",
                  title: i18n.t("web.home.Section1Lottery"),
                  img: Section1LotteryPNG,
                  gameType: [GameTypeEnum.LOTTERYLOBBY],
                  sortingHK28: 7,
                  sorting: 6,
                },
                {
                  path: "live",
                  title: i18n.t("web.home.Section1Live"),
                  img: Section1LivePNG,
                  gameType: [GameTypeEnum.LIVELOBBY],
                  sortingHK28: 1,
                  sorting: 7,
                },
              ];
              var count = 0;
              return MenuItemList.sort((a, b) => {
                if (config.features.MenuItem_Sorting_HK28) {
                  return a.sortingHK28 > b.sortingHK28 ? 1 : -1;
                } else {
                  return a.sorting > b.sorting ? 1 : -1;
                }
              }).map((item, index) => {
                var list = this.props.game.homePageGameList.filter(
                  (game) => item.gameType.indexOf(game.type) >= 0
                );

                if (
                  list.length > 0 &&
                  index < (config.features.PopupAnnouncement ? 6 : 4)
                ) {
                  count++;
                  return (
                    <ScrollAnimation
                      animateIn="fadeInLeft"
                      duration={1}
                      animateOnce={true}
                      style={{ overflow: "visible" }}
                    >
                      <FirstSectionItem
                        item
                        spacing={0}
                        img={item.img}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          this.props.history.push(
                            `/${i18n.language}/${item.path}`
                          );
                        }}
                      >
                        <FirstSectionItemBg2></FirstSectionItemBg2>
                        <FirstSectionItemBg
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                        >
                          <FirstSectionItemLabel item>
                            {item.title}
                          </FirstSectionItemLabel>
                        </FirstSectionItemBg>
                      </FirstSectionItem>
                    </ScrollAnimation>
                  );
                }
              });
            })()}
          </FirstSection>
          <SecondSection />
        </SectionContainer>
        {this.props.game.providerList.filter((e) => {
          return e.abbreviation === "KY";
        }).length === 0 ? (
          <FourthSection></FourthSection>
        ) : (
          <ThirdSection handleJoinGameClick={this.handleJoinGameClick} />
        )}

        {(() => {
          if (
            config.features.PopupAnnouncement &&
            this.props.ui.mains &&
            this.props.ui.mains.length > 0
          ) {
            var row = this.props.ui.mains[0];

            return (
              <PopupAnnouncement
                open={this.state.openAnnouncement}
                onClose={() => {
                  if (document.getElementById("audio") != null)
                    document.getElementById("audio").play();
                  this.setState({
                    ...this.state,
                    openAnnouncement: false,
                    showPromotion: true,
                  });
                }}
                text={
                  row.localization !== null && row.localization.content
                    ? row.localization.content
                    : row.content
                }
                header={
                  row.localization !== null && row.localization.subject
                    ? row.localization.subject
                    : row.subject
                }
              ></PopupAnnouncement>
            );
          }
        })()}

        {config.features.PopupPromotion &&
          this.props.general.promotionList.totalcount > 0 && (
            <PopupAnnouncement
              open={this.state.showPromotion}
              type="promo"
              onClose={() => {
                if (document.getElementById("audio") != null)
                  document.getElementById("audio").play();
                this.setState({ ...this.state, showPromotion: false });
              }}
              content={this.props.general.promotionList.items}
              header={i18n.t("promotion.title")}
            ></PopupAnnouncement>
          )}
      </HomeContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (pageName) => {
      dispatch({ type: SHOW_MODAL, pageName });
    },
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    ui: state.ui,
    game: state.game,
    general: state.general,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
