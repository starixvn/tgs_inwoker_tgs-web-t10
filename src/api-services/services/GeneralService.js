import { ApiService } from "./ApiService";
import config from "../../config/config";

export const GeneralService = {
  GetSiteToken,
  GetPromotionList,
  GetPlayerPromotionList,
  JoinPromotion,
  GetBrandCommunication,
  GetLocalization,
  GetLiveChatURL,
  GetBrandLanguage,
  GetBanner,
  GetBrand,
  GetJoinedPromoReport,
  GetVIP,
  GetInvitationCode,
};

function GetSiteToken() {
  const result = ApiService.post("Auth/jwt", {
    client: config.client,
    currency: config.currency,
  }); //done
  return result;
}
function GetBrand() {
  const result = ApiService.get("brand"); //done
  return result;
}

function JoinPromotion(id) {
  const result = ApiService.post(`promotion/${id}/join`);

  return result;
}
function GetPromotionList(language, page, rows, desc, sort, all) {
  const result = ApiService.get(
    `promotion/${language}?page=${page}&rows=${rows}&desc=${desc}&sort=${sort}&all=${all}`
  );

  return result;
}
function GetPlayerPromotionList(language, page, rows, desc, sort, all) {
  const result = ApiService.get(
    `playerpromotion/${language}?page=${page}&rows=${rows}&desc=${desc}&sort=${sort}&all=${all}`
  );

  return result;
}

function GetBrandCommunication() {
  const result = ApiService.get(`brandcommunication`);
  return result;
}
function GetLocalization() {
  const result = ApiService.get(`localization`);
  return result;
}

function GetLiveChatURL() {
  const result = ApiService.get(`brandlivechat`);
  return result;
}
function GetBrandLanguage() {
  const result = ApiService.get(`brandlanguage`);
  return result;
}
function GetBanner() {
  const result = ApiService.get(`banner`);
  return result;
}

function GetJoinedPromoReport(From, To, page, rows, desc, sort, all) {
  const result = ApiService.get(
    `playerpromotion/joined?From=${From}&To=${To}&page=${page}&rows=${rows}&desc=${desc}&sort=${sort}&all=${all}`
  );
  return result;
}

function GetVIP() {
  const result = ApiService.get("vip");
  return result;
}

function GetInvitationCode() {
  const result = ApiService.get("agent");
  return result;
}
