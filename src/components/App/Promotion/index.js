import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import BGPromotionJPG from "../../../assets/images/bg-promotion.jpg";

import { AppHistory } from "../../../history/History";

import { withSnackbar } from "notistack";

import i18n from "../../../utils/i18n";
import { generalAction } from "../../../api-services/actions/generalAction";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { Grid, Container as MContainer } from "@material-ui/core";

import PromoEmpty from "../../../assets/images/promo-empty.png";

const moment = require("moment");

const Container = styled.div`
  width: 100%;
  background: url(${BGPromotionJPG}) no-repeat top center #fff;
  min-height: 800px;
  position: relative;
`;
const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
`;
const PromoEmptyContainer = styled.div``;
const PromoEmptyBg = styled.div`
  background: url(${PromoEmpty}) no-repeat;
  position: absolute;

  left: 50%;
  bottom: -155px;
  margin-left: -240px;
  width: 1165px;
  height: 877px;
`;
const PromoEmptyText = styled.div`
  width: 673px;
  position: absolute;
  right: 50%;
  top: 30%;
`;
const PromoEmptyTextLine = styled.div`
  font-size: 80px;
  text-align: center;
  font-weight: bold;
  background: -webkit-linear-gradient(#446597, #282828);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ThePromotion = styled(Grid)``;

const ThePromotionContainer = styled(Grid)`
  background: #fff;
  width: 100%;
  border-radius: 20px;
  padding: 25px 18px;
  flex-direction: column;
  box-shadow: 5px 5px 8px rgba(32, 0, 0, 0.7);
  height: 539px;
  position: relative;
`;

const PromoImages = styled.div`
  width: 550px;
  height: 222px;
  position: relative;
  margin-bottom: 12px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: 100% 100%;
`;

const EventTitle = styled.div`
  color: #7e0000;
  margin-bottom: 10px;
  font-size: 19px;
  font-family: Arial;
  margin-left: -8px;
`;
const EventLabel = styled.div`
  font-size: 15px;
  color: #4f4f4f;
  font-family: Arial;
  line-height: 16px;
  margin-bottom: 6px;
  font-weight: bold;
`;
const EventText = styled.div`
  font-size: 15px;
  color: #4f4f4f;
  font-family: Arial;
  line-height: 16px;
  margin-bottom: 12px;
`;

const PromoButtonContainer = styled(Grid)`
  cursor: pointer;
  user-select: none;
  position: relative;
`;

const PromoButtonImg = styled.div`
  width: 100%;
  border-radius: 5px;
  height: 62px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;

const PromoButtonText = styled.div`
  position: absolute;
  left: calc(50% - 32px);
  bottom: 20px;
  color: ${({ theme }) => {
    return theme.useBackgroundColor ? theme.useBackgroundColor : "#fff";
  }};
  font-size: 20px;
`;

const ContainerForPromoList = styled(Grid)`
  padding: 14px;
`;

class Promotion extends Component {
  state = {
    list: [],
    selectedTab: 0,
    selectedPromoId: "",
    selectedPromoTitle: "",
    selectedBospId: 0,
    openJoin: false,
    selectedPromoSpecifications: [],
  };

  componentDidMount() {
    this.props.getPromotion();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account.token !== this.props.account.token) {
      this.props.getPromotion();
    }

    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.enqueueSnackbar(i18n.t("promotion.joinSuccess"), {
          variant: "success",
        });
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.enqueueSnackbar(i18n.t("promotion.promoJoint"), {
            variant: "error",
          });
        }
      }
    }
  }
  // handleJoinClick = (bosp_id) => {
  //   BonusService.JoinActivity(
  //     this.props.token,
  //     this.state.selectedPromoId,
  //     this.state.selectedBospId
  //   ).then((response) => {
  //     if (response.IsSuccess) {
  //       this.props.enqueueSnackbar(response.msg, {
  //         variant: "success",
  //       });
  //       this.ResetPopup();
  //     } else {
  //       this.props.enqueueSnackbar(response.msg, {
  //         variant: "error",
  //       });
  //     }
  //   });
  // };

  //TODO: Temporary hardcode the navigation
  handlejoinPromotionClick = (id, promotionType) => {
    if (this.props.account.token === null) this.props.showLogin(true);
    else {
      this.props.joinPromotion(id);
      if (
        [
          "FirstDeposit",
          "DailySecondDeposit",
          "DailyFirstDeposit",
          "DepositReward",
          "DepositAccumulateRoulette",
        ].indexOf(promotionType) >= 0
      ) {
        AppHistory.push({
          pathname: "/account/deposit/" + id,
        });
      }
    }
  };
  handlePromotionClick = (id, promotionType) => {
    AppHistory.push({
      pathname: "/promotion/" + id,
    });
  };
  render() {
    return (
      <Container>
        {this.props.general.promotionList.items &&
        this.props.general.promotionList.items.length <= 0 ? (
          <PromoEmptyContainer>
            <PromoEmptyText>
              <PromoEmptyTextLine
                style={i18n.language === "en-US" ? { fontSize: "58px" } : {}}
              >
                {i18n.t("promotion.emptyLine1")}
              </PromoEmptyTextLine>
              <PromoEmptyTextLine>
                {i18n.t("promotion.emptyLine2")}
              </PromoEmptyTextLine>
            </PromoEmptyText>
            <PromoEmptyBg></PromoEmptyBg>
          </PromoEmptyContainer>
        ) : (
          <></>
        )}
        <Wrap>
          <MContainer>
            <ThePromotion container>
              {this.props.general.promotionList.items
                .sort((a, b) => {
                  return a.order - b.order;
                })
                .map((data, index) => {
                  return (
                    <ContainerForPromoList
                      lg={6}
                      key={index}
                      order={data.order}
                    >
                      <ThePromotionContainer
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="stretch"
                      >
                        <Grid item>
                          <Grid container direction="column">
                            {(() => {
                              if (data.localization !== null) {
                                var checkLocale =
                                  data.localization[i18n.language];
                                return (
                                  <PromoImages
                                    key={index}
                                    img={
                                      checkLocale
                                        ? checkLocale.desktopBanner
                                        : data.desktopBanner
                                    }
                                  ></PromoImages>
                                );
                              } else {
                                return (
                                  <PromoImages
                                    key={index}
                                    img={data.desktopBanner}
                                  ></PromoImages>
                                );
                              }
                            })()}

                            <EventTitle>
                              【{i18n.t("promotion.promoDetail")}】
                            </EventTitle>
                            <EventLabel>
                              {i18n.t("promotion.promoTarget")}:
                            </EventLabel>
                            <EventText>
                              {data.vipLevels
                                .sort((a, b) => {
                                  return a - b;
                                })
                                .map((a, index) => {
                                  return (
                                    <span key={index}>
                                      VIP{a}
                                      {index < data.vipLevels.length - 1 &&
                                        ", "}
                                    </span>
                                  );
                                })}
                            </EventText>
                            <br />
                            <EventLabel>
                              {i18n.t("promotion.promoDate")}：
                            </EventLabel>
                            <EventText>
                              {moment(data.from).format("YYYY/MM/DD HH:mm:ss")}
                              {" - "}
                              {moment(data.to).format("YYYY/MM/DD HH:mm:ss")}
                            </EventText>
                          </Grid>
                        </Grid>
                        <PromoButtonContainer
                          item
                          onClick={() =>
                            this.handlePromotionClick(
                              data.id,
                              data.promotionType
                            )
                          }
                        >
                          <PromoButtonImg />
                          <PromoButtonText>
                            {i18n.t("promotion.details")}
                          </PromoButtonText>
                        </PromoButtonContainer>
                      </ThePromotionContainer>
                    </ContainerForPromoList>
                  );
                })}
            </ThePromotion>
          </MContainer>

          {
            //
            //  <MainContent>
            //    <Inner>
            //      {this.state.list.map((row) => (
            //        <Content key={row.id} id={"promo" + row.id}>
            //          <LeftContent>
            //            <PromoImg src={row.pc_thumbnail_text}></PromoImg>
            //          </LeftContent>
            //          <RightContent>
            //            <PromoTitle>{row.title}</PromoTitle>
            //            <PromoDate>{row.end_time_text}</PromoDate>
            //            <Collapse in={row.checked} collapsedHeight="70px">
            //              <PromoDesc
            //                onClick={this.contentClickHandler}
            //                dangerouslySetInnerHTML={{
            //                  __html: row.pc_promotion_describe.replace(
            //                    /{activity_id}/g,
            //                    row.id
            //                  ),
            //                }}
            //              ></PromoDesc>
            //            </Collapse>
            //            <Viewall onClick={() => this.ViewAllClick(row.id)}>
            //              {i18n.t("promotion.moreInfo")}&#187;
            //              <ViewallArrow></ViewallArrow>
            //            </Viewall>
            //          </RightContent>
            //        </Content>
            //      ))}
            //    </Inner>
            //  </MainContent>
            //
          }
        </Wrap>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    general: state.general,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    joinPromotion: (id) => {
      dispatch(generalAction.joinPromotion(id));
    },
    getPromotionList: (language) =>
      dispatch(generalAction.getPromotionList(language, 1, 99, true, "", true)),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    getPromotion: () => dispatch(generalAction.getPromotion()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Promotion))
);
