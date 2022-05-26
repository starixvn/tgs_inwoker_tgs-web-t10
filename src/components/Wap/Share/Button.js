import React, { Component } from 'react'
import styled from 'styled-components'
const Content = styled.div`
  ${(props) =>
    props.disabled
      ? `background-color: #A5A5A5;`
      : `background-color: ${props.theme.primary};`}
  height: 93px;
  border-radius: 20px;
  font-size: 34px;
  padding: 22px 0;
  color: #ffffff;
  text-align: center;
`

const ButtonWrapper = styled.div`
  margin: 20px;
  padding: 20px;
`
class CustomButton extends Component {
  render() {
    return (
      <ButtonWrapper>
        <Content
          //   style={{ ...this.props.style }}
          onClick={this.props.disabled === true ? null : this.props.onClick}
          disabled={this.props.disabled ? this.props.disabled : false}
        >
          {this.props.label}
        </Content>
      </ButtonWrapper>
    )
  }
}
export default CustomButton
