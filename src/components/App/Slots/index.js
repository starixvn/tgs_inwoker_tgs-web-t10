import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { AppHistory } from "../../../history/History";

import { GameService } from "../../../api-services/services/GameService";
import { gameAction } from "../../../api-services/actions/gameAction";
import { GameTypeEnum, SlotFilterType } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";

import SlotAllGamePNG from "../../../assets/images/slot-allgame.png";
import SlotAllGameInactivePNG from "../../../assets/images/slot-allgame-inactive.png";
import SlotHotGamePNG from "../../../assets/images/slot-hotgame.png";
import SlotHotGameActivePNG from "../../../assets/images/slot-hotgame-active.png";
import SlotNewGamePNG from "../../../assets/images/slot-newgame.png";
import SlotNewGameActivePNG from "../../../assets/images/slot-newgame-active.png";
import SlotBookmarkPNG from "../../../assets/images/slot-bookmark.png";
import SlotBookmarkActivePNG from "../../../assets/images/slot-bookmark-active.png";
import SlotFishGamePNG from "../../../assets/images/slot-fishgame.png";
import SlotFishGameActivePNG from "../../../assets/images/slot-fishgame-active.png";
import SlotHistoryGamePNG from "../../../assets/images/slot-history.png";
import SlotHistoryGameActivePNG from "../../../assets/images/slot-history-active.png";

import SlotBookmark1PNG from "../../../assets/images/slot-bookmark-1.png";
import SlotBookmark2PNG from "../../../assets/images/slot-bookmark-2.png";

import Loading from "../../../components/App/Loading";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Common from "../../../utils/Common";

const Container = styled.div`
  width: 100%;

  position: relative;
`;

const InnerWrap = styled.div`
  width: 1280px;
  min-height: 580px;

  background: rgba(255, 255, 255);
  box-shadow: 2px 2px 7px 7.5px rgba(79, 95, 120, 0.29);

  margin: 660px auto 50px auto;
  padding: 16px 46px;
  box-sizing: border-box;
  overflow-y: auto;
`;
const GameTabContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  gap: 10px 10px;
  align-items: center;
`;

const GameSubFilterContainer = styled.div`
  padding-left: 20px;
  width: 1280;
  height: 42px;

  margin: 0px 0 25px 0;
`;

const CategoryContainer = styled.div`
  height: 30px;
  box-sizing: border-box;


  font-size: 16px;
  float: left;
  margin-right: 20px
margin-top: 6px
&:hover {
    cursor: pointer;
  }

   
  ${(props) =>
    props.active
      ? ` color:  ${props.theme.primary};`
      : ` color: ` + props.theme.secondary + `;`};
`;
const CategoryText = styled.div`
  float: left;
  margin-top: 2px;
`;
const FilterItem = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  margin: 3px 5px 0 0;
  height: 19px;
  width: 19px;
  float: left;
`;

const AllGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotAllGamePNG}) no-repeat;`
      : `  background: url(${SlotAllGameInactivePNG}) no-repeat;`};
`;
const HotGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotHotGameActivePNG}) no-repeat;`
      : `  background: url(${SlotHotGamePNG}) no-repeat;`};
`;
const NewGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotNewGameActivePNG}) no-repeat;`
      : `  background: url(${SlotNewGamePNG}) no-repeat;`};
`;
const BookmarkFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotBookmarkActivePNG}) no-repeat;`
      : `  background: url(${SlotBookmarkPNG}) no-repeat;`};
`;
const FishGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotFishGameActivePNG}) no-repeat;`
      : `  background: url(${SlotFishGamePNG}) no-repeat;`};
`;
const HistoryFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotHistoryGameActivePNG}) no-repeat;`
      : `  background: url(${SlotHistoryGamePNG}) no-repeat;`};
`;

const GameListContainer = styled.div`
  padding: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  justify-items: center;
  background-color: #fff;
  gap: 14px;
`;

const GameHoverSelection = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  color: #fff;
  font-size: 65px;
  text-align: center;
  padding-top: 55px;
`;
const ItemContainer = styled.div`
  width: 100%;
  border: solid 1px #fde73f;
  position: relative;
  float: left;
  &:hover {
    cursor: pointer;
  }
  &:hover ${GameHoverSelection} {
    display: block;
  }
  ${(props) =>
    `
  background-image:url(` +
    props.img +
    `)`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
`;
const GameDesc = styled.div`
  padding-left: 10px;

  height: 28px;
  float: right;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
`;
const Namecontainer = styled.div`
  width: 100%;
  height: 40px;
  box-shadow: 0px 4px 6px 0 rgba(0, 0, 0, 0.8);
  border-top: solid 1px #fde73f;
  background-image: linear-gradient(to top, #960310, #be040f);

  color: #ffffff;
  font-size: 14px;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  margin-top: 100%;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const GameProvider = styled.div`
  float: left;
  font-size: 14px;
  color: #ffffff;
  padding-right: 5px;
  margin-top: 4px;
  text-align: center;
`;
const Bookmark = styled.div`
  float: right;

  width: 30px;
  height: 28px;
  background-repeat: no-repeat;
  background-position: 8px center;

  ${(props) =>
    props.bookmark
      ? ` background-image:  url(${SlotBookmark1PNG})`
      : `  background-image:  url(${SlotBookmark2PNG})`};
`;

const Spliter = styled.div`
  background-color: #515151;
  width: 1px;
  float: left;
  height: 14px;
  margin: 7px 0 10px 0;
`;

const GameButtonBlock = styled.div`
  ${({ maintenance }) => {
    return maintenance
      ? "filter: brightness(40%) grayscale(200%); pointer-events: none;"
      : "";
  }}
`;

const TabButton = styled.div`
  background: ${({ theme, selected }) => {
    return selected
      ? "linear-gradient(101deg, rgba(252,195,111,1) 21%, rgba(252,203,119,0.7) 100%)"
      : `rgba(${theme.primaryRgb}, 0.8)`;
  }};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 5px 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  font-size: 12px;
`;

class Slots extends Component {
  constructor(props) {
    super(props);

    const type = this.getType();

    this.state = {
      firstLoad: true,
      filterGame: 0,
      keyword: "",
      gameList: [],
      page: 1,
      limit: 25,
      total: 0,
      type: type,
      favGame: [],
      platformList: [],
      loading: true,
      platform: this.props.match.params.platform
        ? this.props.match.params.platform
        : "",
    };
  }
  language = null;
  componentDidMount() {
    this.getGameList();
    if (this.props.token !== null && this.props.token !== "") {
      this.getFav();
    }
  }
  getFav(type = this.state.type) {
    var result = GameService.GetFavoriteGame(type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;
        this.setState({
          ...this.state,
          favGame: data,
        });
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.type !== this.state.type ||
      prevProps.match.params.platform !== this.props.match.params.platform ||
      prevProps.match.url !== this.props.match.url
    ) {
      if (prevProps.match.url !== this.props.match.url) {
        window.scrollTo({ top: 0, behavior: "smooth" });

        var platform = this.props.match.params.platform
          ? this.props.match.params.platform
          : "";

        this.getGameList(1, platform, this.getType());
      } else if (prevState.type !== this.state.type) {
        if (this.props.token !== null && this.props.token !== "") {
          this.getFav();
        }
      } else if (
        prevProps.match.params.platform !== this.props.match.params.platform
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.setState({
          ...this.state,
          platform: this.props.match.params.platform
            ? this.props.match.params.platform
            : "",
        });
      } else {
        this.getGameList();
      }
    }
    if (prevProps.token !== this.props.token && this.props.token !== null) {
      this.getFav();
    }
  }
  getType() {
    const type =
      this.props.match.url.indexOf("electron") >= 0
        ? GameTypeEnum.TABLEGAME
        : this.props.match.url.indexOf("slots") >= 0
        ? GameTypeEnum.SLOT
        : this.props.match.url.indexOf("fish") >= 0
        ? GameTypeEnum.FISH
        : GameTypeEnum.TIGERSLOT;
    return type;
  }
  getGameList(
    page = this.state.page,
    platform = this.state.platform,
    type = this.state.type
  ) {
    this.setState({
      ...this.state,

      loading: true,
    });

    var result = GameService.GetGameList(platform, type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;

        if (page === 1) {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: data,
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: this.state.gameList.concat(data),
            loading: false,
          });
        }
      } else {
        this.setState({
          ...this.state,
          gameList: [],
          platform: platform,
          type: type,
          loading: false,
        });
      }
    });
  }
  handleParentClick = (platform) => {
    const type =
      this.props.match.url.indexOf("fish") >= 0
        ? "fish"
        : this.props.match.url.indexOf("slots") >= 0
        ? "slots"
        : "electron";
    AppHistory.push(`/${i18n.language}/${type}/${platform}`);
  };
  handleFilterGameClick = (filterType) => {
    this.setState({ ...this.state, filterGame: filterType, page: 1 });
  };
  handleKeywordChange = (e) => {
    this.setState({ ...this.state, keyword: e.target.value });
  };
  handleJoinGameClick = (gpcode, gpid) => {
    const type =
      this.props.match.url.indexOf("fish") >= 0
        ? "fish"
        : this.props.match.url.indexOf("slots") >= 0
        ? "slots"
        : "electron";
    if (this.props.token) {
      Common.closePreviousPopup();
      this.props.performBalanceRefresh();
      this.props.history.push(
        `/${i18n.language}/${type}/play/${gpcode}/${gpid}`
      );
    } else {
      this.props.showLogin(true);
    }
  };

  genCategoryItem(category, text) {
    if (this.props.token == null && category === 3) {
      return null;
    }
    return (
      <CategoryContainer
        onClick={() => this.handleFilterGameClick(category)}
        active={this.state.filterGame === category}
      >
        {(() => {
          switch (category) {
            case SlotFilterType.All:
              return (
                <AllGameFilterItem
                  active={this.state.filterGame === category}
                ></AllGameFilterItem>
              );
            case SlotFilterType.Hot:
              return (
                <HotGameFilterItem
                  active={this.state.filterGame === category}
                ></HotGameFilterItem>
              );
            case SlotFilterType.New:
              return (
                <NewGameFilterItem
                  active={this.state.filterGame === category}
                ></NewGameFilterItem>
              );
            case SlotFilterType.Bookmark:
              return (
                <BookmarkFilterItem
                  active={this.state.filterGame === category}
                ></BookmarkFilterItem>
              );

            case SlotFilterType.Fish:
              return (
                <FishGameFilterItem
                  active={this.state.filterGame === category}
                ></FishGameFilterItem>
              );
            case SlotFilterType.History:
              return (
                <HistoryFilterItem
                  active={this.state.filterGame === category}
                ></HistoryFilterItem>
              );
            case SlotFilterType.Recommend:
              return (
                <HistoryFilterItem
                  active={this.state.filterGame === category}
                ></HistoryFilterItem>
              );
            default:
              return null;
          }
        })()}

        <CategoryText>{text}</CategoryText>
      </CategoryContainer>
    );
  }

  path = window.location.pathname.split("/");

  handleToggleFavorite = (match, id, match2) => {
    if (this.props.token !== null && this.props.token !== "") {
      if (match) {
        this.props.removeFavoriteGame(id).then(() => {
          var array = [...this.state.favGame];
          var index = array.indexOf(id);
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({ favGame: array });
          }
        });
      } else {
        this.props.setFavoriteGame(id).then(() => {
          this.setState({
            ...this.state,
            favGame: [...this.state.favGame, id],
          });
        });
      }
    }
  };

  render() {
    let list = null;
    if (this.state.gameList.length > 0) {
      list = this.state.gameList
        .filter((a) => {
          if (this.state.filterGame === SlotFilterType.All) return true;
          else {
            if (this.state.filterGame === SlotFilterType.Hot) {
              return a.tag.hot === true;
            } else if (this.state.filterGame === SlotFilterType.New) {
              return a.tag.new === true;
            } else if (this.state.filterGame === SlotFilterType.Recommend) {
              return a.tag.recommend === true;
            } else if (this.state.filterGame === "fav") {
              return this.state.favGame.indexOf(a.id) > -1;
            }
          }

          return false;
        })
        .filter((a) => {
          if (this.state.keyword === "") return true;
          else
            return a.name
              .toUpperCase()
              .includes(this.state.keyword.toUpperCase());
        })
        .filter((s) => {
          return s.isactive === true; // show only active game.
        })
        .map((el, i) => {
          var theName;
          this.props.game.providerList.filter((a) => {
            if (a.abbreviation === el.gpcode) {
              return (theName = a.name);
            }
            return theName;
          });
          return (
            <ItemContainer
              key={i}
              img={`${
                config.sourceUrl
              }${el.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                el.code
              }.jpg`}
            >
              <GameDesc>
                <GameProvider>{theName}</GameProvider>
                <Spliter></Spliter>
                <Bookmark
                  bookmark={this.state.favGame.indexOf(el.id) > -1}
                  onClick={() =>
                    this.handleToggleFavorite(
                      this.state.favGame.indexOf(el.id) > -1,
                      el.id
                    )
                  }
                ></Bookmark>
              </GameDesc>
              <GameHoverSelection
                onClick={() => this.handleJoinGameClick(el.gpcode, el.id)}
              >
                GO
              </GameHoverSelection>
              <Namecontainer>{el.name}</Namecontainer>
            </ItemContainer>
          );
        });
    }

    return (
      <Container
        style={{
          background: `url(${process.env.PUBLIC_URL}/assets/images/pcGamePage/${
            this.state.type === GameTypeEnum.TABLEGAME
              ? "electron"
              : this.state.type === GameTypeEnum.SLOT
              ? `slots`
              : this.state.type === GameTypeEnum.FISH
              ? "fish"
              : `slots`
          }/background.jpg) no-repeat center top, ${
            this.state.type === GameTypeEnum.TABLEGAME
              ? "#10315e"
              : this.state.type === GameTypeEnum.SLOT
              ? `#021b51`
              : this.state.type === GameTypeEnum.FISH
              ? "#0c64df"
              : `#021b51`
          }`,
        }}
      >
        <InnerWrap
          style={{
            marginTop: this.state.type === GameTypeEnum.FISH ? "880px" : "",
          }}
        >
          <GameTabContainer>
            <TabButton
              selected={this.state.platform === ""}
              onClick={() => this.handleParentClick("")}
            >
              All
            </TabButton>

            {this.props.game.homePageGameList

              .filter((ele) => {
                return ele.type === this.state.type; //check for only SLOT enum.
              })

              .map((row, index) => {
                return (
                  <GameButtonBlock maintenance={row.status !== 0}>
                    <TabButton
                      key={index}
                      selected={this.state.platform === row.abbreviation}
                      onClick={() => this.handleParentClick(row.abbreviation)}
                    >
                      {i18n.t(
                        `${row.abbreviation}.${
                          this.props.match.url.indexOf("fish") >= 0
                            ? "fish"
                            : this.props.match.url.indexOf("slots") >= 0
                            ? "slots"
                            : "electron"
                        }`
                      )}
                    </TabButton>
                  </GameButtonBlock>
                );
              })}
          </GameTabContainer>
          <GameSubFilterContainer>
            {this.genCategoryItem(SlotFilterType.All, i18n.t("slot.allGame"))}
            {this.genCategoryItem(SlotFilterType.Hot, i18n.t("slot.hotGame"))}
            {this.genCategoryItem(SlotFilterType.New, i18n.t("slot.newGame"))}
            {this.genCategoryItem(
              SlotFilterType.Recommend,
              i18n.t("slot.recommendGame")
            )}
            {this.genCategoryItem(
              SlotFilterType.Bookmark,
              i18n.t("slot.bookmarkGame")
            )}

            {/* {this.genCategoryItem(
              SlotFilterType.Bookmark,
              i18n.t("slot.bookmarkGame")
            )}
            {this.genCategoryItem(
              SlotFilterType.History,
              i18n.t("slot.historyGame")
            )} */}
            {
              //   <SearchFilterItemContainer>
              //     <SearchFilterItemInput
              //       type="text"
              //       maxLength="15"
              //       autocomplete="off"
              //       placeholder={i18n.t("slot.search")}
              //       onChange={this.handleKeywordChange}
              //     ></SearchFilterItemInput>
              //   </SearchFilterItemContainer>
            }
          </GameSubFilterContainer>
          <GameListContainer>{list}</GameListContainer>
          {/* <ButtonMore
            onClick={this.handleMoreClick}
            style={{
              visibility:
                this.state.gameList.length < this.state.total
                  ? "visible"
                  : "hidden",
            }}
          >

          </ButtonMore> */}
        </InnerWrap>
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    setFavoriteGame: (gameId) => dispatch(gameAction.setFavoriteGame(gameId)),
    removeFavoriteGame: (gameId) =>
      dispatch(gameAction.removeFavoriteGame(gameId)),
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    // jackpotAmount: state.ui.jackpotAmount,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Slots);
