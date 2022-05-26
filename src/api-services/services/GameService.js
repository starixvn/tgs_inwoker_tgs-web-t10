import { ApiService } from "./ApiService";
import config from "../../config/config";
import i18n from "../../utils/i18n";
export const GameService = {
  GetGameList,
  JoinGame,
  JoinLobbyGame,
  GetHomePageGameList,
  GetGamePlatformByType,

  SetFavoriteGame,
  RemoveFavoriteGame,
  GetFavoriteGame,
  JoinBetConstruct,
};

function GetGameList(gpCode, gametypes) {
  const result = ApiService.get(
    `Game/list?gpcode=${gpCode}&platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}&gametypes=${gametypes}`
  );
  return result;
}

function GetHomePageGameList() {
  const result = ApiService.get(
    `GameProvider/list?platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}`
  );
  return result;
}

function JoinLobbyGame(gtype, gpcode) {
  const result = ApiService.post(`Game/lobby/geturl`, {
    gpcode: gpcode,
    gtype: parseInt(gtype),
    language: i18n.language,
    extends: {
      lobbyurl: window.location.protocol + "//" + window.location.hostname,
    },
  });
  return result;
}

function JoinGame(gid, gpcode) {
  const result = ApiService.post(`Game/geturl`, {
    gpcode: gpcode,
    gid: parseInt(gid),
    language: i18n.language,
    extends: {
      lobbyurl: window.location.protocol + "//" + window.location.hostname,
    },
  });
  return result;
}

function GetGamePlatformByType() {
  const result = ApiService.get(
    `GameProvider/list?platformtype=${config.isPC}&language=${i18n.language}&currency=${config.currency}`
  );
  return result;
}

function SetFavoriteGame(gameId) {
  var result = ApiService.put(`game/favorite/${gameId}`);
  return result;
}
function RemoveFavoriteGame(gameId) {
  var result = ApiService.del(`game/favorite/${gameId}`, {});
  return result;
}
function GetFavoriteGame(gameType) {
  const result = ApiService.get(`game/favorite/${gameType}`);
  return result;
}
function JoinBetConstruct() {
  const result = ApiService.get(`game/bc`);
  return result;
}
