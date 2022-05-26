import React from "react";
import styled from "styled-components";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";

import { withStyles } from "@material-ui/core/styles";

const StyledBottomAppBar = withStyles({
  root: {
    background: "none",
  },
})(AppBar);

const CustomCustomAppBar = styled(StyledBottomAppBar)`
  background: ${({ fixedColor, theme }) => {
    return fixedColor ? theme.body : theme.appbar;
  }};
  height: 90px;
  display: block;
`;

const HeaderTitle = styled.div`
  float: left;
  color: ${({ theme }) => theme.primaryText};
  font-weight: normal;
  font-size: 34px;
  text-align: center;

  margin-top: 20px;
  width: calc(100% - 80px - 80px);
`;

const HeaderBack = styled.div`
  float: left;
  mask: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-back-white.png`})
    no-repeat center;
  background: ${({ theme }) => theme.primaryText};
  width: 80px;
  height: 90px;
`;
const RightContentContainer = styled.div`
  float: right;
  width: 80px;
  margin-top: 5px;
  overflow: visible;
`;

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
function Header(props) {
  return (
    <ElevationScroll {...props}>
      <CustomCustomAppBar
        position={props.position ? props.position : "fixed"}
        fixedColor={props.fixedColor}
      >
        <HeaderBack onClick={props.onBackClick}></HeaderBack>
        <HeaderTitle>{props.title}</HeaderTitle>
        <RightContentContainer>{props.rightContent}</RightContentContainer>
      </CustomCustomAppBar>
    </ElevationScroll>
  );
}
export default Header;
