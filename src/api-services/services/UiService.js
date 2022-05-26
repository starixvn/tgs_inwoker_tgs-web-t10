import { ApiService } from "./ApiService";

export const UiService = {
  GetMarquee,
};

function GetMarquee(language) {
  const result = ApiService.get(`announcement/list/${language}`); //done
  return result;
}
