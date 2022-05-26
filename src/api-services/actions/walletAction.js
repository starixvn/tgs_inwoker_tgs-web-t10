import {
  GETWALLETBALANCE_BEGIN,
  GETWALLETEBALANCE_SUCCESS,
  GETWALLETBALANCE_FAILED,
  GETDEPOSITCHANNEL_BEGIN,
  GETDEPOSITCHANNEL_SUCCESS,
  GETDEPOSITCHANNEL_FAIL,
  DOMANUALDEPOSIT_BEGIN,
  DOMANUALDEPOSIT_SUCCESS,
  DOMANUALDEPOSIT_FAILED,
  DOMANUALDEPOSITUPLOAD_BEGIN,
  DOMANUALDEPOSITUPLOAD_SUCCESS,
  DOMANUALDEPOSITUPLOAD_FAIL,
  GETWITHDRAWALCHANNEL_BEGIN,
  GETWITHDRAWALCHANNEL_SUCCESS,
  GETWITHDRAWALCHANNEL_FAILED,
  GETBANKCARDLIST_BEGIN,
  GETBANKCARDLIST_SUCCESS,
  GETBANKCARDLIST_FAIL,
  DELETEBANKCARD_BEGIN,
  DELETEBANKCARD_SUCCESS,
  DELETEBANKCARD_FAIL,
  ADDBANKCARD_BEGIN,
  ADDBANKCARD_SUCCESS,
  ADDBANKCARD_FAIL,
  GETBALANCELIST_BEGIN,
  GETBALANCELIST_SUCCESS,
  GETBALANCELIST_FAIL,
  UPDATEBALANCELIST_BEGIN,
  UPDATEBALANCELIST_SUCCESS,
  UPDATEBALANCELIST_FAIL,
  CANCELDEPOSIT_BEGIN,
  CANCELDEPOSIT_SUCCESS,
  CANCELDEPOSIT_FAIL,
  DOWITHDRAWALALL_BEGIN,
  DOWITHDRAWALALL_SUCCESS,
  DOWITHDRAWALALL_FAIL,
  DOTRANSFER_BEGIN,
  DOTRANSFER_SUCCESS,
  DOTRANSFER_FAIL,
  GETGAMEBALANCE_BEGIN,
  GETGAMEBALANCE_SUCCESS,
  GETGAMEBALANCE_FAIL,
  ADDBILLING_BEGIN,
  ADDBILLING_SUCCESS,
  ADDBILLING_FAIL,
  DOLEEPAYDEPOSIT_BEGIN,
  DOLEEPAYDEPOSIT_SUCCESS,
  DOLEEPAYDEPOSIT_FAIL,
  DOUMPAYDEPOSIT_BEGIN,
  DOUMPAYDEPOSIT_SUCCESS,
  DOUMPAYDEPOSIT_FAIL,
  DOWITHDRAWAL_BEGIN,
  DOWITHDRAWAL_SUCCESS,
  DOWITHDRAWAL_FAIL,
  DOPRIMEPAYDEPOSIT_BEGIN,
  DOPRIMEPAYDEPOSIT_SUCCESS,
  DOPRIMEPAYDEPOSIT_FAIL,
  DOAPPLEPAYDEPOSIT_BEGIN,
  DOAPPLEPAYDEPOSIT_SUCCESS,
  DOAPPLEPAYDEPOSIT_FAIL,
  GETAUTOTRANSFER_BEGIN,
  GETAUTOTRANSFER_SUCCESS,
  GETAUTOTRANSFER_FAIL,
  UPDATEAUTOTRANSFER_BEGIN,
  UPDATEAUTOTRANSFER_SUCCESS,
  UPDATEAUTOTRANSFER_FAIL,
  DOTHIRDPARTYDEPOSIT_SUCCESS,
  DOTHIRDPARTYDEPOSIT_BEGIN,
  DOTHIRDPARTYDEPOSIT_FAIL,
  DOBANKDEPOSIT_BEGIN,
  DOBANKDEPOSIT_SUCCESS,
  DOBANKDEPOSIT_FAILED,
  DOCRYPTODEPOSIT_BEGIN,
  DOCRYPTODEPOSIT_SUCCESS,
  DOCRYPTODEPOSIT_FAILED,
  DODEPOSIT_BEGIN,
  DODEPOSIT_SUCCESS,
  DODEPOSIT_FAILED,
} from "../constant/actionType";
import { WalletService } from "../services/WalletService";

export const walletAction = {
  getWalletBalance,
  getDepositMethod,
  doUploadDepositProof,
  getWithdrawalChannel,
  doLeePayDeposit,
  doPrimePayDeposit,
  doMaticPayDeposit,
  doApplePayDeposit,
  getBankCardList,
  addBankCard,
  deleteBankCard,
  getBalanceList,
  updateBalanceList,
  cancelDeposit,
  doWithdrawAll,
  doTransfer,
  doWithdrawalFromGame,
  getGameBalance,
  addBilling,
  doWithdraw,
  getAutoTransferStatus,
  updateAutoTransferStatus,
  doUmPayCryptoDeposit,
  doUmPayBankDeposit,
  doFPSDeposit,
  doFPSDepositWithName,
  doThirdPartyDeposit,
  doBankDeposit,
  doHelp2PayDeposit,
  doSkyPayDeposit,
  doBankDeposit2,
  doCryptoDeposit,
  performDeposit,
  doUsdtDeposit,
  performWithdrawFromEveryBrand,
};
function getWalletBalance() {
  return (dispatch) => {
    dispatch({
      type: GETWALLETBALANCE_BEGIN,
      loading: true,
    });
    const result = WalletService.GetWalletBalance()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETWALLETEBALANCE_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: GETWALLETBALANCE_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETWALLETBALANCE_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function getDepositMethod() {
  return (dispatch) => {
    dispatch({
      type: GETDEPOSITCHANNEL_BEGIN,
      loading: true,
    });
    const result = WalletService.GetDepositMethod()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETDEPOSITCHANNEL_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: GETDEPOSITCHANNEL_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETDEPOSITCHANNEL_FAIL,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function doBankDeposit(
  name,
  account,
  amount,
  paymentid,
  promotionid,
  banktype
) {
  return (dispatch) => {
    dispatch({
      type: DOMANUALDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformManualBankDeposit(
      name,
      account,
      amount,
      paymentid,
      promotionid,
      banktype
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOMANUALDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOMANUALDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOMANUALDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function doFPSDeposit(account, amount, paymentid, promotionid, banktype) {
  return (dispatch) => {
    dispatch({
      type: DOMANUALDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformManualFPSDeposit(
      account,
      amount,
      paymentid,
      promotionid,
      banktype
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOMANUALDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOMANUALDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOMANUALDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function doFPSDepositWithName(
  name,
  account,
  amount,
  paymentid,
  promotionid,
  banktype
) {
  return (dispatch) => {
    dispatch({
      type: DOMANUALDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformManualFPSDepositWithName(
      name,
      account,
      amount,
      paymentid,
      promotionid,
      banktype
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOMANUALDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOMANUALDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOMANUALDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function doThirdPartyDeposit(amount, paymentid, promotionid, banktype) {
  return (dispatch) => {
    dispatch({
      type: DOTHIRDPARTYDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformManualThirdPartyDeposit(
      amount,
      paymentid,
      promotionid,
      banktype
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOTHIRDPARTYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOTHIRDPARTYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOTHIRDPARTYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function doUsdtDeposit(amount, paymentid, promotionid, banktype) {
  return (dispatch) => {
    dispatch({
      type: DODEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformUsdtDeposit(
      amount,
      paymentid,
      promotionid,
      banktype
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DODEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DODEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DODEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function doLeePayDeposit(amount, paymentid, promotionid) {
  return (dispatch) => {
    dispatch({
      type: DOLEEPAYDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformLeePayDeposit(
      amount,
      paymentid,
      promotionid
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOLEEPAYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOLEEPAYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOLEEPAYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function doUmPayBankDeposit(amount, paymentid, promotionid) {
  return (dispatch) => {
    dispatch({
      type: DOUMPAYDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformUmPayBankDeposit(
      amount,
      paymentid,
      promotionid
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOUMPAYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOUMPAYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOUMPAYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function doUmPayCryptoDeposit(amount, paymentid, promotionid) {
  return (dispatch) => {
    dispatch({
      type: DOUMPAYDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformUmPayCrytoDeposit(
      amount,
      paymentid,
      promotionid
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOUMPAYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOUMPAYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOUMPAYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function doPrimePayDeposit(amount, paymentid, promotionid) {
  return (dispatch) => {
    dispatch({
      type: DOPRIMEPAYDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformPrimePayDeposit(
      amount,
      paymentid,
      promotionid
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOPRIMEPAYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOPRIMEPAYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOPRIMEPAYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function doMaticPayDeposit(amount, paymentid, promotionid) {
  return (dispatch) => {
    dispatch({
      type: DOBANKDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformMaticPayDeposit(
      amount,
      paymentid,
      promotionid
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOBANKDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOBANKDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOBANKDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function doHelp2PayDeposit(amount, paymentid, promotionid) {
  return (dispatch) => {
    dispatch({
      type: DOBANKDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformHelp2PayDeposit(
      amount,
      paymentid,
      promotionid
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOBANKDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOBANKDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOBANKDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function doSkyPayDeposit(amount, paymentid, promotionid) {
  return (dispatch) => {
    dispatch({
      type: DOBANKDEPOSIT_SUCCESS,
      loading: true,
    });
    const result = WalletService.PerformSkyPayDeposit(
      amount,
      paymentid,
      promotionid
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOBANKDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOBANKDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOBANKDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function doApplePayDeposit(amount, paymentid, promotionid, transname) {
  return (dispatch) => {
    dispatch({
      type: DOAPPLEPAYDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformApplePayDeposit(
      amount,
      paymentid,
      promotionid,
      transname
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOAPPLEPAYDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOAPPLEPAYDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOAPPLEPAYDEPOSIT_FAIL,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function doUploadDepositProof(id, file, payload) {
  return (dispatch) => {
    dispatch({
      type: DOMANUALDEPOSITUPLOAD_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformUploadDepositProof(id, file, payload)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOMANUALDEPOSITUPLOAD_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOMANUALDEPOSITUPLOAD_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOMANUALDEPOSITUPLOAD_FAIL,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function getWithdrawalChannel() {
  return (dispatch) => {
    dispatch({
      type: GETWITHDRAWALCHANNEL_BEGIN,
      loading: true,
    });
    const result = WalletService.GetListOfWithdrawChannel()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETWITHDRAWALCHANNEL_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: GETWITHDRAWALCHANNEL_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: GETWITHDRAWALCHANNEL_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function getBankCardList() {
  return (dispatch) => {
    dispatch({
      type: GETBANKCARDLIST_BEGIN,
      loading: true,
    });
    const result = WalletService.GetBankCardList()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETBANKCARDLIST_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETBANKCARDLIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETBANKCARDLIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function addBankCard(channelid, bankType, address) {
  return (dispatch) => {
    dispatch({
      type: ADDBANKCARD_BEGIN,
      loading: true,
    });
    const result = WalletService.AddBankCard(channelid, bankType, address)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: ADDBANKCARD_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: ADDBANKCARD_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: ADDBANKCARD_FAIL,
          payload: { IsSuccess: false, info: e.status },
          loading: false,
        });
      });

    return result;
  };
}

function deleteBankCard(id) {
  return (dispatch) => {
    dispatch({
      type: DELETEBANKCARD_BEGIN,
      loading: true,
    });
    const result = WalletService.DeleteBankCard(id)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DELETEBANKCARD_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DELETEBANKCARD_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DELETEBANKCARD_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function getBalanceList(loading = true) {
  return (dispatch) => {
    dispatch({
      type: GETBALANCELIST_BEGIN,
      loading: loading,
    });
    const result = WalletService.GetWalletBalance()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETBALANCELIST_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETBALANCELIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETBALANCELIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function updateBalanceList() {
  return (dispatch) => {
    dispatch({
      type: UPDATEBALANCELIST_BEGIN,
      loading: true,
    });
    //TODO: Replace with TGSWalletService when the issue resolved.
    const result = WalletService.GetWalletBalance()
      // const result = WalletService.UpdateWalletDetails()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: UPDATEBALANCELIST_SUCCESS,
            payload: response.data,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: UPDATEBALANCELIST_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: UPDATEBALANCELIST_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function cancelDeposit(id) {
  return (dispatch) => {
    dispatch({
      type: CANCELDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.CancelDeposit(id)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: CANCELDEPOSIT_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: CANCELDEPOSIT_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: CANCELDEPOSIT_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function doWithdrawAll() {
  return (dispatch) => {
    dispatch({
      type: DOWITHDRAWALALL_BEGIN,
      loading: true,
    });
    const result = WalletService.WithdrawAll()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOWITHDRAWALALL_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DOWITHDRAWALALL_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOWITHDRAWALALL_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function doTransfer(gpcode, amount) {
  return (dispatch) => {
    dispatch({
      type: DOTRANSFER_BEGIN,
      loading: true,
    });
    const result = WalletService.Transfer(gpcode, amount)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOTRANSFER_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DOTRANSFER_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOTRANSFER_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}
function doWithdrawalFromGame(gpcode, amount) {
  return (dispatch) => {
    dispatch({
      type: DOTRANSFER_BEGIN,
      loading: true,
    });
    const result = WalletService.WithdrawalFromGame(gpcode, amount)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOTRANSFER_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DOTRANSFER_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOTRANSFER_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}

function performWithdrawFromEveryBrand() {
  return (dispatch) => {
    dispatch({
      type: DOTRANSFER_BEGIN,
      loading: true,
    });
    const result = WalletService.WithdrawEverything()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOTRANSFER_SUCCESS,
            payload: response,
            loading: false,
          });
        } else {
          dispatch({
            type: DOTRANSFER_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOTRANSFER_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}

function getGameBalance(gpcode) {
  return (dispatch) => {
    dispatch({
      type: GETGAMEBALANCE_BEGIN,
      loading: true,
    });
    const result = WalletService.GetGameBalance(gpcode)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETGAMEBALANCE_SUCCESS,
            payload: response,
            gpcode: gpcode,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETGAMEBALANCE_FAIL,
            payload: response,
            gpcode: gpcode,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETGAMEBALANCE_FAIL,
          payload: e.status,
          gpcode: gpcode,
          loading: false,
        });
      });

    return result;
  };
}

function doBankDeposit2(amount, paymentid, promotionid, paymentcode) {
  return (dispatch) => {
    dispatch({
      type: DOBANKDEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformBankDeposit(
      amount,
      paymentid,
      promotionid,
      paymentcode
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOBANKDEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOBANKDEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOBANKDEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
function doCryptoDeposit(amount, paymentid, promotionid, paymentcode) {
  return (dispatch) => {
    dispatch({
      type: DOCRYPTODEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformCryptoDeposit(
      amount,
      paymentid,
      promotionid,
      paymentcode
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOCRYPTODEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DOCRYPTODEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DOCRYPTODEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function performDeposit(amount, paymentid, promotionid, paymentcode, type) {
  return (dispatch) => {
    dispatch({
      type: DODEPOSIT_BEGIN,
      loading: true,
    });
    const result = WalletService.PerformDeposit(
      amount,
      paymentid,
      promotionid,
      paymentcode,
      type
    )
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DODEPOSIT_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: DODEPOSIT_FAILED,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: DODEPOSIT_FAILED,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}

function addBilling(card_id, amount) {
  return (dispatch) => {
    dispatch({
      type: ADDBILLING_BEGIN,
      loading: true,
    });
    const result = WalletService.AddBilling(card_id, amount)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: ADDBILLING_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: ADDBILLING_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: ADDBILLING_FAIL,
          payload: { IsSuccess: false, info: e.status },
          loading: false,
        });
      });

    return result;
  };
}
function doWithdraw(amount, bankinfoid, paypassword) {
  return (dispatch) => {
    dispatch({
      type: DOWITHDRAWAL_BEGIN,
      loading: true,
    });
    const result = WalletService.DoWithdraw(amount, bankinfoid, paypassword)
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: DOWITHDRAWAL_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: DOWITHDRAWAL_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: DOWITHDRAWAL_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}

function getAutoTransferStatus() {
  return (dispatch) => {
    dispatch({
      type: GETAUTOTRANSFER_BEGIN,
      loading: true,
    });
    const result = WalletService.GetAutoTransferStatus()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: GETAUTOTRANSFER_SUCCESS,
            payload: response,
            loading: false,
          });

          // AppHistory.push("/");
        } else {
          dispatch({
            type: GETAUTOTRANSFER_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((e) => {
        dispatch({
          type: GETAUTOTRANSFER_FAIL,
          payload: e.status,
          loading: false,
        });
      });

    return result;
  };
}

function updateAutoTransferStatus() {
  return (dispatch) => {
    dispatch({
      type: UPDATEAUTOTRANSFER_BEGIN,
      loading: true,
    });
    const result = WalletService.UpdateAutoTransferStatus()
      .then((response) => {
        if (response.IsSuccess) {
          dispatch({
            type: UPDATEAUTOTRANSFER_SUCCESS,
            payload: response,
            loading: true,
          });
        } else {
          dispatch({
            type: UPDATEAUTOTRANSFER_FAIL,
            payload: response,
            loading: false,
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({
          type: UPDATEAUTOTRANSFER_FAIL,
          payload: error,
          loading: false,
        });
      });
    return result;
  };
}
