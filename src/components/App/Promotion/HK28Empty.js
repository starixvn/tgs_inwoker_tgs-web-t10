import React, { Component } from "react";

import styled from "styled-components";
const Container = styled.div`
  width: 100%;
  background: url(${process.env.PUBLIC_URL +
    "/assets/images/promotion/empty.jpg"})
    no-repeat top center #fff;
  min-height: 800px;
  position: relative;
`;

class HK28Empty extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Container></Container>;
  }
}

export default HK28Empty;
