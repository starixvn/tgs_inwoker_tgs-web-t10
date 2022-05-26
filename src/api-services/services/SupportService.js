import config from "../../config/config";
export const SupportService = {
  GetLiveSupport,
};

function GetLiveSupport(user_id, name, memo, enter_url, page_referrer) {
  const result = {
    IsSuccess: true,
    data: {
      //TODO: Temporary hardcode CS.
      online: config.liveChatUrl.replace("{name}", name), // ,
    },
  };

  return result;
}
