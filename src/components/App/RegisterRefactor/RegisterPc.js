import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";

import InputAdornment from "@material-ui/core/InputAdornment";
import UserIconPNG from "../../../assets/images/user-icon.png";
import Password1IconPNG from "../../../assets/images/password1-icon.png";
import Password2IconPNG from "../../../assets/images/password2-icon.png";
import IconMobilePNG from "../../../assets/images/icon-mobile.png";

import Checkbox from "@material-ui/core/Checkbox";
import { withSnackbar } from "notistack";
import config from "../../../config/config";
import i18n from "../../../utils/i18n";
import { useRegisterForm, useRegisterHandle } from "../../Common/hooks/pages/register";
import { RegisterContext } from "../../Common/contexts";

import {
    useStyles, Container, CloseIconContainer, TitleContainer, SubTitleContainer, FormContainer, CustomTextWrapper, CustomText, CustomFormControl, CustomSelect,
    CustomText2, CustomInvitationContainer, DescriptionContainer, Description, ButtonLogin, ButtonLoginLabel
} from "./styles";


const RegisterPc = ({ onHandleClose, onHandleLoginSuccess, enqueueSnackbar }) => {
    const { performNewRegister } = useRegisterForm(enqueueSnackbar);
    const { handleChangeUserName, handleChangePwd, handleChangePwd2, handleChangePhone, handleChangePromotion, handleTncClick, handleChangeAreaCode } = useRegisterHandle();
    const { formData, setFormData } = useContext(RegisterContext);

    useEffect(() => {
        console.log("Register v9.13.1");
    }, []);



    const onClickRegister = () => {
        console.log('onHandleLoginSuccess' + onHandleLoginSuccess)
        performNewRegister(false, onHandleLoginSuccess);
    }

    const classes = useStyles();
    return (
        <Container>
            <CloseIconContainer
                viewBox="4 4 16 16"
                onClick={onHandleClose}
            ></CloseIconContainer>
            <div className="clear"></div>
            <TitleContainer>{i18n.t("web.register.registerTitle")}</TitleContainer>
            <SubTitleContainer>
                {i18n.t("web.register.registerTitleLine2")}
            </SubTitleContainer>
            <FormContainer>
                <CustomTextWrapper>
                    <CustomText
                        onChange={handleChangeUserName}
                        id="username"
                        value={formData.username}
                        placeholder={i18n.t("web.register.username")}
                        variant="outlined"
                        autoComplete="off"
                        inputProps={{
                            maxLength: 16,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                    style={{ height: "24px", width: "30px" }}
                                >
                                    <img src={UserIconPNG} alt=""></img>
                                </InputAdornment>
                            ),
                        }}
                    />
                </CustomTextWrapper>

                <CustomTextWrapper>
                    <CustomText
                        onChange={handleChangePwd}
                        id="password"
                        value={formData.password}
                        placeholder={i18n.t("web.register.password")}
                        variant="outlined"
                        type="password"
                        autoComplete="off"
                        inputProps={{
                            maxLength: 20,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                    style={{ height: "26px", width: "30px" }}
                                >
                                    <img src={Password1IconPNG} alt=""></img>
                                </InputAdornment>
                            ),
                        }}
                    />
                </CustomTextWrapper>
                <CustomTextWrapper>
                    <CustomText
                        onChange={handleChangePwd2}
                        id="password2"
                        value={formData.password2}
                        placeholder={i18n.t("web.register.confirmPassword")}
                        variant="outlined"
                        type="password"
                        autoComplete="off"
                        inputProps={{
                            maxLength: 20,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment
                                    position="start"
                                    style={{ height: "30px", width: "32px" }}
                                >
                                    <img src={Password2IconPNG} alt=""></img>
                                </InputAdornment>
                            ),
                        }}
                    />
                </CustomTextWrapper> 
                {config.features.Register_ShowPhone && (
                    <React.Fragment>
                        <CustomFormControl>
                            <CustomSelect
                                native
                                variant="outlined"
                                value={formData.areacode}
                                displayEmpty
                                onChange={handleChangeAreaCode}
                            >
                                <option value={config.features.PhonePrefix}>
                                    {config.features.PhonePrefix}
                                </option>
                            </CustomSelect>
                        </CustomFormControl>
                        <CustomText2
                            onChange={handleChangePhone}
                            id="phone"
                            value={formData.phone}
                            placeholder={i18n.t("forgotPassword.plsEnterPhoneNumber")}
                            variant="outlined"
                            type="text"
                            autoComplete="off"
                            inputProps={{
                                maxLength: config.features.MAX_PHONE_LENGTH || 10,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        position="start"
                                        style={{ height: "26px", width: "30px" }}
                                    >
                                        <img src={IconMobilePNG} alt=""></img>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </React.Fragment>
                )}
                <div class="clear"></div>
                <CustomTextWrapper>
                    <CustomInvitationContainer>
                        <CustomText
                            onChange={handleChangePromotion}
                            value={formData.promotionId}
                            placeholder={i18n.t("web.register.promoteCode")}
                            variant="outlined"
                        />
                    </CustomInvitationContainer>
                </CustomTextWrapper>

                <DescriptionContainer>
                    <Checkbox
                        checked={formData.tnc}
                        className={classes.checkboxRoot}
                        onClick={handleTncClick}
                        checkedIcon={
                            <span className={clsx(classes.icon, classes.checkedIcon)} />
                        }
                        icon={<span className={classes.icon} />}
                    />
                    <Description>{i18n.t("web.register.contract")}</Description>
                </DescriptionContainer>

                <ButtonLogin onClick={onClickRegister}>
                    <ButtonLoginLabel>
                        {config.features.Register_CustomFlow_IDR
                            ? i18n.t("common.nextStep")
                   : i18n.t("web.register.btn")}
                    </ButtonLoginLabel>
                </ButtonLogin>
            </FormContainer>
        </Container>
    );
}

export default withRouter(
    connect(null, null)(withSnackbar(RegisterPc))
);
