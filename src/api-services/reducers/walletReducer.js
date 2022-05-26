import {
  GETDEPOSITCHANNEL_BEGIN,
  GETDEPOSITCHANNEL_SUCCESS,
  GETDEPOSITCHANNEL_FAIL,
  LOGOUT_SUCCESS,
  CANCELDEPOSIT_BEGIN,
  CANCELDEPOSIT_SUCCESS,
  CANCELDEPOSIT_FAIL,
  DOMANUALDEPOSIT_BEGIN,
  DOMANUALDEPOSIT_SUCCESS,
  DOMANUALDEPOSIT_FAILED,
  DOMANUALDEPOSITUPLOAD_BEGIN,
  DOMANUALDEPOSITUPLOAD_SUCCESS,
  DOMANUALDEPOSITUPLOAD_FAIL,
  WALLET_HIDEMESSAGE,
  RESET_WALLETRESULT,
  GETBALANCELIST_BEGIN,
  GETBALANCELIST_SUCCESS,
  GETBALANCELIST_FAIL,
  UPDATEBALANCELIST_BEGIN,
  UPDATEBALANCELIST_SUCCESS,
  UPDATEBALANCELIST_FAIL,
  GETBANKCARDLIST_BEGIN,
  GETBANKCARDLIST_SUCCESS,
  GETBANKCARDLIST_FAIL,
  GETBANKLIST_BEGIN,
  GETBANKLIST_SUCCESS,
  GETBANKLIST_FAIL,
  DELETEBANKCARD_BEGIN,
  DELETEBANKCARD_SUCCESS,
  DELETEBANKCARD_FAIL,
  ADDBANKCARD_BEGIN,
  ADDBANKCARD_SUCCESS,
  ADDBANKCARD_FAIL,
  ADDBILLING_BEGIN,
  ADDBILLING_SUCCESS,
  ADDBILLING_FAIL,
  DOWITHDRAWAL_BEGIN,
  DOWITHDRAWAL_SUCCESS,
  DOWITHDRAWAL_FAIL,
  DOTRANSFER_BEGIN,
  DOTRANSFER_SUCCESS,
  DOTRANSFER_FAIL,
  DOWITHDRAWALALL_BEGIN,
  DOWITHDRAWALALL_SUCCESS,
  DOWITHDRAWALALL_FAIL,
  GETWITHDRAWALCHANNEL_BEGIN,
  GETWITHDRAWALCHANNEL_SUCCESS,
  GETWITHDRAWALCHANNEL_FAILED,
  DOLEEPAYDEPOSIT_BEGIN,
  DOLEEPAYDEPOSIT_SUCCESS,
  DOLEEPAYDEPOSIT_FAIL,
  DOUMPAYDEPOSIT_BEGIN,
  DOUMPAYDEPOSIT_SUCCESS,
  DOUMPAYDEPOSIT_FAIL,
  DOPRIMEPAYDEPOSIT_BEGIN,
  DOPRIMEPAYDEPOSIT_SUCCESS,
  DOPRIMEPAYDEPOSIT_FAIL,
  DOMATICPAYDEPOSIT_BEGIN,
  DOMATICPAYDEPOSIT_SUCCESS,
  DOMATICPAYDEPOSIT_FAIL,
  DOAPPLEPAYDEPOSIT_BEGIN,
  DOAPPLEPAYDEPOSIT_SUCCESS,
  DOAPPLEPAYDEPOSIT_FAIL,
  GETAUTOTRANSFER_SUCCESS,
  UPDATEAUTOTRANSFER_SUCCESS,
  DOTHIRDPARTYDEPOSIT_SUCCESS,
  DOBANKDEPOSIT_SUCCESS,
  DOBANKDEPOSIT_BEGIN,
  DOBANKDEPOSIT_FAILED,
  DOCRYPTODEPOSIT_SUCCESS,
  DOCRYPTODEPOSIT_BEGIN,
  DOCRYPTODEPOSIT_FAILED,
  DOTHIRDPARTYDEPOSIT_BEGIN,
  DOTHIRDPARTYDEPOSIT_FAIL,
  DOHELP2PAYDEPOSIT_BEGIN,
  DOHELP2PAYDEPOSIT_SUCCESS,
  DOHELP2PAYDEPOSIT_FAILED,
  DOSKYPAYDEPOSIT_BEGIN,
  DOSKYPAYDEPOSIT_SUCCESS,
  DOSKYPAYDEPOSIT_FAILED,
  DODEPOSIT_FAILED,
  DODEPOSIT_SUCCESS,
} from "../constant/actionType";
import { WalletType } from "../utils/Enum";
const initState = {
  loading: false,
  updateBalanceloading: false,
  transferLoading: false,
  message: "",
  depositTypeList: [],
  depositLoading: false,
  depositResult: null,
  cancelDepositResult: null,
  depositUploadResult: null,
  addBankCardResult: null,
  deleteBankCardResult: null,
  addBillingResult: null,
  withdrawalResult: null,
  transferResult: null,
  withdrawalAllResult: null,
  balanceList: [],
  bankCardList: [],
  bankList: [],
  withdrawalList: [],
  mainBalance: 0,
  mainSymbol: "",
  mainId: "",
  autotransfer: null,
  depositMinLimit: 0,
  depositMaxLimit: 0,
};
function mapDepositType(result) {
  var data = result.data;

  var depositTypeList = [];
  var checkDuplicate = [];
  var depositMinLimit = 99999999;
  var depositMaxLimit = 0;
  for (var i = 0; i < data.length; i++) {
    var depositType = {};
    if (data[i].transferlimit.from < depositMinLimit) {
      depositMinLimit = data[i].transferlimit.from;
    }
    if (data[i].transferlimit.to > depositMaxLimit) {
      depositMaxLimit = data[i].transferlimit.to;
    }
    if (checkDuplicate.indexOf(data[i].paymentcode) < 0) {
      checkDuplicate.push(data[i].paymentcode);

      depositType.paymentcode = data[i].paymentcode;
      depositType.paymentid = data[i].paymentid;
      depositType.displayorder = data[i].displayorder;
      depositType.method = [
        {
          methodid: data[i].methodid,
          methodcode: data[i].methodcode,
          channel: [
            {
              id: data[i].id,
              channelid: data[i].channelid,
              channelname: data[i].channelname,
              transferlimit: data[i].transferlimit,
              extended: data[i].extended,
              displayorder: data[i].displayorder,
            },
          ],
        },
      ];

      depositTypeList.push(depositType);
    } else {
      if (
        depositTypeList
          .filter((a) => a.paymentcode === data[i].paymentcode)[0]
          .method.filter((a) => a.methodcode === data[i].methodcode).length > 0
      ) {
        depositTypeList
          .filter((a) => a.paymentcode === data[i].paymentcode)[0]
          .method.filter((a) => a.methodcode === data[i].methodcode)[0]
          .channel.push({
            id: data[i].id,
            channelid: data[i].channelid,
            channelname: data[i].channelname,
            transferlimit: data[i].transferlimit,
            extended: data[i].extended,
            displayorder: data[i].displayorder,
          });
      } else {
        depositTypeList
          .filter((a) => a.paymentcode === data[i].paymentcode)[0]
          .method.push({
            methodid: data[i].methodid,
            methodcode: data[i].methodcode,
            channel: [
              {
                id: data[i].id,
                channelid: data[i].channelid,
                channelname: data[i].channelname,
                transferlimit: data[i].transferlimit,
                extended: data[i].extended,
                displayorder: data[i].displayorder,
              },
            ],
          });
      }
    }
  }
  for (var i = 0; i < depositTypeList.length; i++) {
    for (var x = 0; x < depositTypeList[i].method.length; x++) {
      depositTypeList[i].method[x].channel = depositTypeList[i].method[
        x
      ].channel.sort(function (a, b) {
        return a.displayorder > b.displayorder ? 1 : -1;
      });
    }
  }

  return {
    depositTypeList: depositTypeList,
    depositMinLimit: depositMinLimit,
    depositMaxLimit: depositMaxLimit,
  };
}
function mapBalanceList(data) {
  var balanceList = [];
  var mainBalance = data.main;
  var mainSymbol = "";
  var mainId = "";
  for (var i = 0; i < data.length; i++) {
    // if (isNaN(data[i].id)) {
    //   mainId = data[i].id;
    //   mainBalance = data[i].balance_text.replace(/,/g, "");
    //   mainSymbol = data[i].symbol;
    // }
    balanceList.push({
      balance: data[i].balance_text.replace(/,/g, ""),
      code: data[i].code,
      en_name: "",
      id: data[i].id,
      last_set_open: 0,
      maintenance: 2,
      max: "0.00",
      min: "0.00",
      money_limit: 0,

      money_limit_status: false,
      name: data[i].game_text,
      old_id: 0,
      parent_id: data[i].game_platform_id,
      pnl_ratio: "0.00",
      purse_type: isNaN(data[i].id)
        ? WalletType.MainWallet
        : WalletType.TransferWallet,
      short_name: "MAIN",
      status: 1,
      timezone: 0,
      type: 0,
      icon_url: data[i].icon_url,
      symbol: data[i].symbol,
    });
  }

  return { balanceList, mainBalance, mainSymbol, mainId };
}

function mapBankList(data) {
  var bankList = [];

  for (var i = 0; i < data.length; i++) {
    bankList.push({
      sort: data[i].sort,
      name: data[i].name,
      id: data[i].id,

      file: data[i].file,
    });
  }

  return { bankList };
}
function mapWithdrawalList(data) {
  var withdrawalList = [];
  var checkDuplicate = [];
  var withdrawalMaxLimit = 0;
  var withdrawalMinLimit = 999999999;
  for (var i = 0; i < data.length; i++) {
    if (checkDuplicate.indexOf(data[i].banktype) < 0) {
      checkDuplicate.push(data[i].banktype);
      withdrawalList.push({
        banktype: data[i].banktype,
        channel: [
          {
            channelid: data[i].channelid,
            channelname: data[i].channelname,
            channelcode: data[i].channelcode,
            transferlimit: data[i].transferlimit,
          },
        ],
      });
    } else {
      withdrawalList
        .filter((a) => a.banktype === data[i].banktype)[0]
        .channel.push({
          channelid: data[i].channelid,
          channelname: data[i].channelname,
          channelcode: data[i].channelcode,
          transferlimit: data[i].transferlimit,
        });
    }
  }

  return { withdrawalList, withdrawalMinLimit, withdrawalMaxLimit };
}
const walletReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    case GETBANKLIST_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
        bankList: [],
      };
    case GETBANKLIST_SUCCESS:
      return {
        ...state,
        ...mapBankList(action.payload),
        loading: false,
      };
    case GETBANKLIST_FAIL:
      return {
        ...state,
        message: action.payload,
        bankList: [],
        loading: false,
      };
    case GETWITHDRAWALCHANNEL_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
        withdrawalList: [],
      };
    case GETWITHDRAWALCHANNEL_SUCCESS:
      return {
        ...state,
        ...mapWithdrawalList(action.payload.data),
        loading: false,
      };
    case GETWITHDRAWALCHANNEL_FAILED:
      return {
        ...state,
        message: action.payload,
        withdrawalList: [],
        loading: false,
      };
    case DELETEBANKCARD_BEGIN:
      return {
        ...state,
        message: "",
        deleteBankCardResult: null,
        loading: true,
      };
    case DELETEBANKCARD_SUCCESS:
    case DELETEBANKCARD_FAIL:
      return {
        ...state,
        deleteBankCardResult: action.payload,
        loading: false,
      };

    case ADDBANKCARD_BEGIN:
      return {
        ...state,
        message: "",
        addBankCardResult: null,
        loading: true,
      };
    case ADDBANKCARD_SUCCESS:
    case ADDBANKCARD_FAIL:
      return {
        ...state,
        addBankCardResult: action.payload,
        loading: false,
      };

    case ADDBILLING_BEGIN:
      return {
        ...state,
        message: "",
        addBillingResult: null,
        loading: true,
      };
    case ADDBILLING_SUCCESS:
    case ADDBILLING_FAIL:
      return {
        ...state,
        addBillingResult: action.payload,
        loading: false,
      };

    case GETBANKCARDLIST_BEGIN:
      return {
        ...state,
        message: "",
        bankCardList: [],
        loading: true,
      };
    case GETBANKCARDLIST_SUCCESS:
      return {
        ...state,
        bankCardList: action.payload,
        loading: false,
      };
    case GETBANKCARDLIST_FAIL:
      return {
        ...state,
        message: action.payload,
        bankCardList: [],
        loading: false,
      };
    case GETBALANCELIST_BEGIN:
      return {
        ...state,
        message: "",
        loading: action.loading,
      };
    case GETBALANCELIST_SUCCESS:
      return {
        ...state,
        ...mapBalanceList(action.payload),
        loading: action.loading,
      };
    case GETBALANCELIST_FAIL:
      return {
        ...state,
        message: action.payload,
        balanceList: [],
        loading: action.loading,
      };
    case UPDATEBALANCELIST_BEGIN:
      return {
        ...state,
        message: "",
        updateBalanceloading: action.loading,
      };
    case UPDATEBALANCELIST_SUCCESS:
      return {
        ...state,
        ...mapBalanceList(action.payload),
        updateBalanceloading: action.loading,
      };
    case UPDATEBALANCELIST_FAIL:
      return {
        ...state,
        message: action.payload,
        balanceList: [],
        updateBalanceloading: action.loading,
      };
    case GETDEPOSITCHANNEL_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
      };
    case GETDEPOSITCHANNEL_SUCCESS:
      return {
        ...state,
        ...mapDepositType(action.payload),
        loading: false,
      };
    case GETDEPOSITCHANNEL_FAIL:
      return {
        ...state,
        message: action.payload,
        loading: false,
      };

    case DOWITHDRAWAL_BEGIN:
      return {
        ...state,
        message: "",
        loading: true,
      };
    case DOWITHDRAWAL_SUCCESS:
    case DOWITHDRAWAL_FAIL:
      return {
        ...state,
        withdrawalResult: action.payload,
        loading: false,
      };
    case DOTRANSFER_BEGIN:
      return {
        ...state,
        message: "",
        transferLoading: true,
      };
    case DOTRANSFER_SUCCESS:
    case DOTRANSFER_FAIL:
      return {
        ...state,
        transferResult: action.payload,
        transferLoading: false,
      };

    case DOMANUALDEPOSIT_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case DOMANUALDEPOSIT_SUCCESS:
    case DOMANUALDEPOSIT_FAILED:
      return {
        ...state,
        depositResult: action.payload,
        depositLoading: false,
      };
    case CANCELDEPOSIT_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case CANCELDEPOSIT_SUCCESS:
    case CANCELDEPOSIT_FAIL:
      return {
        ...state,
        cancelDepositResult: action.payload,
        depositLoading: false,
      };
    case DOMANUALDEPOSIT_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case DOMANUALDEPOSIT_SUCCESS:
    case DOMANUALDEPOSIT_FAILED:
      return {
        ...state,
        depositResult: action.payload,
        depositLoading: false,
      };
    case DOAPPLEPAYDEPOSIT_BEGIN:
    case DOHELP2PAYDEPOSIT_BEGIN:
    case DOSKYPAYDEPOSIT_BEGIN:
    case DOPRIMEPAYDEPOSIT_BEGIN:
    case DOMATICPAYDEPOSIT_BEGIN:
    case DOLEEPAYDEPOSIT_BEGIN:
    case DOUMPAYDEPOSIT_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case DOHELP2PAYDEPOSIT_FAILED:
    case DOSKYPAYDEPOSIT_FAILED:
    case DOHELP2PAYDEPOSIT_SUCCESS:
    case DOSKYPAYDEPOSIT_SUCCESS:
    case DOAPPLEPAYDEPOSIT_SUCCESS:
    case DOAPPLEPAYDEPOSIT_FAIL:
    case DOPRIMEPAYDEPOSIT_SUCCESS:
    case DOPRIMEPAYDEPOSIT_FAIL:
    case DOMATICPAYDEPOSIT_SUCCESS:
    case DOMATICPAYDEPOSIT_FAIL:
    case DOLEEPAYDEPOSIT_SUCCESS:
    case DOLEEPAYDEPOSIT_FAIL:
    case DOUMPAYDEPOSIT_SUCCESS:
    case DOUMPAYDEPOSIT_FAIL:
      return {
        ...state,
        depositResult: action.payload,
        depositLoading: false,
      };
    case DOMANUALDEPOSITUPLOAD_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case DOMANUALDEPOSITUPLOAD_SUCCESS:
    case DOMANUALDEPOSITUPLOAD_FAIL:
      return {
        ...state,
        depositUploadResult: action.payload,
        depositLoading: false,
      };
    case DOWITHDRAWALALL_BEGIN:
      return {
        ...state,
        message: "",
        transferLoading: true,
      };
    case DOWITHDRAWALALL_SUCCESS:
    case DOWITHDRAWALALL_FAIL:
      return {
        ...state,
        withdrawalAllResult: action.payload,
        transferLoading: false,
      };

    case WALLET_HIDEMESSAGE:
      return {
        ...state,
        message: "",
      };
    case RESET_WALLETRESULT:
      return {
        ...state,
        depositUploadResult: null,
        depositResult: null,
        cancelDepositResult: null,
        addBankCardResult: null,
        deleteBankCardResult: null,
        addBillingResult: null,
        withdrawalResult: null,
        transferResult: null,
      };

    case GETAUTOTRANSFER_SUCCESS:
      return {
        ...state,
        autotransfer: action.payload.data,
      };
    case UPDATEAUTOTRANSFER_SUCCESS:
      return {
        ...state,
        autotransfer: !state.autotransfer,
      };
    case DOBANKDEPOSIT_BEGIN:
    case DOCRYPTODEPOSIT_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case DOCRYPTODEPOSIT_SUCCESS:
    case DOCRYPTODEPOSIT_FAILED:
    case DOBANKDEPOSIT_SUCCESS:
    case DOBANKDEPOSIT_FAILED:
    case DODEPOSIT_SUCCESS:
    case DODEPOSIT_FAILED:
      return {
        ...state,
        depositResult: action.payload,
        depositLoading: false,
      };
    case DOTHIRDPARTYDEPOSIT_BEGIN:
      return {
        ...state,
        message: "",
        depositLoading: true,
      };
    case DOTHIRDPARTYDEPOSIT_SUCCESS:
    case DOTHIRDPARTYDEPOSIT_FAIL:
      return {
        ...state,
        depositResult: action.payload,
        depositLoading: false,
      };
    default:
      return state;
  }
};

export default walletReducer;
