import React, { Component } from "react";
import styled from "styled-components";
const CustomText = styled.div`
  width: 700px;
  min-height: 170px;
  padding: 20px 20px 0 20px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;
const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ black, theme }) => {
    return black ? "#000" : theme.secondary;
  }};
`;
const CustomInput = styled.input`
  font-size: 28px;
  margin-top: 18px;
  border-radius: 16px;
  min-height: 71px;
  padding: 16px 32px;
  font-weight: 500;
  border: 0;
  display: flex;
  flex: 1;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
    font-size: 28px;
  }
  &:disabled {
    background: #fff;

    opacity: 1;
  }
`;
class Textbox extends Component {
  render() {
    return (
      <CustomText
        // style={{ ...this.props.style }}
        onClick={this.props.onClick}
      >
        <CustomLabel black={this.props.black}>{this.props.label}</CustomLabel>
        <CustomInput
          style={this.props.color ? { color: this.props.color } : {}}
          type={this.props.type ? this.props.type : "text"}
          value={this.props.value}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled ? this.props.disabled : false}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          maxLength={this.props.maxLength ? this.props.maxLength : 50}
        ></CustomInput>
      </CustomText>
    );
  }
}

export default Textbox;
