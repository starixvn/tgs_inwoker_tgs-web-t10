import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GameService } from "../../../api-services/services/GameService";

import Maintenance from "../../Share/Maintenance";
import SportsBGNewPNG from "../../../assets/images/sportsbook/sports-bg2.jpg";

const Container = styled.div`
  width: 100%;
  border: none;
  height: 100%;
  background: url(${SportsBGNewPNG}) no-repeat center;
`;
const IFrame = styled.iframe`
  display: block;
  border: none;
  height: 100%;
  margin: 0 auto;
`;
class Play extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, url: "", maintenance: false };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    window.scrollTo(0, 0);
    this.JoinGame(this.props.match.params.params);
    if (document.getElementById("audio") != null)
      document.getElementById("audio").volume = 0.0;
  }

  componentDidUpdate(preProps) {
    if (
      preProps.match.params.params !== this.props.match.params.params ||
      preProps.match.params.type !== this.props.match.params.type ||
      preProps.token != this.props.token
    ) {
      this.JoinGame(this.props.match.params.params);
    }
  }
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.overflow = "";
    window.removeEventListener("resize", this.updateWindowDimensions);
    if (document.getElementById("audio") != null)
      document.getElementById("audio").volume = 1.0;
  }
  JoinGame = (gameCode) => {
    if (gameCode === "BC") {
      GameService.JoinBetConstruct(this.props.match.params.type, gameCode).then(
        (response) => {
          if (typeof response.data === "string") {
            this.setState({ ...this.state, maintenance: false });
            var ifrm = this.myRef.current;
            ifrm =
              ifrm.contentWindow ||
              ifrm.contentDocument.document ||
              ifrm.contentDocument;

            ifrm.document.open();
            ifrm.document.write(response.data);
            ifrm.document.close();
          } else {
            document.getElementsByTagName("body")[0].style.overflow = "";
            window.removeEventListener("resize", this.updateWindowDimensions);
            this.setState({ ...this.state, maintenance: true });
          }
        }
      );
    } else
      GameService.JoinLobbyGame(this.props.match.params.type, gameCode).then(
        (response) => {
          if (response.IsSuccess) {
            this.setState({ ...this.state, maintenance: false });
            if (this.myRef.current) {
              var url =
                (response.data.url.indexOf("http") <= -1 ? "https:" : "") +
                response.data.url;

              this.myRef.current.src = url;
            }
          } else {
            document.getElementsByTagName("body")[0].style.overflow = "";
            window.removeEventListener("resize", this.updateWindowDimensions);
            this.setState({ ...this.state, maintenance: true });
          }
        }
      );
  };
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    if (this.state.maintenance === true) {
      return <Maintenance isGameMaintenance={true}></Maintenance>;
    } else {
      return (
        <Container style={{ height: this.state.height - 154 + "px" }}>
          <IFrame
            ref={this.myRef}
            style={{ width: "1280px" }}
            scrolling="yes"
            frameBorder="0"
          ></IFrame>
        </Container>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
  };
};
export default connect(mapStateToProps, null)(Play);
