import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Select, FormControl, withStyles } from "@material-ui/core";
import CustomTextField from "../../../Share/TextField";
import Button from "../../../Share/Button";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import { withSnackbar } from "notistack";
const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #16242a;
  margin-top: 0px;
`;

const TextFieldLabel = styled.div`
  font-size: 16px;
  text-align: center;

  color: #818181;
  margin: 10px 0 0 0;
`;
const TextFieldContainer = styled.div`
  margin: 0 auto;
  display: table;
`;
const TabButton = styled.div`
  font-size: 14px;

  color: #747474;

  text-align: center;

  float: left;
  margin-right: 8px;

  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      color: #151a34;`
      : ` border: solid 1px #e1dfdf;
      color: #747474;`};
  &:hover {
    cursor: pointer;
  }
  ${(props) => {
    return `background:url(${props.img}) no-repeat 10px center,#f7f7f7;`;
  }}
  background-size: auto 30px;
  padding-left: 40px;
  margin-bottom: 10px;
`;

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
    "&.MuiSelect-outlined.MuiSelect-outlined": {
      paddingRight: 44,
    },
  },
}))(Select);
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "395px",
    height: "38px",
    marginTop: "12px",
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
class AddCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      number: "",
      bankName: "",
      bankAccountName: "",
      bankBranch: "",
      selectedChannelIndex: 0,
      selectedBankTypeIndex: 0,
      channelList: [],
      disableBankNameInput: false,

      name: "",
      phone: "",
    };
  }

  componentDidMount() {
    this.formatChannelList();
  }
  componentDidUpdate(preProps, preState) {
    if (preProps.withdrawalList.length !== this.props.withdrawalList.length) {
      this.formatChannelList();
    }
    if (preState.selectedBankTypeIndex !== this.state.selectedBankTypeIndex) {
      this.formatChannelList();
    }
  }
  formatChannelList = () => {
    var channel = [];
    if (this.props.withdrawalList.length > 0) {
      var channelList = this.props.withdrawalList[
        this.state.selectedBankTypeIndex
      ].channel;
      var addedChannel = [];
      if (this.props.withdrawalList.length > 0) {
        for (var i = 0; i < channelList.length; i++) {
          if (addedChannel.indexOf(channelList[i].channelid) < 0) {
            addedChannel.push(channelList[i].channelid);
            channel.push(channelList[i]);
          }
        }
      }
    }
    var disableInput = false;
    var bankName = "";
    if (channel.length > 0) {
      if (
        channel[this.state.selectedChannelIndex].channelcode !== "CustomBank"
      ) {
        disableInput = true;
        bankName = channel[this.state.selectedChannelIndex].channelcode;
      }
    }
    this.setState({
      ...this.state,
      channelList: channel,
      bankName: bankName,
      disableBankNameInput: disableInput,
    });
    return channel;
  };
  handleBankTypeChange = (e) => {
    this.setState({
      ...this.state,
      selectedBankTypeIndex: e.target.value,
      selectedChannelIndex: 0,
    });
  };
  handleChannelChange = (e) => {
    var disableInput = false;
    var bankName = "";
    if (this.state.channelList[e.target.value].channelcode !== "CustomBank") {
      disableInput = true;
      bankName = this.state.channelList[e.target.value].channelcode;
    }
    this.setState({
      ...this.state,
      selectedChannelIndex: e.target.value,
      bankName: bankName,
      disableBankNameInput: disableInput,
    });
  };
  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };
  handleBankNameChange = (e) => {
    this.setState({ ...this.state, bankName: e.target.value });
  };
  handleBankAccountNameChange = (e) => {
    this.setState({ ...this.state, bankAccountName: e.target.value });
  };
  handleBankBranchChange = (e) => {
    this.setState({ ...this.state, bankBranch: e.target.value });
  };

  handleNameChange = (e) => {
    this.setState({ ...this.state, name: e.target.value });
  };
  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };

  handleNextClick = (e) => {
    var selected = this.props.withdrawalList[this.state.selectedBankTypeIndex];
    var detail = {};

    if (selected.banktype === "Bank") {
      var bankName = this.state.channelList[this.state.selectedChannelIndex]
        .channelcode;

      var bankAccountName = this.state.bankAccountName.trim();
      var bankBranch = this.state.bankBranch.trim();
      var number = this.state.number.trim();

      if (bankName === "") {
        this.props.enqueueSnackbar(i18n.t("card.addCard.msgEnterBankName"), {
          variant: "error",
        });
        return;
      }

      if (bankAccountName === "") {
        this.props.enqueueSnackbar(
          i18n.t("card.addCard.msgEnterBankAccountName"),
          {
            variant: "error",
          }
        );
        return;
      }

      if (number === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterWithdrawalNumber"), {
          variant: "error",
        });
        return;
      }
      detail = {
        bankAccount: number,
        bankName: bankName,
        name: bankAccountName,
        bankBranch: bankBranch,
      };
    } else if (
      selected.banktype === "ThirdParty" ||
      selected.banktype === "FPS"
    ) {
      if (this.state.name === "") {
        this.props.enqueueSnackbar(
          i18n.t("profile.nameVerify.msgPlsEnterName"),
          {
            variant: "error",
          }
        );
        return;
      }
      if (this.state.phone === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterPhone"), {
          variant: "error",
        });
        return;
      }

      if (this.state.phone.length < (config.features.MAX_PHONE_LENGTH || 10)) {
        this.props.enqueueSnackbar(i18n.t("common.noReachMin"), {
          variant: "error",
        });
        return;
      }
      detail = {
        username: this.state.name,
        phone: this.state.phone,
      };
    } else {
      number = this.state.number.trim();
      if (number === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterWithdrawalNumber"), {
          variant: "error",
        });
        return;
      }
      detail = {
        address: number,
      };
    }

    this.props.onhandleNextClick(
      this.state.channelList[this.state.selectedChannelIndex].channelid,
      selected.banktype,
      detail
    );
  };
  render() {
    const { withdrawalList } = this.props;

    const isEwallet =
      this.state.channelList.length &&
      this.state.channelList[this.state.selectedChannelIndex].channelcode ===
        "E-wallet";

    const eWalletCustom = isEwallet && config.features.AddCard_EWalletCustoms;

    const bankList = [
      "กสิกรไทย (Kasikorn Bank- KKR)",
      "ไทยพาณิชย์ (Siam Commercial Bank - SCB)",
      "กรุงไทย (KrungThai Bank - KTB)",
      "กรุงเทพ (Bankok Bank - BBL)",
      "ออมสิน (Government Savings Bank - GSB)",
      "ทหารไทยธนาชาต (TMBThanachart Bank - TTB)",
      "กรุงศรี (Bank of Ayudhya - KrungSri)",
      "ธ.ก.ส (Bank for Agriculture and Agricultural Cooperatives - BAAC)",
      "ยูโอบี (United Overseas Bank - UOB)",
      "ซีไอเอ็มบีไทย (CIMB THAI - CIMB)",
      "เกียรตินาคินภทัร (Kiatnakin Phatra Bank - KKP)",
      "อาคารสงเคราะห์ (Government Housing Bank - GH)",
    ];

    return (
      <Container>
        <SubTitle>{i18n.t("card.addCard.title")}</SubTitle>

        {!config.features.AddCard_HideCertainField && (
          <>
            <TextFieldLabel>
              {i18n.t("common.withdrawalBankType")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomFormControl>
                <CustomSelect
                  native
                  variant="outlined"
                  displayEmpty
                  value={this.state.selectedBankTypeIndex}
                  onChange={this.handleBankTypeChange}
                >
                  {withdrawalList.map((item, index) => {
                    return (
                      <option value={index} key={index}>
                        {item.banktype}
                      </option>
                    );
                  })}
                </CustomSelect>
              </CustomFormControl>
            </TextFieldContainer>
          </>
        )}

        {!(config.features.AddCard_HideChannel || eWalletCustom) && (
          <>
            <TextFieldLabel>
              {i18n.t("common.withdrawalChannel")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomFormControl>
                <CustomSelect
                  native
                  variant="outlined"
                  displayEmpty
                  value={this.state.selectedChannelIndex}
                  onChange={this.handleChannelChange}
                >
                  {withdrawalList.length > 0 &&
                    this.state.channelList.map((item, index) => {
                      return (
                        <option value={index} key={index}>
                          {i18n.t(item.channelname)}
                        </option>
                      );
                    })}
                </CustomSelect>
              </CustomFormControl>
            </TextFieldContainer>
          </>
        )}
        {(() => {
          if (
            withdrawalList.length > 0 &&
            withdrawalList[this.state.selectedBankTypeIndex].banktype === "Bank"
          ) {
            return (
              <>
                {!config.features.AddCard_HideCertainField && (
                  <>
                    {!eWalletCustom && (
                      <>
                        <TextFieldLabel>
                          {config.features.AddCard_DisplayFPS
                            ? i18n.t("hk28.card.addCard.BankName")
                            : i18n.t("card.addCard.BankName")}
                        </TextFieldLabel>
                        <TextFieldContainer>
                          {config.features.AddCard_BankDropdown ? (
                            <CustomFormControl>
                              <CustomSelect
                                native
                                variant="outlined"
                                displayEmpty
                                value={this.state.bankName}
                                onChange={this.handleBankNameChange}
                              >
                                <option value="" selected disabled>
                                  {config.features.AddCard_DisplayFPS
                                    ? i18n.t(
                                        "hk28.card.addCard.msgEnterBankName"
                                      )
                                    : i18n.t("card.addCard.msgEnterBankName")}
                                </option>
                                {bankList.length > 0 &&
                                  bankList.map((item, index) => {
                                    return (
                                      <option value={item} key={index}>
                                        {item}
                                      </option>
                                    );
                                  })}
                              </CustomSelect>
                            </CustomFormControl>
                          ) : (
                            <CustomTextField
                              marginTop={10}
                              placeholder={
                                config.features.AddCard_DisplayFPS
                                  ? i18n.t("hk28.card.addCard.msgEnterBankName")
                                  : i18n.t("card.addCard.msgEnterBankName")
                              }
                              width={395}
                              height={38}
                              float={"none"}
                              maxLength={255}
                              disabled={this.state.disableBankNameInput}
                              value={this.state.bankName}
                              handleTextFieldChange={this.handleBankNameChange}
                            ></CustomTextField>
                          )}
                        </TextFieldContainer>
                      </>
                    )}
                    {(() => {
                      if (
                        config.features.AddCard_BankBranch &&
                        !eWalletCustom
                      ) {
                        return (
                          <React.Fragment>
                            <TextFieldLabel>
                              {i18n.t("card.addCard.branch")}
                            </TextFieldLabel>
                            <TextFieldContainer>
                              <CustomTextField
                                marginTop={10}
                                placeholder={i18n.t(
                                  "card.addCard.branchPlaceHolder"
                                )}
                                width={395}
                                height={38}
                                float={"none"}
                                maxLength={255}
                                handleTextFieldChange={
                                  this.handleBankBranchChange
                                }
                              ></CustomTextField>
                            </TextFieldContainer>
                          </React.Fragment>
                        );
                      }
                    })()}
                  </>
                )}

                <TextFieldLabel>
                  {eWalletCustom
                    ? i18n.t("card.addCard.eWalletAccount")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("hk28.card.addCard.BankAccountName")
                    : i18n.t("card.addCard.BankAccountName")}
                </TextFieldLabel>
                <TextFieldContainer>
                  <CustomTextField
                    marginTop={10}
                    placeholder={
                      eWalletCustom
                        ? i18n.t("card.addCard.msgEnterEwalletAccount")
                        : config.features.AddCard_DisplayFPS
                        ? i18n.t("hk28.card.addCard.msgEnterBankAccountName")
                        : i18n.t("card.addCard.msgEnterBankAccountName")
                    }
                    width={395}
                    height={38}
                    float={"none"}
                    maxLength={255}
                    handleTextFieldChange={this.handleBankAccountNameChange}
                  ></CustomTextField>
                </TextFieldContainer>
              </>
            );
          } else {
            return null;
          }
        })()}
        {withdrawalList.length > 0 &&
        (withdrawalList[this.state.selectedBankTypeIndex].banktype ===
          "ThirdParty" ||
          withdrawalList[this.state.selectedBankTypeIndex].banktype ===
            "FPS") ? (
          <div>
            <TextFieldLabel>
              {config.features.AddCard_InputAddFPS
                ? i18n.t("custom.addcard.name")
                : i18n.t("profile.nameVerify.title")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomTextField
                marginTop={10}
                placeholder={
                  config.features.AddCard_InputAddFPS
                    ? i18n.t("custom.addcard.msgPlsEnterName")
                    : i18n.t("profile.nameVerify.msgPlsEnterName")
                }
                width={395}
                height={38}
                maxLength={50}
                float={"none"}
                handleTextFieldChange={this.handleNameChange}
              ></CustomTextField>
            </TextFieldContainer>
            <TextFieldLabel>
              {config.features.AddCard_InputAddFPS
                ? i18n.t("custom.addcard.phoneNumber")
                : config.features.AddCard_DisplayFPS
                ? i18n.t("bet28.phoneNumber")
                : i18n.t("common.phoneNumber")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomTextField
                marginTop={10}
                placeholder={
                  config.features.AddCard_InputAddFPS
                    ? i18n.t("custom.addcard.msgEnterPhone")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("bet28.msgEnterPhone")
                    : i18n.t("common.msgEnterPhone")
                }
                width={395}
                height={38}
                maxLength={config.features.MAX_PHONE_LENGTH || 10}
                float={"none"}
                handleTextFieldChange={this.handlePhoneChange}
              ></CustomTextField>
            </TextFieldContainer>
          </div>
        ) : (
          <div>
            <TextFieldLabel>
              {eWalletCustom
                ? i18n.t("card.addCard.phone")
                : config.features.AddCard_DisplayGCash
                ? i18n.t("piso.withdrawalNumber")
                : config.features.AddCard_DisplayFPS
                ? i18n.t("hk28.withdrawalNumber")
                : i18n.t("common.withdrawalNumber")}
            </TextFieldLabel>
            <TextFieldContainer>
              <CustomTextField
                marginTop={10}
                placeholder={
                  eWalletCustom
                    ? i18n.t("card.addCard.msgEnterPhone")
                    : config.features.AddCard_DisplayGCash
                    ? i18n.t("piso.msgEnterWithdrawalNumber")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("hk28.msgEnterWithdrawalNumber")
                    : i18n.t("common.msgEnterWithdrawalNumber")
                }
                width={395}
                height={38}
                maxLength={50}
                float={"none"}
                handleTextFieldChange={this.handleNumberChange}
              ></CustomTextField>
            </TextFieldContainer>
          </div>
        )}

        <TextFieldContainer>
          {(() => {
            if (this.props.showBack === true) {
              return (
                <Button
                  grayMode={true}
                  name={i18n.t("common.back")}
                  width={257}
                  marginRight={20}
                  handleClick={this.props.onhandleBackClick}
                ></Button>
              );
            } else {
              return null;
            }
          })()}

          <Button
            name={i18n.t("common.nextStep")}
            width={255}
            handleClick={this.handleNextClick}
          ></Button>
        </TextFieldContainer>
      </Container>
    );
  }
}

export default connect(null, null)(withSnackbar(AddCard));
