import { ApiService } from "./ApiService";
import config from "../../config/config";

export const InboxService = {
  InboxList,
  UpdateReadMessage,
  DeleteMessage,
};

function InboxList(language, page, limit) {
  const result = ApiService.get(
    `letter/${language}?page=${page}&rows=${limit}`
  );

  return result;
}

function UpdateReadMessage(ids) {
  const result = ApiService.postArray("letter", ids);

  return result;
}
function DeleteMessage(ids) {
  const result = ApiService.post("member/messageDelete", {
    ids,
  });

  return result;
}
