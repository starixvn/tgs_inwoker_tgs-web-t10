import React, { Component } from "react";
import styled from "styled-components";
const StyleButton = styled.div`
  margin: 0 auto;

  text-align: center;

  padding-top: 22px;
  font-size: 34px;

  color: ${({ theme }) => {
    return theme.customButtonText ? theme.customButtonText : "#fff";
  }};
  width: 637px;
  height: 93px;
  border-radius: 20px;
  border: solid 1px
    ${({ theme }) => {
      return theme.customButtonText ? theme.customButtonText : "#fff";
    }};
  background-color: ${({ theme }) => theme.primary};
`;

class ButtonWap extends Component {
  render() {
    return (
      <StyleButton onClick={this.props.onClick} {...this.props}>
        {this.props.name}
      </StyleButton>
    );
  }
}
export default ButtonWap;
