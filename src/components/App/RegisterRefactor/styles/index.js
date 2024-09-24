import styled from "styled-components";
import LoginBGPNG from "../../../../assets/images/login-bg.png";
import IconLoginClosePNG from "../../../../assets/images/icon-login-close.png";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconInboxSelectedPNG from "../../../../assets/images/icon-inbox-selected.png";


export const Container = styled.div`
width: 506px;
background: url(${LoginBGPNG});
background-attachment: fixed;
background-position: center;
display: table;
`;
export const CloseIconContainer = styled.div`
background: url(${IconLoginClosePNG}) no-repeat;
width: 28px;
height: 28px;
float: right;
margin: 10px 10px 0 0;
&:hover {
  cursor: pointer;
}
`;
export const TitleContainer = styled.div`
text-align: center;

font-size: 42px;

color: ${({ theme }) => {
        return theme.alternateTabText ? theme.alternateTabText : theme.secondary;
    }};
`;
export const SubTitleContainer = styled.div`
text-align: center;

font-size: 18px;

color: ${({ theme }) => {
        return theme.alternateTabText ? theme.alternateTabText : theme.secondary;
    }};
`;
export const FormContainer = styled.div`
margin: 10px 78px 0 78px;
padding: 0 3px;
`;
export const CustomText = withStyles({
    root: {
        width: "350px",
        height: "51px",
        borderRadius: "6px",
        border: "none",

        margin: 0,

        background: "white",

        "& .MuiOutlinedInput-input": {
            fontSize: "14px",
        },
        "& label.Mui-focused": {
            color: "#b6b6b6",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "none",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                border: "none",
            },
            "&:hover fieldset": {
                border: "none",
            },
            "&.Mui-focused fieldset": {
                border: "none",
            },
        },
    },
})(TextField);

export const CustomText2 = withStyles({
    root: {
        marginLeft: "8px",
        width: "240px",
        height: "51px",
        borderRadius: "6px",
        border: "none",
        boxShadow: "0px 3px 8px -2px rgba(0,0,0,0.75)",
        margin: 0,
        marginTop: "13px",
        background: "white",

        "& .MuiOutlinedInput-input": {
            fontSize: "14px",
        },
        "& label.Mui-focused": {
            color: "#b6b6b6",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "none",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                border: "none",
            },
            "&:hover fieldset": {
                border: "none",
            },
            "&.Mui-focused fieldset": {
                border: "none",
            },
        },
    },
})(CustomText);

export const CustomFormControl = withStyles((theme) => ({
    root: {
        width: "100px",
        height: "51px",
        border: "none",
        boxShadow: "0px 3px 8px -2px rgba(0,0,0,0.75)",
        marginTop: "13px",
        marginBottom: "13px",
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

export const CustomSelect = withStyles((theme) => ({
    root: {
        fontSize: "14px",

        color: "#818181",
    },
}))(Select);

export const ButtonLogin = styled.div`
margin-top: 24px;
margin-bottom: 35px;
width: 350px;
height: 51px;
color: ${({ theme }) => {
        return theme.alternateTabText ? theme.alternateTabText : theme.secondary;
    }};
font-size: 20px;
border-radius: 6px;

border: solid 1px #ffffff;
background-image: linear-gradient(
  to top,
  ${({ theme }) => theme.primaryGradient},
  ${({ theme }) => theme.primary}
);

&:hover {
  cursor: pointer;

  box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
}
`;
export const ButtonLoginLabel = styled.span`
text-align: center;
display: block;
margin-top: 10px;
`;

export const DescriptionContainer = styled.div`
padding: 12px 0 0 8px;
`;
export const Description = styled.div`
float: left;
width: 310px;
margin-left: 5px;
font-size: 14px;

line-height: 1.43;

color: ${({ theme }) => {
        return theme.alternateTabText ? theme.alternateTabText : theme.secondary;
    }};
`;

export const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: "2px",
        border: "solid #404040 1px",
    },
    formControl: {
        width: "78px",
        height: "46px",
        marginTop: "14px",
        marginRight: "10px",

        broder: "solid 2px #000",

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
    input: {
        fontSize: "14px",
    },
    checkboxRoot: {
        padding: "0",
        margin: "0",
        float: "left",
        "& .MuiIconButton-label": {
            borderRadius: "6px",
            border: "solid 1px #000",
        },
    },
    icon: {
        width: 20,
        height: 20,

        borderRadius: "5px",
        backgroundColor: "#fff",
        "$root.Mui-focusVisible &": {},
        "input:hover ~ &": {},
        "input:disabled ~ &": {},
    },
    checkedIcon: {
        backgroundImage: "url(" + IconInboxSelectedPNG + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "#fff",
        borderRadius: "5px",
        "&:before": {
            display: "block",
            width: 20,
            height: 20,
            backgroundImage: "url(" + IconInboxSelectedPNG + ")",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "5px",
            content: '""',
        },
        "input:hover ~ &": {},
    },
}));

export const CustomInvitationContainer = styled.div`
position: relative;
box-shadow: 0px 3px 8px -2px rgb(0 0 0 / 75%);
`;

export const CustomInvitationSelect = styled.select`
position: absolute;
right: 10px;
bottom: 15px;
border: none;
outline: none;
`;

export const CustomTextWrapper = styled.div`
box-shadow: 0px 3px 8px -2px rgba(0, 0, 0, 0.75);
border-radius: 6px;
margin-top: 13px;
`;