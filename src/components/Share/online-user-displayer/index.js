import i18next from "i18next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import config from "../../../config/config";
const OnlineDisplayerText = styled.div`
  color: ${({ color, theme }) => {
    return color ? color : theme.secondary;
  }};
  font-size ${({ size }) => {
    return size ? size : "";
  }};

  min-width: 125px;
  padding-right: 10px;
`;

const OnlineUserText = styled.span`
  font-weight: bold;
`;

const OnlineUserDisplayer = ({ color, size }) => {
  function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var userRange = randomNumberGenerator(config.features.Home_OnlineUsers.min, config.features.Home_OnlineUsers.max);

  const [totalPlayer, setTotalPlayer] = useState(userRange);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalPlayer(userRange);
    }, 10000);

    return () => clearInterval(interval);
  });

  return (
    <OnlineDisplayerText color={color} size={size}>
      {i18next.t("common.playeronline")}:{" "}
      <OnlineUserText>{totalPlayer}</OnlineUserText>
    </OnlineDisplayerText>
  );
};

export default OnlineUserDisplayer;
