import { ApiService } from "./ApiService";
import config from "../../config/config";
export const AccountService = {
  CheckUserName,
  Login,
  Register,
  Activation,
  VerifyActivation,
  Logout,
  GetMemberInfo,
  AddRealName,
  CheckRealName,
  ChangeWithdrawalPassword,
  AddWithdrawalPassword,
  GetChangeWithdrawalPasswordVerificationCode,
  UpdateQQ,
  UpdateWechat,
  UpdateFB,
  UpdateTelegram,
  UpdateLine,
  UpdateViber,
  UpdateWhatsapp,
  VerifyEmail,
  UpdateEmail,
  VerifyPhone,
  UpdatePhone,
  UpdatePassword,
  VerifyForgotPassword,
  ResetPassword,
  GetIDCardNo,
  GetPromoteUser,
  GetPromoteBill,
  UpdateMemberName,
  UploadIC,
  SetBirthDate,
};

function CheckUserName(username) {
  const result = ApiService.get(`Player/checkUsername?=${username}`);
  return result;
}

function Login(username, password) {
  const result = ApiService.post("Player/Login", {
    username: username,
    password: password,
    platformtype: config.isPC,
  });
  result.then((response) => {});
  return result;
}

function Register(username, pwd, confirmpwd, invitationcode = "", upper) {
  var currency = config.currency;
  const result = ApiService.post("Player/create", {
    username,
    currency,
    pwd,
    confirmpwd,
    invitationcode,
    agent: true,
    testplayer: config.testplayer,
    upper,
  });
  return result;
}
function Activation(username, pwd, areacode, phone) {
  const result = ApiService.post("player/init-phone", {
    username,
    pwd,
    areacode,
    phone,
  });
  return result;
}
function VerifyActivation(securitykey, validatecode) {
  const result = ApiService.put("player/init-phone", {
    securitykey,
    validatecode,
  });
  return result;
}
function Logout() {
  const result = ApiService.del("Player/logout", {});
  result.then((response) => {
    if (response.IsSuccess) {
      localStorage.removeItem("token");
    }
  });

  return result;
}

function GetMemberInfo() {
  const result = ApiService.get("Player/info");
  return result;
}

function SetBirthDate(yyyymmdd) {
  const result = ApiService.patch("player/birthdate", {
    birthdate: yyyymmdd,
  });

  return result;
}

function UpdateQQ(member_qq) {
  const result = ApiService.patch("Player/qq", {
    qq: member_qq,
  });

  return result;
}

function UpdateWechat(member_wechat) {
  const result = ApiService.patch("Player/wechat", {
    wechat: member_wechat,
  });
  return result;
}

function UpdateFB(member_fb) {
  const result = ApiService.patch("Player/fb", {
    facebookmessenger: member_fb,
  });
  return result;
}

function UpdateTelegram(member_telegram) {
  const result = ApiService.patch("Player/telegram", {
    telegram: member_telegram,
  });
  return result;
}

function UpdateLine(member_line) {
  const result = ApiService.patch("Player/line", {
    line: member_line,
  });
  return result;
}

function UpdateViber(member_viber) {
  const result = ApiService.patch("Player/viber", {
    viber: member_viber,
  });
  return result;
}

function UpdateWhatsapp(member_whatsapp) {
  const result = ApiService.patch("Player/whatsapp", {
    whatsapp: member_whatsapp,
  });
  return result;
}

function ChangeWithdrawalPassword(newpwd, validateCode, securityKey) {
  const result = ApiService.patch("pay/password", {
    newpwd: newpwd,
    validatecode: validateCode,
    securitykey: securityKey,
  });
  return result;
}

function AddRealName(realname, id) {
  const result = ApiService.patch("player/identity", {
    realname: realname,
    id: id,
  });
  return result;
}

function CheckRealName(id) {
  const result = ApiService.get(`Player/identity/check/${id}`);
  return result;
}

function AddWithdrawalPassword(password) {
  const result = ApiService.post("pay/password", {
    pwd: password,
  });
  return result;
}

function GetChangeWithdrawalPasswordVerificationCode() {
  const result = ApiService.post("pay/password/validate-code", {});

  return result;
}

function VerifyEmail(email) {
  const result = ApiService.post("player/email", {
    email: email,
  });
  return result;
}

function UpdateEmail(securitykey, validateCode) {
  const result = ApiService.put("player/email", {
    securitykey: securitykey,
    validatecode: validateCode,
  });
  return result;
}

function VerifyPhone(phone, areacode) {
  const result = ApiService.post("player/phone", {
    phone: phone,
    area: areacode,
  });
  return result;
}

function UpdatePhone(securitykey, validateCode) {
  const result = ApiService.put("player/phone", {
    securitykey: securitykey,
    validatecode: validateCode,
  });
  return result;
}

function UpdatePassword(oldpwd, newpwd) {
  const result = ApiService.put("player/password", {
    oldpwd: oldpwd,
    newpwd: newpwd,
  });
  return result;
}

function VerifyForgotPassword(email, areaCode, phone) {
  const result = ApiService.post("player/password/forgot", {
    email: email,
    areaCode: areaCode,
    phone: phone,
  });
  return result;
}

function ResetPassword(securitykey, validatecode, newpwd) {
  const result = ApiService.post("player/password/reset", {
    securitykey: securitykey,
    validatecode: validatecode,
    newpwd: newpwd,
  });
  return result;
}
function GetIDCardNo() {
  const result = ApiService.get("pc/authentication");

  return result;
}
function GetPromoteUser(page, limit) {
  const result = ApiService.get(
    `pc/user/promoteUser?page=${page}&page_size=${limit}`
  );

  return result;
}
function GetPromoteBill(page, limit) {
  const result = ApiService.get(
    `pc/userPromoteBill?page=${page}&page_size=${limit}`
  );

  return result;
}
function UpdateMemberName(token, name) {
  const result = ApiService.post(
    "member/editSurename",
    {
      name,
      token,
    },
    true
  );

  return result;
}

function UploadIC(file) {
  const result = ApiService.postFile(`player/identity/upload`, file, {});

  return result;
}
