import React, { Component } from "react";
import styled from "styled-components";
import i18n from "../../../utils/i18n";
import config from "../../../config/config";
const Container = styled.div`
  margin: 50px auto 0 auto;
  font-weight: 500;
  box-shadow: none;
  position: relative;
  width: 635px;
  height: 81px;
  border-radius: 10px;
`;

const SwitchTextContainerComponent = styled.div`
  width: 300px;
  height: 81px;
  flaot: left;
  text-align: center;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 27px;

  color: ${({ active, theme }) => {
    return active ? theme.primary : theme.loginText;
  }};

  padding-top: 14px;
`;
const SwitchTextLeftContainer = styled(SwitchTextContainerComponent)`
  left: 0;
  border-bottom: solid 5px
    ${({ active, theme }) => {
      return active ? theme.primary : theme.loginText;
    }};
`;
const SwitchTextrightContainer = styled(SwitchTextContainerComponent)`
  right: 0;

  border-bottom: solid 5px
    ${({ active, theme }) => {
      return active ? theme.primary : theme.loginText;
    }};
`;
class ButtonSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activation: config.features.SMSVerification,
    };
  }

  // handleChangeSelection = index => {
  //   this.setState({
  //     ...this.state,
  //     selected: index
  //   });
  // };
  render() {
    return (
      <Container>
        <SwitchTextLeftContainer
          style={{ width: this.state.activation ? "200px" : "300px" }}
          active={this.props.selected === 0}
          onClick={() => this.props.handleChangeSelection(0)}
        >
          {i18n.t("common.login")}
        </SwitchTextLeftContainer>
        <SwitchTextrightContainer
          style={
            this.state.activation ? { width: "200px", right: "218px" } : {}
          }
          active={this.props.selected === 1}
          onClick={() => this.props.handleChangeSelection(1)}
        >
          {i18n.t("common.register")}
        </SwitchTextrightContainer>
        {this.state.activation ? (
          <SwitchTextrightContainer
            style={{ width: "200px" }}
            active={this.props.selected === 2}
            onClick={() => this.props.handleChangeSelection(2)}
          >
            {i18n.t("web.register.activation")}
          </SwitchTextrightContainer>
        ) : null}
      </Container>
    );
  }
}
export default ButtonSwitch;
