import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Common from "../../../utils/Common";

import { GameService } from "../../../../api-services/services/GameService";
import { SHOW_LOGIN } from "../../../../api-services/constant/actionType";
import { GameTypeEnum, GameEnum } from "../../../../api-services/utils/Enum";

import i18n from "../../../utils/i18n";

import JDBLogo from "../../../assets/images/fish/jdb_logo.png";

const Container = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  background: url(${(props) =>
      `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/bg.jpg`})
    no-repeat;
  background-position: center -110px;
`;

const LogoHolder = styled.div`
  width: 300px;
  height: 200px;
  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  position: absolute;
  right: 50%;
  top: 60px;
  margin-right: 238px;
`;

const GameContainer = styled.div`
  position: absolute;
  top: 460px;
  left: 50%;
  width: 910px;
  transform: translateX(-50%);
`;
const GameItem = styled.div`
  width: 300px;
  height: 150px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
  float: left;
  &:hover {
    cursor: pointer;
  }
`;
class Fishing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,

      page: 1,
      limit: 25,
      total: 0,
      type: GameTypeEnum.FISH,

      platform: GameEnum.JDB,
    };
  }
  componentDidMount() {
    this.getGameList();
  }
  componentDidUpdate(preProps, preStates) {}
  handleJoinGameClick = (gid) => {
    if (this.props.token) {
      Common.PopupCenter(
        "/joingame/" + GameTypeEnum.FISH + "/" + GameEnum.JDB + "/" + gid,
        1280,
        720
      );
    } else {
      this.props.showLogin(true);
    }
  };
  getGameList(
    page = this.state.page,
    platform = this.state.platform,
    type = this.state.type
  ) {
    var result = GameService.GetGameList(platform, type);
    result.then((response) => {
      if (response.IsSuccess) {
        if (page === 1) {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: response.data,
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: this.state.gameList.concat(response.data),
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
  handleGameChange = (game) => {
    this.setState({
      selected: game,
    });
  };

  render() {
    return (
      <Container>
        <LogoHolder src={JDBLogo} />
        <GameContainer>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Dragon_Fishing.png`
            }
            onClick={() => this.handleJoinGameClick(700001)}
          ></GameItem>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Dragon_Fishing_II.png`
            }
            onClick={() => this.handleJoinGameClick(700002)}
          ></GameItem>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Cai_Shen_Fishing.png`
            }
            onClick={() => this.handleJoinGameClick(700003)}
          ></GameItem>
        </GameContainer>
        <GameContainer style={{ top: "580px", width: "1210px" }}>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Five_Dragons_Fishing.png`
            }
            onClick={() => this.handleJoinGameClick(700004)}
          ></GameItem>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Fishing_YiLuFa.png`
            }
            onClick={() => this.handleJoinGameClick(700005)}
          ></GameItem>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/Dragon_Master.png`
            }
            onClick={() => this.handleJoinGameClick(700006)}
          ></GameItem>
          <GameItem
            img={(props) =>
              `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/FishingDisco.png`
            }
            onClick={() => this.handleJoinGameClick(700007)}
          ></GameItem>
        </GameContainer>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fishing);
