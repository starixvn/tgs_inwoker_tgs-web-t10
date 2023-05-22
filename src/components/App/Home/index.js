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
import FifthSection from "./FifthSection";
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
  background-color: ${({ theme }) => theme.webSection}})};
  width: 100%;
`;
const FirstSection = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  min-height: 460px;
  padding-top: 110px;
  overflow: visible;
`;

const FirstSectionItemBg = styled(Grid)`
  position: absolute;
  bottom: 76px;
  right: ${(props) => (i18n.language === "vi-VN" ? "0px" : "16px")};
  width: 160px;
`;
const FirstSectionItemLabel = styled(Grid)`
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ theme }) =>
    theme.useBackgroundColor ? theme.useBackgroundColor : theme.primary};
`;

const FirstSectionItemButton = styled(Grid)`
  font-size: 14px;
  color: ${({ theme }) =>
    theme.useBackgroundColor ? theme.useBackgroundColor : theme.primary};
  text-align: center;
  width: 85px;
  border-radius: 6px;
  border: solid 1px
    ${({ theme }) =>
      theme.useBackgroundColor ? theme.useBackgroundColor : theme.primary};
  margin-top: 25px;
  height: 34px;
  line-height: 2em;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: ${({ theme }) => theme.primary};
    border: solid 1px ${({ theme }) => theme.primary};
    color: ${({ theme }) =>
      theme.useBackgroundColor ? theme.useBackgroundColor : theme.primary};
    transition: all 0.3s;
  }
`;

const FirstSectionItem = styled(Grid)`
  background: url(${(props) => {
      return (
        process.env.PUBLIC_URL + `/assets/images/pcHomePage/${props.img}.png`
      );
    }})
    no-repeat;
  background-position: 0% 100%;
  margin: 0 auto;
  width: 469px;
  height: 272px;
  color: #fff;
  font-size: ${(props) => (i18n.language === "vi-VN" ? "1.4em" : "1.75em")};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s;
  background-size: contain;
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s;
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

  componentDidUpdate(preProps) {
    var isInHomePage =
      this.props.ui.mains &&
      this.props.ui.mains !== preProps.ui.mains &&
      this.props.ui.mains.length > 0;

    if (config.features.PopupAnnouncement) {
      if (isInHomePage) {
        this.setState({
          openAnnouncement: true,
          showPromotion: false,
        });
      }
    }

    if (config.features.PopupPromotion) {
      if (
        isInHomePage &&
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
      Common.closePreviousPopup();
      if (slotPageGameType.indexOf(gameType) >= 0) {
        if (
          gameType === GameTypeEnum.SPORTS ||
          gameType === GameTypeEnum.ESPORTS
        ) {
          if (!this.props.token) {
            this.props.showLogin(true);
          } else {
            this.props.history.push(`/sports/play/${gameCode}/${gameType}`);
          }
        } else {
          this.props.history.push(`/${path}/${gameCode}`);
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

  brandSwitcher = (brand) => {
    switch (brand) {
      case "GMO":
        return "GMO";
      default:
        return "";
    }
  };

  render() {
    return (
      <HomeContainer>
        <SliderContainer moveUp={config.brand !== "GMO"}>
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
                  path: `electron`,
                  title: i18n.t("web.home.Section1Electron"),
                  img: "section1-electron",
                  gameType: [GameTypeEnum.TABLEGAME],
                  sortingHK28: 6,
                  sorting: 1,
                },
                {
                  path: `fish`,
                  title: i18n.t("web.home.Section1Fishing"),
                  img: "section1-fish",
                  gameType: [GameTypeEnum.FISH],
                  sortingHK28: 5,
                  sorting: 3,
                },
                {
                  path: "lottery",
                  title: i18n.t("web.home.Section1Lottery"),
                  img: "section1-lottery",
                  gameType: [GameTypeEnum.LOTTERYLOBBY],
                  sortingHK28: 7,
                  sorting: 2,
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
                        img={item.img + this.brandSwitcher(config.brand)}
                      >
                        <FirstSectionItemBg
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                        >
                          <FirstSectionItemLabel item>
                            {item.title}
                          </FirstSectionItemLabel>
                          <FirstSectionItemButton
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              this.props.history.push(`/${item.path}`);
                            }}
                          >
                            {i18n.t("withdrawal.checkDetails")}
                          </FirstSectionItemButton>
                        </FirstSectionItemBg>
                      </FirstSectionItem>
                    </ScrollAnimation>
                  );
                }
              });
            })()}
          </FirstSection>

          <SecondSection />

          <ScrollAnimation
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            <ThirdSection></ThirdSection>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="fadeInRight"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            <FourthSection
              brand={this.brandSwitcher(config.brand)}
            ></FourthSection>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            <FifthSection
              providerList={this.props.game.providerList}
            ></FifthSection>
          </ScrollAnimation>
        </SectionContainer>

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
          this.props.general.promotionList.items.length > 0 && (
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
