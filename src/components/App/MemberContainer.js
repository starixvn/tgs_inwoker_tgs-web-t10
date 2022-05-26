import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes, withTheme } from "styled-components";
import InboxIconPNG from "../../assets/images/inbox-icon.png";
import InboxIconPNG_PB from "../../assets/images/inbox-icon-pb.png";
import IconRefreshBalancePNG_PB from "../../assets/images/icon-refresh-balance-pb.png";
import IconRefreshBalancePNG from "../../assets/images/icon-refresh-balance.png";
import IconRefreshBalanceHoverPNG from "../../assets/images/icon-refresh-balance-hover.png";
import { Link } from "react-router-dom";
import i18n from "../../utils/i18n";
import Common from "../../utils/Common";
import config from "../../config/config";

const balanceIconSwitcher = () => {
  switch(config.theme.toLowerCase())
  {
    case "pb":
      return `${IconRefreshBalancePNG_PB}`;
    default:
      return `${IconRefreshBalancePNG}`;
  }
}
const balanceHoverIconSwitcher = () => {
  switch(config.theme.toLowerCase())
  {
    case "pb":
      return `${IconRefreshBalancePNG_PB}`;
    default:
      return `${IconRefreshBalanceHoverPNG}`;
  }
}

export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  font-size: 14px;
  float: right;
`;
const BtnStyle1 = styled.div`
  width: 68px;
  height: 35px;
  border-radius: 4px;

  float: right;
  margin-right: 10px;
  text-align: center;
  line-height: 220%;
  border: solid 1px #ffffff;
  color: #fff;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  &:hover {
    border: solid 1px #fde73f;
    color: #fde73f;
    cursor: pointer;
  }
`;
const BtnLogout = styled.div`
  color: ${({ theme }) => theme.pcHeaderText};
  text-align: right;
  padding: 10px 0px 0 0;
  float: right;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.pcHeaderTextHover};
  }
`;

const BtnTransfer = styled(BtnStyle1)``;
const BtnDeposit = styled(BtnStyle1)``;

const BalanceContainer = styled.div`
  color: ${({ theme }) => theme.pcHeaderText};
  text-align: right;
  padding: 10px 10px 0 0;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;

const RefreshBalance = styled.div`
  margin: 2px 0 0 0;

  width: 16px;
  height: 16px;
  float: right;

  &:hover {
    cursor: pointer;
  }
`;
const RefreshBalanceIcon = styled.div`
  background-image: url(${({theme}) => balanceIconSwitcher()});
  background-repeat: no-repeat;
  background-position: center;
  width: 16px;
  height: 16px;

  &:hover {
    background-image: url(${({theme}) => balanceHoverIconSwitcher()});
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const BalanceAmountLabel = styled.span`
  color: ${({ theme }) => theme.pcHeaderTextHover};
`;
const MemberUserName = styled.span`
  color: ${({ theme }) => theme.pcHeaderTextHover};
`;
const Spliter = styled.div`
  width: 2px;
  height: 16px;
  margin: 12px 10px 0px 10px;
  float: right;
  background-color: rgba(255, 255, 255, 0.2);
`;
const InboxContainer = styled(BalanceContainer)`
  color: ${({ theme }) => theme.pcHeaderText};
  text-align: right;
  padding: 10px 0px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const InboxIconImg = styled.img`
  display: inline-block;
  float: right;
  margin-top: 2px;
`;
const InboxCountLabel = styled.span`
  margin-left: 6px;
  color: ${({ theme }) => theme.pcHeaderTextHover};
  display: inline-block;
  float: right;
`;
const WelcomeContainer = styled(BalanceContainer)`
  color: ${({ theme }) => theme.pcHeaderText};
  float: right;
  margin-right: 0px;
  padding: 10px 0 0 0;
  max-width: 300px;
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`;

const MemberContainer = (props) => {
  const { theme } = props;
  
  const vipSwitcher = (rank) => {
    switch (rank) {
      case 1:
        return "VIP 1";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        return;
    }
  };

  const inboxIconSwitcher = () => {
    switch (config.theme.toLowerCase())
    {
      case "pb":
        return InboxIconPNG_PB;
      default:
        return InboxIconPNG;
    }
  }
   
  return (
    <Container>
      {props.game.containTransferWallet && (
        <BtnTransfer onClick={props.onhandleTransfer}>
          {i18n.t("web.header.transfer")}
        </BtnTransfer>
      )}
      <BtnDeposit onClick={props.onhandleDeposit}>
        {i18n.t("web.header.deposit")}
      </BtnDeposit>
      <BalanceContainer>
        <span>{i18n.t("web.header.mainAccount")}</span>
        <BalanceAmountLabel onClick={props.onhandleTransfer}>
          {Common.formatNumberWithThousand(
            props.wallet.mainBalance +
              props.game.providerList
                .filter(
                  (item) => item.status === 0 && item.transferwallet === true
                )
                .reduce((a, v) => (a = a + v.balance), 0)
          )}
        </BalanceAmountLabel>

        <RefreshBalance onClick={props.onhandleRefreshBalanceClick}>
          <RefreshBalanceIcon icon={balanceIconSwitcher()} hoverIcon={balanceHoverIconSwitcher()}></RefreshBalanceIcon>
        </RefreshBalance>
      </BalanceContainer>
      <Spliter></Spliter>
      <InboxContainer onClick={props.onhandleInboxClick}>
        <InboxCountLabel>{props.account.info.message_num}</InboxCountLabel>
        <InboxIconImg src={inboxIconSwitcher()}></InboxIconImg>
      </InboxContainer>
      <Spliter></Spliter>
      <BtnLogout onClick={props.onhandleLogout}>
        {i18n.t("web.header.logout")}
      </BtnLogout>
      <Spliter></Spliter>
      <WelcomeContainer>
        <CustomLink to={"/" + i18n.language + "/account/profile"}>
          {i18n.t("web.header.welcomBack")}{" "}
          <MemberUserName>
            {props.account.info.member_username}(
            {config.features.CustomVIP
              ? vipSwitcher(props.account.info.member_level_id)
              : "VIP" + props.account.info.member_level_id}
            )
          </MemberUserName>
        </CustomLink>
      </WelcomeContainer>
    </Container>
  );
};

export default withTheme(MemberContainer);
