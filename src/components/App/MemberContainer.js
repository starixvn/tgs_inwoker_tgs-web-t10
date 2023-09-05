import React from "react";

import styled, { keyframes } from "styled-components";
import InboxIconPNG from "../../assets/images/inbox-icon.png";
import IconRefreshBalancePNG from "../../assets/images/icon-refresh-balance.png";

import { Link } from "react-router-dom";
import i18n from "../../utils/i18n";
import Common from "../../utils/Common";
import config from "../../config/config";
import { SortedMenuList } from "../../utils/HeaderSorting";

import CustomPopover from "../Share/custompopover";
import { Textfit } from "react-textfit";

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

  display: flex;
  align-items: center;
  gap: 10px;
`;
const BtnStyle1 = styled.div`
  font-size: 14px;
  text-align: center;
  min-width: 70px;
  height: 25px;
  border-radius: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px;

  border: solid 1px #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;
const BtnLogout = styled.div`
  color: #fff;
  text-align: right;
  cursor: pointer;
  float: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BtnDeposit = styled(BtnStyle1)``;

const BalanceContainer = styled.div`
  color: #fff;
  text-align: right;

  display: flex;
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  mask: url(${IconRefreshBalancePNG});
  mask-repeat: no-repeat;
  mask-position: center;
  width: 16px;
  height: 16px;
  margin-left: 2px;
  background: #fff;

  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const BalanceAmountLabel = styled.span`
  color: #fff;
`;
const MemberUserName = styled.span`
  color: #fff;
`;

const InboxContainer = styled(BalanceContainer)`
  text-align: right;

  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const InboxIconImg = styled.div`
  display: inline-block;
  float: right;
  margin-top: -4px;

  height: 15px;
  width: 15px;

  background: #fff;
  mask: url(${({ src }) => {
      return src;
    }}),
    no-repeat;

  mask-repeat: no-repeat;
  mask-size: contain;
  mask-position: bottom;
`;
const InboxCountLabel = styled.span`
  margin-left: 6px;
  color: #fff;
  display: inline-block;
  float: right;
  display: none;
`;
const WelcomeContainer = styled(BalanceContainer)`
  color: #fff;
  float: right;
  margin-right: 0px;
  max-width: 300px;
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`;

const GameType = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const GameTypeName = styled.div`
  padding-bottom: 10px;
  color: ${({ theme }) => theme.popoverGameTypeText};
  opacity: 0.65;
`;

const BrandAndBalance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5px 0;
  color: ${({ theme }) => theme.popoverSubWalletText};
`;

const Brand = styled.div`
  padding-left: 5px;
  font-size: 12px;
  font-weight: bold;
`;

const Balance = styled.div`
  text-align: right;
  opacity: 0.75;
`;

const BrandAndBalanceButBigger = styled(BrandAndBalance)`
  border-bottom: solid 1px #000;
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
`;

const MemberContainer = (props) => {
  const handleTransfer = (e) => {
    if (config.features.NewTransferUI) {
      handleClick(e);
    } else {
      props.onhandleTransfer();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const totalBalance =
    props.wallet.mainBalance +
    props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .reduce((a, v) => (a = a + v.balance), 0);

  return (
    <Container>
      <WelcomeContainer>
        <CustomLink to={"/account/profile"}>
          {i18n.t("web.header.welcomBack")}{" "}
          <MemberUserName>
            {props.account.info.member_username} (VIP
            {props.account.info.member_level_id})
          </MemberUserName>
        </CustomLink>
      </WelcomeContainer>

      <BtnLogout onClick={props.onhandleLogout}>
        {i18n.t("web.header.logout")}
      </BtnLogout>

      <InboxContainer onClick={props.onhandleInboxClick}>
        <InboxCountLabel>{props.account.info.message_num}</InboxCountLabel>
        <InboxIconImg src={InboxIconPNG}></InboxIconImg>
      </InboxContainer>

      <BalanceContainer style={{ display: "flex" }}>
        <span>{i18n.t("web.header.mainAccount")}: </span>
        <BalanceAmountLabel
          onClick={(e) => {
            handleTransfer(e);
          }}
        >
          {Common.formatNumberWithThousand(totalBalance)}
        </BalanceAmountLabel>
        <span>{i18n.t("web.header.dollor")}</span>
        <RefreshBalance onClick={props.onhandleRefreshBalanceClick}>
          <RefreshBalanceIcon></RefreshBalanceIcon>
        </RefreshBalance>
        <CustomPopover
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
        >
          <div>
            <BrandAndBalanceButBigger>
              <div style={{ paddingRight: 30 }}>
                {i18n.t("web.header.mainAccount")}
              </div>
              <div
                style={{
                  width: 150,
                  display: "flex",
                  alignSelf: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Textfit mode="single">
                  {Common.formatNumberWithThousand(totalBalance)}
                </Textfit>
              </div>
            </BrandAndBalanceButBigger>
          </div>
          {SortedMenuList.map((item, key) => {
            return (
              <GameType>
                <GameTypeName>{i18n.t(item.title)}</GameTypeName>
                {props.game.homePageGameList
                  .filter((game) => {
                    return item.gameType.indexOf(game.type) >= 0;
                  })
                  .map((brand, index) => {
                    return props.game.providerList
                      .filter((item) => {
                        return item.abbreviation === brand.abbreviation;
                      })
                      .map((data, index) => {
                        return (
                          <BrandAndBalance>
                            <Brand>
                              {i18n.t(`${data.abbreviation}.${item.path}`)}
                            </Brand>
                            <Balance>
                              {data.maintenance === 1
                                ? i18n.t("transfer.maintenance")
                                : Common.formatNumberWithCommas(data.balance)}
                            </Balance>
                          </BrandAndBalance>
                        );
                      });
                  })}
              </GameType>
            );
          })}
        </CustomPopover>
      </BalanceContainer>
      <BtnDeposit onClick={props.onhandleProfileClick}>
        {i18n.t("t3.profile")}
      </BtnDeposit>
      <BtnDeposit onClick={props.onhandleDeposit}>
        {i18n.t("t3.deposit")}
      </BtnDeposit>
      <BtnDeposit onClick={props.onhandleWithdrawClick}>
        {i18n.t("t3.withdraw")}
      </BtnDeposit>
      {
        // props.game.containTransferWallet && (
        //   <BtnTransfer onClick={props.onhandleTransfer}>
        //     {i18n.t("web.header.transfer")}
        //   </BtnTransfer>
        // )
      }
    </Container>
  );
};

export default MemberContainer;
