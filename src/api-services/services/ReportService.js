import { ApiService } from "./ApiService";

export const ReportService = {
  GetTransactionDetails,
  GetWithdrawalDetails,
  GetDepositDetails,
  GetDepositStatus,
  GetWithdrawalStatus,
  GetTransferReport,
  GetRoundsTotal,
};

function GetTransactionDetails(from, to, page, rows, desc, sort, all) {
  const result = ApiService.get(
    `playerreport/rounds?From=${from}&To=${to}&page=${page}&rows=${rows}&desc=${desc}&sort=${sort}&all=${all}`
  );
  return result;
}

function GetRoundsTotal(from, to) {
  const result = ApiService.get(
    `playerreport/rounds/total?From=${from}&To=${to}`
  );
  return result;
}

function GetWithdrawalDetails(
  status,
  from,
  to,
  page,
  rows,
  desc,
  sort,
  all,
  order
) {
  const result = ApiService.get(
    `withdraw/player/list?status=${status}&begincreate=${from}&endcreate=${to}&Page=${page}&Rows=${rows}&IsDesc=${desc}&SortBy=${sort}&ShowAll=${all}&OrderBy=${order}`
  );
  return result;
}

function GetDepositDetails(
  status,
  from,
  to,
  page,
  rows,
  desc,
  sort,
  all,
  order
) {
  const result = ApiService.get(
    `deposit/player/list?status=${status}&begincreate=${from}&endcreate=${to}&Page=${page}&Rows=${rows}&IsDesc=${desc}&SortBy=${sort}&ShowAll=${all}&OrderBy=${order}`
  );
  return result;
}
function GetDepositStatus() {
  const result = ApiService.get(`deposit/status`);
  return result;
}
function GetWithdrawalStatus() {
  const result = ApiService.get(`withdraw/status`);
  return result;
}

function GetTransferReport(from, to, page, rows, order, desc, sort, all) {
  const result = ApiService.get(
    `game/balance/list?beginrecord=${from}&endrecord=${to}&Page=${page}&Rows=${rows}&OrderBy=${order}&IsDesc=${desc}&SortBy=${sort}&ShowAll=${all}`
  );
  return result;
}
