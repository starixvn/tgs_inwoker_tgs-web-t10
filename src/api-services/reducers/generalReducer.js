import {
  IPRESTRICT,
  GETMOBILEPREFIX_SUCCESS,
  GETSITETOKEN_SUCCESS,
  GETSITETOKEN_FAIL,
  UNAUTHORIZE,
  GETPROMOLIST_BEGIN,
  GETPROMOLIST_SUCCESS,
  GETPROMOLIST_FAILURE,
  GETPLAYERPROMOLIST_BEGIN,
  GETPLAYERPROMOLIST_SUCCESS,
  GETPLAYERPROMOLIST_FAILURE,
  JOINPROMO_BEGIN,
  JOINPROMO_SUCCESS,
  JOINPROMO_FAILURE,
  GETBRANDCOMMUNICATION_SUCCESS,
  GETBRANDCOMMUNICATION_FAIL,
  GETBRANDLANGUAGE_BEGIN,
  GETBRANDLANGUAGE_SUCCESS,
  GETBRANDLANGUAGE_FAIL,
  GETLIVECHATURL_SUCCESS,
  GETBANNER_BEGIN,
  GETBANNER_SUCCESS,
  GETBANNER_FAIL,
  GETBRAND_BEGIN,
  GETBRAND_SUCCESS,
  GETBRAND_FAIL,
} from "../constant/actionType";
const initialState = {
  isIPRestrict: false,
  mobilePrefix: [],
  isMaintenance: false,
  promotionList: { items: [] },
  token: "",
  brandLanguage: [
    {
      culturecode: "en-US",
    },
  ],
  brandsSupport: [],
  livechat: "",
  banner: [],
  brand: {
    //TGS-197, since hide when true, default hide, show when return false
    hasInvitationCode: true,
  },
};
export function generalReducer(state = initialState, action) {
  switch (action.type) {
    case IPRESTRICT:
      return {
        ...state,
        isIPRestrict: true,
      };
    case GETMOBILEPREFIX_SUCCESS:
      return {
        ...state,
        mobilePrefix: action.payload,
      };
    case UNAUTHORIZE:
      return {
        ...state,
        token: "",
      };
    case GETSITETOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
      };
    case GETSITETOKEN_FAIL:
      return {
        ...state,
        token: action.payload.token,
        isMaintenance: true,
      };
    case GETPLAYERPROMOLIST_BEGIN:
    case GETPROMOLIST_BEGIN:
      return {
        ...state,
        loading: action.loading,
      };
    case GETPLAYERPROMOLIST_SUCCESS:
    case GETPROMOLIST_SUCCESS:
      return {
        ...state,
        promotionList: action.payload.data,
        loading: action.loading,
      };
    case GETPLAYERPROMOLIST_FAILURE:
    case GETPROMOLIST_FAILURE:
      return {
        ...state,
        promotionList: { items: [] },
        loading: action.loading,
      };
    case JOINPROMO_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case JOINPROMO_SUCCESS:
      return {
        ...state,
        joinPromoResult: action.payload.data,
        loading: false,
      };
    case JOINPROMO_FAILURE:
      return {
        ...state,
        joinPromoResult: action.payload.data,
        loading: false,
      };

    case GETBRANDCOMMUNICATION_SUCCESS:
      return {
        ...state,
        brandsSupport: action.payload.data,
        loading: false,
      };

    case GETBRANDCOMMUNICATION_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GETBRANDLANGUAGE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GETBRANDLANGUAGE_SUCCESS:
      return {
        ...state,
        brandLanguage: action.payload.data,
        loading: false,
      };

    case GETBRANDLANGUAGE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GETBANNER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GETBANNER_SUCCESS:
      return {
        ...state,
        banner: action.payload.data,
        loading: false,
      };

    case GETBANNER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GETBRAND_SUCCESS:
      var desktopUrl = action.payload.data.desktopLogoUrl;
      var mobileUrl = action.payload.data.mobileLogoUrl;
      var loadingUrl = action.payload.data.loadingUrl;
      var hasInvitationCode = action.payload.data.hasInvitationCode;

      if (desktopUrl && desktopUrl.indexOf("https://") < 0)
        desktopUrl = "https://" + desktopUrl;
      if (mobileUrl && mobileUrl.indexOf("https://") < 0)
        mobileUrl = "https://" + mobileUrl;
      if (loadingUrl && loadingUrl.indexOf("https://") < 0)
        loadingUrl = "https://" + loadingUrl;
      return {
        ...state,
        brand: {
          ...action.payload.data,
          desktopLogoUrl: desktopUrl,
          mobileLogoUrl: mobileUrl,
          loadingUrl: loadingUrl,
          hasInvitationCode: hasInvitationCode,
        },
        loading: false,
      };

    case GETBRAND_FAIL:
      console.log("GETBRAND_FAIL");

      return {
        ...state,
        // brand: { hasInvitationCode: true },
        loading: false,
      };
    case GETLIVECHATURL_SUCCESS:
      return {
        ...state,
        livechat: action.payload.data,
        loading: false,
      };

    default:
      return state;
  }
}
