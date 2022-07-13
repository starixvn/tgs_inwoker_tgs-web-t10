import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import DynamicFont from "react-dynamic-font";
import { Textfit } from "react-textfit";
import { generalAction } from "../../../api-services/actions/generalAction";
import BtnRoulettePNG from "../../../assets/images/roulette/btn-roulette.png";
import RoulettePointer from "../../../assets/images/roulette/roulette-pointer.png";
import RouletteTurntable6 from "../../../assets/images/roulette/roulette-turntable-6.png";
import ModalBackgroundPNG from "../../../assets/images/roulette/bg-modal.png";
import BtnClose from "../../../assets/images/roulette/btn-close.png";
import TabActivePNG from "../../../assets/images/roulette/tab-active.png";
import TabPNG from "../../../assets/images/roulette/tab.png";
import EmptyBackgroundPNG from "../../../assets/images/roulette/bg-empty.png";
import LoadingGIF from "../../../assets/images/loading.gif";
import RouletteStandPNG from "../../../assets/images/roulette/roulette-stand.png";

import i18n from "../../../utils/i18n";
import { Dialog } from "@material-ui/core";
import { AppHistory } from "../../../history/History";
import config from "../../../config/config";
import {
  RESET_PROMOROULETTE,
  SHOW_LOGIN,
} from "../../../api-services/constant/actionType";

const moment = require("moment");

const Container = styled.div`
  height: auto;
  position: fixed;
  left: 2%;
  top: 40%

  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-50%);
  overflow: visible;
  color: white;
  border-radius: 8px;

  :hover {
  }
`;

const BtnRoulette = styled.div`
  cursor: pointer;
  width: 200px;
  height: 150px;
  background: url(${BtnRoulettePNG}) no-repeat;
  background-size: contain;
  filter: drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.2));
`;

const RouletteModal = styled(Dialog)`
  .MuiBackdrop-root {
    background: transparent;
  }
  .MuiDialog-scrollPaper {
    align-items: flex-start;
  }

  .MuiDialog-paper {
    min-width: 600px;
    background: #fffdee;
    border-radius: 50px;
    min-height: 458px;
    margin-top: 150px;
  }
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
    background: transparent;
  }
  .MuiDialog-scrollPaper {
  }

  .MuiDialog-paper {
    min-width: 549px;
    background: url(${EmptyBackgroundPNG}) no-repeat;
    min-height: 370px;
    background-position: -9px -6px;
    padding-top: 100px;
  }
`;

const ModalTitle = styled.div`
  text-align: center;
  font-weight: bold;
`;

const ModalTitleH1 = styled(ModalTitle)`
  font-size: 3em
  width: 518px;
  margin: 0 auto;
`;
const ModalTitleH2 = styled(ModalTitle)`
  font-size: 2.5em;
  width: 518px;
  margin: 0 auto;
`;

const ModalTitleH3 = styled(ModalTitle)`
  font-size: 1.5em;
  font-weight: normal;
  color: #ff0000;
  cursor: pointer;
  width: 230px;
  margin: 0 auto;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: 30px;
  background: url(${BtnClose}) no-repeat;
  width: 31px;
  height: 31px;
  z-index: 2;
`;

const RouletteContainer = styled.div`
  width: 600px;
  height: 458px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background: url(${ModalBackgroundPNG});
  background-size: 602px 458px;
  background-position-x: -2px;
`;

const LoadingIcon = styled.img`
  margin: 0 auto;
  display: block;
  margin-top: 200px;
`;
const LoadingContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 458px;
  transition: opacity 0.2s linear, height 0.02s linear 0.2s;
  z-index: 9;
  background-color: rgba(
    0,
    0,
    0,
    ${(props) => (props.opacity ? props.opacity : 0.8)}
  );
  ${(props) =>
    props.isLoading ? "opacity:1;height: 100%;" : "opacity:0;height:0px;"};
`;

const TabContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: self-end;
  position: relative;
  z-index: 2;
`;

const Stand = styled.div`
  width: 200px;
  height: 72px;
  background: url(${RouletteStandPNG}) no-repeat;
  background-size: cover;
  margin: 0 auto;
  position: absolute;
  top: 386px;
  left: 200px;
  z-index: 1;
`;
const Tab = styled.div`
  cursor: pointer;
  height: 39px;
  width: 100px;
  padding: 0 10px;
  margin: 0 10px;
  color: ${(props) => (props.active ? `#000` : `#fff`)};
  background: url(${(props) =>
      props.active ? `${TabActivePNG}` : `${TabPNG}`})
    no-repeat;
  background-size: contain;
`;

const TabTitle = styled.div`
  line-height: 40px;
  text-align: center;
`;

const Content = styled.div`
  width: 600px;
  height: 286px;
  padding: 20px;
`;

const RouletteWrapper = styled.div`
  padding-top: 25px;
  position: relative;
  z-index: 2;
`;

const Turntable = styled.div`
  width: 385px;
  height: 385px;
  background: url(${RouletteTurntable6}) no-repeat;
  background-size: cover;
  margin: 0 auto;
`;
const Pointer = styled.div`
  width: 116px;
  height: 116px;
  background: url(${RoulettePointer}) no-repeat;
  position: absolute;
  left: 250px;
  top: 165px;
  cursor: pointer;
  ${(props) =>
    props.disabled
      ? `
  filter: grayscale(1);
  cursor: not-allowed;`
      : ``}
`;

const RouletteItemContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const RouletteLabelContainer = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  top: -32px;
  left: 52px;
  transform: scale(0.65);
`;
const RouletteTtem1 = styled.div`
  color: #fef6ec;
`;
const RouletteTtem2 = styled.div`
  width: 100%;
  height: 100%;
  transform: rotate(-135deg);
  color: #e62155;
`;

const RouletteSpan = styled.span`
  width: 50%;
  height: 50%;
  display: inline-block;
  position: absolute;
  line-height: 23px;
`;

const RouletteTitle = styled.b`
  //padding-left: 50px;
  font-size: 28px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 75px;
  text-align: center;
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

const Roulette = (props) => {
  const [startRotateDeg, setStartRotateDeg] = useState(0);
  useEffect(() => {
    if (props.itemIndex !== null) {
      handleSpinResult();
    }
  }, [props.itemIndex]);

  const generateLabels = () => {
    return (
      <React.Fragment>
        <RouletteTtem1>
          {props.items.map((item, index) => {
            if (index % 2 !== 0) {
              return (
                <RouletteSpan style={item.style.span}>
                  <RouletteTitle style={item.style.label}>
                    <DynamicFont content={item.label}></DynamicFont>
                    {/* <Textfit min={18} max={22}>
                      {item.label}
                    </Textfit> */}
                  </RouletteTitle>
                </RouletteSpan>
              );
            } else return null;
          })}
        </RouletteTtem1>
        <RouletteTtem2>
          {props.items.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <RouletteSpan style={item.style.span}>
                  <RouletteTitle style={item.style.label}>
                    <DynamicFont content={item.label}></DynamicFont>
                    {/* <Textfit min={18} max={22}>
                      {item.label}
                    </Textfit> */}
                  </RouletteTitle>
                </RouletteSpan>
              );
            } else return null;
          })}
        </RouletteTtem2>
      </React.Fragment>
    );
  };

  const randomNum = (minNum, maxNum) => {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
  };

  const handleStartSpin = () => {
    if (!props.disableOnSpin) {
      if (props.account.token != null) {
        if (config.features.PromoRoulette_SMSVerification) {
          if (
            props.account.info.member_phone === null ||
            props.account.info.member_phone === ""
          ) {
            props.performCloseRouletteModal();
            props.handlePhoneVerifyClick();
          } else {
            props.getRouletteResult();
            handleSpin();
          }
        } else {
          props.getRouletteResult();
          handleSpin();
        }
      } else {
        props.handleOnSpinDisable();
        props.showLogin(true);
      }
    }
  };

  const handleSpin = () => {
    props.handleOnSpinDisable();
    const el = document.getElementById("roulette-turntable");
    const el2 = document.getElementById("roulette-label");

    const rouletteSpin = [{ transform: "rotate(1800deg)" }];
    const rouletteTime = {
      duration: 1000,
      iterations: 30,
    };
    el.animate(rouletteSpin, rouletteTime);
    el2.animate(rouletteSpin, rouletteTime);

    setStartRotateDeg(1800);
  };

  const handleSpinResult = () => {
    const ROULETTE_AREA_DEG_6 = [
      [326, 393],
      [36, 87],
      [91, 145],
      [149, 211],
      [215, 268],
      [272, 323],
    ];
    const giftIndex = props.itemIndex; //  result-1 index
    const targetDegree = randomNum(
      ROULETTE_AREA_DEG_6[giftIndex][0],
      ROULETTE_AREA_DEG_6[giftIndex][1]
    );

    let rotateDeg = 0;

    let i = 0;

    const turntableEl = document.getElementById("roulette-turntable");
    const labelEl = document.getElementById("roulette-label");

    if (
      turntableEl.getAnimations().length > 0 &&
      labelEl.getAnimations().length > 0
    ) {
      turntableEl.getAnimations()[0].pause();
      labelEl.getAnimations()[0].pause();
      turntableEl.getAnimations()[0].finish();
      labelEl.getAnimations()[0].finish();
    }
    if (labelEl.getAnimations().length > 0) {
      labelEl.getAnimations()[0].pause();
      labelEl.getAnimations()[0].finish();
    }
    const _fn = (n = 0) => {
      if (targetDegree + 360 * n > startRotateDeg) {
        rotateDeg = targetDegree + 360 * n;
      } else {
        i++;
        _fn(i);
      }
    };
    _fn();
    turntableEl.style.transform = `rotate(${rotateDeg + 360}deg)`;
    turntableEl.style.transition = `all 1000ms ease-out`;
    labelEl.style.transform = `rotate(${rotateDeg + 360}deg)`;
    labelEl.style.transition = `all 1000ms ease-out`;
    turntableEl.ontransitionend = () => {
      setTimeout(() => {
        props.performCloseRouletteModal();
        props.performOpenEmptyModal(
          i18n.t("promoRoulette.dialogRewardTitle1"),
          props.items[giftIndex].label
        );
      }, 2000);
      turntableEl.style.transition = `none`;
      labelEl.style.transition = `none`;
    };
    setStartRotateDeg(rotateDeg + 360);
  };

  return (
    <RouletteWrapper>
      <Turntable id="roulette-turntable"></Turntable>
      <RouletteLabelContainer>
        <RouletteItemContainer id="roulette-label">
          {generateLabels()}
        </RouletteItemContainer>
      </RouletteLabelContainer>
      <Pointer
        disabled={props.disableOnSpin}
        onClick={handleStartSpin}
      ></Pointer>
    </RouletteWrapper>
  );
};

const PromotionRoulette = (props) => {
  const [rouletteModal, setRouletteModal] = useState(false);
  const [emptyModal, setEmptyModal] = useState(false);
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [disableOnSpin, setDisableOnSpin] = useState(false);
  const [dialogContent, setDialogContent] = useState({});
  useEffect(() => {
    if (props.general.isRouletteAvailable != null) {
      if (props.general.isRouletteAvailable && rouletteModal) {
        if (disableOnSpin) {
          setDisableOnSpin(false);
        }
      } else if (!props.general.isRouletteAvailable && rouletteModal) {
        setRouletteModal(false);
        setDisableOnSpin(false);
        performOpenEmptyModal(
          i18n.t("promoRoulette.dialogUnavailableTitle1"),
          i18n.t("promoRoulette.dialogUnavailableTitle2"),
          i18n.t("promoRoulette.dialogUnavailableTitle3")
        );
      }
    }
  }, [props.general.isRouletteAvailable, rouletteModal]);

  const performOpenRouletteModal = () => {
    setRouletteModal(true);
  };

  const performCloseRouletteModal = () => {
    props.resetPromoRoulette();
    setDisableOnSpin(false);
    setRouletteModal(false);
  };

  const performOpenEmptyModal = (title1, title2, title3) => {
    setEmptyModal(true);
    setDialogContent({
      title1: title1,
      title2: title2,
      title3: title3,
    });
  };

  const performCloseEmptyModal = () => {
    props.resetPromoRoulette();
    setEmptyModal(false);
    setDialogContent({});
  };

  const handleOpenTab = (index) => {
    if (tabIndex === index && isTabOpen) {
      setIsTabOpen(false);
    } else {
      setIsTabOpen(true);
    }
  };

  const handleSwitchTab = (index) => {
    setTabIndex(index);
  };

  const handleOnSpinDisable = () => {
    setDisableOnSpin(true);
  };

  const handlePhoneVerifyClick = () => {
    AppHistory.push("/" + i18n.language + "/account/profile/member_phone");
  };

  const handleNavigateToPromotion = () => {
    AppHistory.push("/" + i18n.language + "/promotion");
  };

  const getRouletteResult = () => {
    props.getPromotionRouletteResult(props.promotionDetail.id);
  };

  const getRouletteStatus = () => {
    props.getPromotionRouletteStatus(props.promotionDetail.id);
  };

  const mapRouletteItems = (items) => {
    const rouletteItems6 = [
      {
        label: "",
        style: {
          span: {
            top: "255px",
            right: "30px",
            transform: "rotate(46deg)",
          },
          label: {
            transform: "translate(-50%, -50%)",
          },
        },
      },
      {
        label: "",
        style: {
          span: {
            top: "28px",
            left: "0px",
            transform: "rotate(25deg)",
          },
          label: {
            transform: "translate(-50%, -50%) rotate(185deg)",
          },
        },
      },
      {
        label: "",
        style: {
          span: {
            top: "-21px",
            left: "182px",
            transform: "rotate(9deg)",
          },
          label: {
            transform: "translate(-50%, -50%) rotate(-85deg)",
          },
        },
      },
      {
        label: "",
        style: {
          span: {
            bottom: "-33px",
            left: "103px",
            transform: "rotate(0deg)",
          },
          label: {
            transform: "translate(-50%, -50%) rotate(-270deg)",
          },
        },
      },
      {
        label: "",
        style: {
          span: {
            top: "145px",
            left: "-35px",
            transform: "rotate(-20deg)",
          },
          label: {
            transform: "translate(-50%, -50%) rotate(185deg)",
          },
        },
      },
      {
        label: "",
        style: {
          span: {
            top: "67px",
            right: "-24px",
            transform: "rotate(-29deg)",
          },
          label: {
            transform: "translate(-50%, -50%)",
          },
        },
      },
    ];
    rouletteItems6.map((item, index) => {
      item.label = items[index].title;
      item.id = items[index].id;
      item.bonus = items[index].bonus;
      return null;
    });
    return rouletteItems6;
  };

  const tabMenu = [
    {
      label: i18n.t("promoRoulette.main"),
    },
    {
      label: i18n.t("promoRoulette.content"),
    },
    {
      label: i18n.t("promoRoulette.terms"),
    },
  ];

  return (
    <div>
      <Container>
        <BtnRoulette
          onClick={() => {
            getRouletteStatus();
            performOpenRouletteModal();
          }}
        ></BtnRoulette>
      </Container>
      <RouletteModal open={rouletteModal} onClose={performCloseRouletteModal}>
        <RouletteContainer>
          <LoadingContainer isLoading={props.general.loading}>
            <LoadingIcon src={LoadingGIF}></LoadingIcon>
          </LoadingContainer>
          <Roulette
            itemIndex={props.general.itemIndex}
            items={mapRouletteItems(props.promotionDetail.campaignDetail.items)}
            account={props.account}
            showLogin={props.showLogin}
            disableOnSpin={disableOnSpin}
            handleOnSpinDisable={handleOnSpinDisable}
            getRouletteResult={getRouletteResult}
            performOpenEmptyModal={performOpenEmptyModal}
            performCloseRouletteModal={performCloseRouletteModal}
            handlePhoneVerifyClick={handlePhoneVerifyClick}
          ></Roulette>
          <TabContainer>
            {tabMenu.map((item, index) => {
              return (
                <Tab
                  active={index === tabIndex}
                  onClick={() => {
                    handleOpenTab(index);
                    handleSwitchTab(index);
                  }}
                >
                  <TabTitle>
                    <DynamicFont content={item.label}></DynamicFont>
                  </TabTitle>
                </Tab>
              );
            })}
          </TabContainer>
          <Stand></Stand>
        </RouletteContainer>
        {isTabOpen && (
          <Content>
            {tabIndex === 0 && (
              <React.Fragment>
                <EventTitle>【{i18n.t("promotion.promoDetail")}】</EventTitle>
                <EventLabel>{i18n.t("promotion.promoTarget")}:</EventLabel>
                <EventText>
                  {props.promotionDetail.vipLevels.map((a, index) => {
                    return (
                      <span key={index}>
                        VIP{a}
                        {index < props.promotionDetail.vipLevels.length - 1 &&
                          ", "}
                      </span>
                    );
                  })}
                </EventText>
                <br />
                <EventLabel>{i18n.t("promotion.promoDate")}：</EventLabel>
                <EventText>
                  {moment(props.promotionDetail.from).format(
                    "YYYY/MM/DD HH:mm:ss"
                  )}
                  {" - "}
                  {moment(props.promotionDetail.to).format(
                    "YYYY/MM/DD HH:mm:ss"
                  )}
                </EventText>
              </React.Fragment>
            )}
            {tabIndex === 1 && (
              <React.Fragment>
                <EventText
                  dangerouslySetInnerHTML={{
                    __html:
                      "<div>" +
                      (() => {
                        if (
                          props.promotionDetail.localization !== null &&
                          props.promotionDetail.localization[i18n.language] !==
                            undefined &&
                          props.promotionDetail.localization[i18n.language]
                            .content !== undefined
                        ) {
                          return props.promotionDetail.localization[
                            i18n.language
                          ].content;
                        } else {
                          return props.promotionDetail.content;
                        }
                      })() +
                      "</div>",
                  }}
                ></EventText>
              </React.Fragment>
            )}
            {tabIndex === 2 && (
              <React.Fragment>
                <EventText
                  dangerouslySetInnerHTML={{
                    __html:
                      "<div>" +
                      (() => {
                        if (
                          props.promotionDetail.localization !== null &&
                          props.promotionDetail.localization[i18n.language] !==
                            undefined &&
                          props.promotionDetail.localization[i18n.language]
                            .terms !== undefined
                        ) {
                          return props.promotionDetail.localization[
                            i18n.language
                          ].terms;
                        } else {
                          return props.promotionDetail.terms;
                        }
                      })() +
                      "</div>",
                  }}
                ></EventText>
              </React.Fragment>
            )}
          </Content>
        )}
        <CloseButton onClick={performCloseRouletteModal}></CloseButton>
      </RouletteModal>
      <CustomModal open={emptyModal} onClose={performCloseEmptyModal}>
        {dialogContent.title1 && (
          <ModalTitleH1>
            <Textfit min={38} max={48}>
              {dialogContent.title1}
            </Textfit>
          </ModalTitleH1>
        )}
        {dialogContent.title2 && (
          <ModalTitleH2>
            <Textfit min={30} max={40}>
              {dialogContent.title2}
            </Textfit>
          </ModalTitleH2>
        )}
        {dialogContent.title3 && (
          <ModalTitleH3 onClick={handleNavigateToPromotion}>
            <Textfit min={14} max={24}>
              {dialogContent.title3}
            </Textfit>
          </ModalTitleH3>
        )}
        {/* <CloseButton onClick={performCloseEmptyModal}></CloseButton> */}
      </CustomModal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    ui: state.ui,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    getPromotionRouletteStatus: (id) =>
      dispatch(generalAction.getPromotionRouletteStatus(id)),
    getPromotionRouletteResult: (id) =>
      dispatch(generalAction.getPromotionRouletteResult(id)),
    resetPromoRoulette: () => dispatch({ type: RESET_PROMOROULETTE }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PromotionRoulette);
