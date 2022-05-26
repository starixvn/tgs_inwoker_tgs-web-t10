import React, { useEffect } from "react";
import styled from "styled-components";
import { TextField, Select, FormControl, withStyles } from "@material-ui/core";
import i18n from "../../../../utils/i18n";
import CustomButton from "../../../Share/Button";

import LimitPopupPNG from "../../../../assets/images/limit-popup.png";
import Common from "../../../../utils/Common";
import config from "../../../../config/config";
import copy from "copy-to-clipboard";
import { withSnackbar } from "notistack";

const CustomImage = styled.img`
  height: 130px;
  width: auto;
`;

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "400px",
    height: "47.63px",

    marginRight: "5px",
    float: "left",
    backgroundColor: "#fff",
    padding: 0,
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
      display: "block",
      height: "100%",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);
const TabButton = styled.div`
  height: 86px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;

  text-align: center;

  float: left;
  margin-right: 8px;
  transition: all 0.3s;
  ${(props) =>
    props.active
      ? ` border: solid 1px ${props.theme.primary};
      color: ${props.theme.primary};`
      : ` border: solid 1px #e1dfdf;
      color: #747474;`};
  &:hover {
    cursor: pointer;
  }
`;

const NumberContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: #151a34;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  padding-top: 2px;
  float: left;
`;
const SubTitle = styled.div`
  font-size: 16px;
  float: left;
  color: #818181;
  margin: 0 0 0 10px;
`;
const SelectionContainer = styled.div`
  margin: 15px 0 0 30px;
`;
const QRCodeImg = styled.img``;
const TunnelButton = styled(TabButton)`
  min-width: 133px;
  height: 41px;

  margin-top: 3px;
  padding: 10px 20px 0 20px;
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
  },
}))(Select);

const LimitPopupContainer = styled.div`
  background: url(${LimitPopupPNG}) no-repeat,
    linear-gradient(90deg, rgba(2, 0, 36, 0) 10px, rgb(242, 230, 125) 11px);
  font-size: 14px;
  color: #ffffff;
  padding: 10px 10px 10px 22px;
  border-radius: 4px;
  display: inline-block;
  min-width: 150px;
`;

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;
const ExchangeRateContainer = styled.div``;

const TransferContainer = styled.div`
  color: #747474;
  padding: 5px 0;
  display: flex;
  align-items: center;
`;
const TransferLabel = styled.span`
  float: left;
  min-width: 100px;
  color: #151a34;
`;
const TransferLabelValue = styled.span`
  float: left;
`;

const Remark = styled.div`
  color: ${({ theme }) => theme.primary};
  opacity: 0.75;
`;

const CustomNumberingContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

const CopyIcon = styled.div`
  width: 15px;
  height: 15px;

  background-color: ${({ theme }) => theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/copy.png`
    }) no-repeat center /
  contain;`;
  }};
  cursor: pointer;
  margin-left: 10px;
`;

const Numbering = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: #151a34;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  padding-top: 2px;
  float: left;
`;

const TitleHint = styled.span`
  opacity: 0.5;
  margin-left: 10px;
`;

const NewStepOne = (props) => {
  const {
    amount,
    onAmountChange,
    name,
    onNameChange,
    account,
    onAccountChange,
    selectedMethodIndex,
    onMethodChange,
    selectedChannelIndex,
    onChannelChange,
    paymentType,
    onNextClick,
    exchangeRate,
    files,
  } = props;

  var count = document.getElementsByClassName("numbering");

  useEffect(() => {
    //setNumbers(count.length);
  });

  if (paymentType === null) return <></>;

  const methodList = paymentType.method;

  var isApplePay = paymentType.paymentcode.toUpperCase() === "APPLEPAY";
  var isManual = paymentType.paymentcode.toUpperCase() === "MANUAL";
  var isFPS =
    methodList[selectedMethodIndex].methodcode.toUpperCase() === "FPS";
  var isUsdt =
    methodList[selectedMethodIndex].methodcode.toUpperCase() === "USDT";

  var numberingCount = 0;
  const SubHeaderContainer = (props) => {
    numberingCount++;
    return (
      <CustomNumberingContainer className="numbering">
        {props.children}
        <Numbering>{numberingCount}</Numbering>
      </CustomNumberingContainer>
    );
  };

  const performCopy = (content) => {
    props.enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });

    copy(content);
  };

  const CopyFeature = ({ copyContent }) => {
    return (
      <CopyIcon
        onClick={() => {
          performCopy(copyContent);
        }}
      />
    );
  };

  return (
    <>
      <SubHeaderContainer>
        <SubTitle>
          {i18n.t("deposit.msgPlsSelectPayment")}

          <TitleHint>
            {methodList &&
              paymentType.paymentcode === "ZeroNineNinePay" &&
              "(" + i18n.t("hint._099") + ")"}
          </TitleHint>
        </SubTitle>
      </SubHeaderContainer>
      <SelectionContainer>
        {methodList.map((item, index) => {
          return (
            <TunnelButton
              key={index}
              onClick={() => onMethodChange(index)}
              active={selectedMethodIndex === index}
            >
              {i18n.t(item.methodcode)}
            </TunnelButton>
          );
        })}
      </SelectionContainer>

      <SplitLine></SplitLine>
      {(() => {
        if (methodList.length > 0 && selectedMethodIndex !== -1) {
          return (
            <>
              {!config.features.Deposit_HideDepositChannel && (
                <>
                  <SubHeaderContainer>
                    <SubTitle>{i18n.t("deposit.msgPlsSelectMethod")}</SubTitle>
                  </SubHeaderContainer>
                  <SelectionContainer>
                    {methodList[selectedMethodIndex].channel.map(
                      (item, index) => {
                        return (
                          <TunnelButton
                            key={index}
                            onClick={() => onChannelChange(index)}
                            active={selectedChannelIndex === index}
                          >
                            {item.channelname}
                          </TunnelButton>
                        );
                      }
                    )}
                  </SelectionContainer>

                  <SplitLine></SplitLine>
                </>
              )}
              {(() => {
                if (isManual) {
                  var channelExtend =
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].extended;

                  if (
                    methodList[selectedMethodIndex].methodcode.toUpperCase() ===
                    "THIRDPARTY"
                  ) {
                    return (
                      <>
                        <SubHeaderContainer>
                          <SubTitle>
                            {i18n.t("deposit.transferAccount")}
                          </SubTitle>
                        </SubHeaderContainer>
                        <SelectionContainer>
                          <QRCodeImg src={channelExtend.qrCodeFileUrl} />
                        </SelectionContainer>
                        <SplitLine></SplitLine>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <SubHeaderContainer>
                          <SubTitle>
                            {i18n.t("deposit.transferAccount")}
                          </SubTitle>
                        </SubHeaderContainer>
                        <SelectionContainer>
                          {channelExtend.qrCodeFileUrl && (
                            <QRCodeImg src={channelExtend.qrCodeFileUrl} />
                          )}
                          {channelExtend.logo && (
                            <QRCodeImg src={channelExtend.logo} />
                          )}
                          {channelExtend.qrCode && (
                            <QRCodeImg src={channelExtend.qrCode} />
                          )}
                          {channelExtend.address && (
                            <TransferContainer>
                              <TransferLabel>
                                {i18n.t("deposit.address")}:
                              </TransferLabel>
                              <TransferLabelValue>
                                {channelExtend.address}
                              </TransferLabelValue>
                              <CopyFeature
                                copyContent={channelExtend.address}
                              />
                            </TransferContainer>
                          )}
                          {channelExtend.name && (
                            <TransferContainer>
                              <TransferLabel>
                                {i18n.t("deposit.accName")}:
                              </TransferLabel>
                              <TransferLabelValue>
                                {channelExtend.name}
                              </TransferLabelValue>
                              <CopyFeature copyContent={channelExtend.name} />
                            </TransferContainer>
                          )}
                          {channelExtend.bankAccount && (
                            <TransferContainer>
                              <TransferLabel>
                                {i18n.t("deposit.cardNum")}:
                              </TransferLabel>
                              <TransferLabelValue>
                                {channelExtend.bankAccount}
                              </TransferLabelValue>
                              <CopyFeature
                                copyContent={channelExtend.bankAccount}
                              />
                            </TransferContainer>
                          )}
                          {channelExtend.phone && (
                            <TransferContainer>
                              <TransferLabel>
                                {i18n.t("deposit.phone")}:
                              </TransferLabel>
                              <TransferLabelValue>
                                {channelExtend.phone}
                              </TransferLabelValue>
                              <CopyFeature copyContent={channelExtend.phone} />
                            </TransferContainer>
                          )}
                          {channelExtend.email && (
                            <TransferContainer>
                              <TransferLabel>
                                {i18n.t("deposit.email")}:
                              </TransferLabel>
                              <TransferLabelValue>
                                {channelExtend.email}
                              </TransferLabelValue>
                              <CopyFeature copyContent={channelExtend.email} />
                            </TransferContainer>
                          )}

                          {channelExtend.fpsId && (
                            <TransferContainer>
                              <TransferLabel>
                                {i18n.t("deposit.fpsId")}:
                              </TransferLabel>
                              <TransferLabelValue>
                                {channelExtend.fpsId}
                              </TransferLabelValue>
                              <CopyFeature copyContent={channelExtend.fpsId} />
                            </TransferContainer>
                          )}
                        </SelectionContainer>
                        <SplitLine></SplitLine>
                      </>
                    );
                  }
                }
              })()}

              {(() => {
                if (
                  (isManual || isApplePay) &&
                  !config.features.Deposit_ManualApplePayHideBankAcc
                ) {
                  return (
                    <>
                      {!(config.features.Deposit_RemoveAccount || isUsdt) && (
                        <>
                          <SubHeaderContainer>
                            <SubTitle>
                              {config.features.Deposit_OriginAccount
                                ? i18n.t("idr1.pleaseEnterAccountName")
                                : i18n.t("common.pleaseEnterAccountName")}
                            </SubTitle>
                          </SubHeaderContainer>
                          <SelectionContainer>
                            {props.accountList.length > 1 ? (
                              <CustomFormControl>
                                <CustomSelect
                                  variant="outlined"
                                  value={account}
                                  displayEmpty
                                  onChange={onAccountChange}
                                  native
                                >
                                  <option value="">
                                    {config.features.Deposit_OriginAccount
                                      ? i18n.t("idr1.pleaseEnterAccountName")
                                      : i18n.t("common.pleaseEnterAccountName")}
                                  </option>
                                  {props.accountList.map((data, key) => {
                                    var detail = data.detail;

                                    return (
                                      <option
                                        value={
                                          detail.bankAccount ||
                                          detail.address ||
                                          detail.phone
                                        }
                                        key={key}
                                      >
                                        {detail.bankAccount ||
                                          detail.address ||
                                          detail.phone}{" "}
                                        ({data.banktype})
                                      </option>
                                    );
                                  })}
                                </CustomSelect>
                              </CustomFormControl>
                            ) : (
                              <TextField
                                style={{
                                  height: "38px",
                                  width: "258px",
                                  float: "left",
                                  marginRight: "5px",
                                  padding: 0,
                                }}
                                placeholder={
                                  config.features.Deposit_OriginAccount
                                    ? i18n.t("idr1.pleaseEnterAccountName")
                                    : i18n.t("common.pleaseEnterAccountName")
                                }
                                onChange={onAccountChange}
                                outputFormat="string"
                                variant="outlined"
                                autoComplete="off"
                                disabled={
                                  config.features.Deposit_AutofillFirstCard &&
                                  account !== ""
                                }
                                value={account}
                              ></TextField>
                            )}
                          </SelectionContainer>
                          {config.features.Deposit_AddTips && (
                            <div style={{ marginLeft: 30, marginTop: 8 }}>
                              <Remark>
                                {" "}
                                {i18n.t("mgm.accountDepositTips")}
                              </Remark>
                            </div>
                          )}
                          <SplitLine></SplitLine>
                        </>
                      )}
                      {(!(config.features.Deposit_RemoveName || isFPS) ||
                        config.features.Deposit_FPSWithName) && (
                        <>
                          <SubHeaderContainer>
                            <SubTitle>
                              {config.features.Deposit_CustomBankNameTranslation
                                ? i18n.t("mgm.msgPlsEnterAccount")
                                : config.features.Deposit_EnglishName
                                ? i18n.t("bet28.BankAccountName")
                                : i18n.t("deposit.msgPlsEnterAccount")}
                            </SubTitle>
                          </SubHeaderContainer>
                          <SelectionContainer>
                            <TextField
                              style={{
                                height: "38px",
                                width: "258px",
                                float: "left",
                                marginRight: "5px",
                                padding: 0,
                              }}
                              placeholder={
                                config.features
                                  .Deposit_CustomBankNameTranslation
                                  ? i18n.t("mgm.msgPlsEnterAccount")
                                  : config.features.Deposit_EnglishName
                                  ? i18n.t("bet28.msgEnterBankAccountName")
                                  : i18n.t("deposit.msgPlsEnterAccount")
                              }
                              onChange={onNameChange}
                              outputFormat="string"
                              variant="outlined"
                              autoComplete="off"
                              value={name}
                            ></TextField>
                          </SelectionContainer>
                          {config.features.Deposit_AddTips && (
                            <div style={{ marginLeft: 30, marginTop: 8 }}>
                              <Remark> {i18n.t("mgm.nameDepositTips")}</Remark>
                            </div>
                          )}
                          <SplitLine></SplitLine>
                        </>
                      )}
                    </>
                  );
                }
              })()}

              <SubHeaderContainer>
                <SubTitle>{i18n.t("deposit.plsEnterDepositAmount")}</SubTitle>
              </SubHeaderContainer>
              <SelectionContainer>
                <TextField
                  style={{
                    height: "38px",
                    width: "220px",
                    float: "left",
                    marginRight: "5px",
                    padding: 0,
                  }}
                  placeholder={
                    isUsdt
                      ? i18n.t("deposit.plsEnterUSDTAmount")
                      : i18n.t("deposit.plsEnterDepositAmount")
                  }
                  onChange={onAmountChange}
                  outputFormat="string"
                  variant="outlined"
                  autoComplete="off"
                  value={amount}
                  pattern="[0-9]*"
                  type={"number"}
                ></TextField>

                <LimitPopupContainer>
                  <LimitLabel>{i18n.t("deposit.limitDeposit")} </LimitLabel>
                  <LimitAmount>
                    {Common.formatNumberWithThousand(
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.from
                    )}{" "}
                    -{" "}
                    {Common.formatNumberWithThousand(
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.to
                    )}
                  </LimitAmount>
                </LimitPopupContainer>
                {(() => {
                  if (
                    methodList[selectedMethodIndex].methodcode === "Usdt" &&
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].extended.rate !== undefined
                  ) {
                    var usdtRate =
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].extended.rate;
                    if (paymentType.paymentcode.toUpperCase() === "MANUAL") {
                      return (
                        <ExchangeRateContainer style={{ marginTop: "4px" }}>
                          <LimitLabel>
                            {i18n.t("deposit.exchangeRate")} 1 USDT :{" "}
                          </LimitLabel>
                          <LimitAmount>{` ${usdtRate}`}</LimitAmount>
                          <div class="clear"></div>
                          <LimitLabel>
                            {i18n.t("deposit.totalAmount")}
                          </LimitLabel>
                          {" : "}
                          <LimitAmount>{` ${
                            isNaN(amount) === false
                              ? (amount * usdtRate).toFixed(2)
                              : 0
                          }`}</LimitAmount>
                        </ExchangeRateContainer>
                      );
                    }
                  }
                })()}
                {(() => {
                  if (methodList[selectedMethodIndex].methodcode === "Crypto") {
                    if (paymentType.paymentcode.toUpperCase() === "LEEPAY") {
                      return (
                        <ExchangeRateContainer style={{ marginTop: "4px" }}>
                          <LimitLabel>
                            {i18n.t("deposit.exchangeRate")}:{" "}
                          </LimitLabel>
                          <LimitAmount>{` ${exchangeRate.buyprice}`}</LimitAmount>
                          <LimitLabel style={{ marginLeft: "26px" }}>
                            {i18n.t("deposit.expectedPayment")}
                          </LimitLabel>{" "}
                          <LimitAmount>{` ${
                            isNaN(amount) === false
                              ? (amount / exchangeRate.buyprice).toFixed(2)
                              : 0
                          }`}</LimitAmount>
                        </ExchangeRateContainer>
                      );
                    } else {
                      return Object.keys(exchangeRate).map((key) => {
                        return Object.keys(exchangeRate[key]).map((key2) => {
                          if (key2 === "HKD") {
                            return (
                              <ExchangeRateContainer
                                style={{ marginTop: "4px" }}
                              >
                                <LimitLabel>
                                  {i18n.t("deposit.exchangeRate")}:{" "}
                                </LimitLabel>
                                <LimitAmount>{` ${exchangeRate[key][key2].rate}`}</LimitAmount>
                                <LimitLabel style={{ marginLeft: "26px" }}>
                                  {i18n.t("deposit.expectedPayment")}
                                </LimitLabel>{" "}
                                <LimitAmount>{` ${
                                  isNaN(amount) === false
                                    ? (
                                        amount / exchangeRate[key][key2].rate
                                      ).toFixed(2)
                                    : 0
                                }`}</LimitAmount>
                              </ExchangeRateContainer>
                            );
                          }
                        });
                      });
                    }
                  }
                })()}
                {paymentType.paymentcode.toUpperCase() === "UMPAY" && (
                  <Remark>{i18n.t("deposit.ppRemark")}</Remark>
                )}
              </SelectionContainer>
              <SplitLine></SplitLine>
              <SubHeaderContainer>
                <SubTitle>{i18n.t("deposit.promotion")}</SubTitle>
              </SubHeaderContainer>
              <SelectionContainer>
                <CustomFormControl>
                  <CustomSelect
                    variant="outlined"
                    value={props.depositPromotion}
                    displayEmpty
                    onChange={props.handleDepositPromotionChange}
                    native
                  >
                    <option value="">
                      {i18n.t("deposit.msgPlsSelectPromotion")}
                    </option>
                    {props.promotionList.map((data, key) => {
                      return (
                        <option value={data.id} key={key}>
                          {data.name}
                        </option>
                      );
                    })}
                  </CustomSelect>
                </CustomFormControl>
              </SelectionContainer>

              {(() => {
                if (isManual) {
                  return (
                    <React.Fragment>
                      <SplitLine></SplitLine>
                      <SubHeaderContainer>
                        <SubTitle>{i18n.t("deposit.uploadReceipt")}</SubTitle>
                      </SubHeaderContainer>
                      <SelectionContainer>
                        <button
                          onClick={() => {
                            document.getElementById("getFile").click();
                          }}
                          style={{ marginRight: 10 }}
                        >
                          {i18n.t("common.upload")}
                        </button>
                        <input
                          type="file"
                          id="getFile"
                          onChange={props.onFileChange}
                          accept="image/jpg, image/jpeg, image/png, image/tiff"
                          style={{ display: "none" }}
                        />
                        {files[0] ? files[0].name : ""}
                        <Remark>
                          {i18n.t(
                            config.features.Deposit_UploadRequired
                              ? "deposit.msgPlsUploadProof"
                              : "deposit.msgNotMustUploadProof"
                          )}
                        </Remark>
                      </SelectionContainer>
                    </React.Fragment>
                  );
                }
              })()}

              <SplitLine></SplitLine>
              <CustomButton
                name={i18n.t("common.submit")}
                width={257}
                marginTop={0}
                float={"none"}
                marginLeft={290}
                handleClick={() => {
                  onNextClick();
                }}
                disabled={
                  selectedMethodIndex < 0 ||
                  selectedChannelIndex < 0 ||
                  amount <
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].transferlimit.from ||
                  amount >
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].transferlimit.to ||
                  ((isManual || isApplePay) && amount.length <= 0) ||
                  (config.features.Deposit_UploadRequired && files.length <= 0)
                }
              ></CustomButton>
            </>
          );
        }
      })()}
    </>
  );
};

export default withSnackbar(NewStepOne);
