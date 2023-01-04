import { GameTypeEnum } from "../api-services/utils/Enum";
import config from "../config/config";
import i18n from "./i18n";

import TopMenuLivePNG_PB from "../assets/images/top-menu-live-pb.png";
import TopMenuQipaiPNG_PB from "../assets/images/top-menu-qipai-pb.png";
import TopMenuSportsPNG_PB from "../assets/images/top-menu-sports-pb.png";
import TopMenuLotteryPNG_PB from "../assets/images/top-menu-lottery-pb.png";
import TopMenueSportsPNG_PB from "../assets/images/top-menu-gun-pb.png";
import TopMenuTigerPNG_PB from "../assets/images/top-menu-tiger-pb.png";
import TopMenuFishPNG_PB from "../assets/images/top-menu-fish-pb.png";
import TopMenuSlotPNG_PB from "../assets/images/top-menu-slot-pb.png";

import TopMenuLivePNG from "../assets/images/top-menu-live.png";
import TopMenuQipaiPNG from "../assets/images/top-menu-qipai.png";
import TopMenuSportsPNG from "../assets/images/top-menu-sports.png";
import TopMenuLotteryPNG from "../assets/images/top-menu-lottery.png";
import TopMenueSportsPNG from "../assets/images/top-menu-gun.png";
import TopMenuTigerPNG from "../assets/images/top-menu-tiger.png";
import TopMenuFishPNG from "../assets/images/top-menu-fish.png";
import TopMenuSlotPNG from "../assets/images/top-menu-slot.png";

import TopMenuLiveHoverPNG from "../assets/images/top-menu-live-hover.png";
import TopMenuQipaiHoverPNG from "../assets/images/top-menu-qipai-hover.png";
import TopMenuSportsHoverPNG from "../assets/images/top-menu-sports-hover.png";
import TopMenuLotteryHoverPNG from "../assets/images/top-menu-lottery-hover.png";
import TopMenueSportsHoverPNG from "../assets/images/top-menu-gun-hover.png";
import TopMenuTigerHoverPNG from "../assets/images/top-menu-tiger-hover.png";
import TopMenuFishHoverPNG from "../assets/images/top-menu-fish-hover.png";
import TopMenuSlotHoverPNG from "../assets/images/top-menu-slot-hover.png";

const MenuItemList = [
  {
    path: "live",
    title: "common.live",
    img: TopMenuLivePNG,
    img_PB: TopMenuLivePNG_PB,
    hoverImg: TopMenuLiveHoverPNG,
    gameType: [GameTypeEnum.LIVELOBBY],
    sorting: 1,
    sortingGMO: 1,
    sortingHK28: 1,
    sortingPB: 2,
    sortingSKY: 1,
    sortingWLGHK: 1,
    sortingBUNNY: 1,
  },
  {
    path: "chess",
    title: "common.chess",
    img: TopMenuQipaiPNG,
    img_PB: TopMenuQipaiPNG_PB,
    hoverImg: TopMenuQipaiHoverPNG,
    gameType: [GameTypeEnum.QIPAILOBBY],
    sorting: 2,
    sortingGMO: 2,
    sortingHK28: 3,
    sortingPB: 8,
    sortingSKY: 2,
    sortingWLGHK: 2,
    sortingBUNNY: 2,
  },
  {
    path: "sports",
    title: "common.sport",
    img: TopMenuSportsPNG,
    img_PB: TopMenuSportsPNG_PB,
    hoverImg: TopMenuSportsHoverPNG,
    gameType: [GameTypeEnum.SPORTS, GameTypeEnum.RNGSPORTS],
    sorting: 3,
    sortingGMO: 5,
    sortingHK28: 2,
    sortingPB: 3,
    sortingSKY: 3,
    sortingWLGHK: 3,
    sortingBUNNY: 3,
  },
  {
    path: "esports",
    title: "common.esports",
    img: TopMenueSportsPNG,
    img_PB: TopMenueSportsPNG_PB,
    hoverImg: TopMenueSportsHoverPNG,
    gameType: [GameTypeEnum.ESPORTS],
    sorting: 4,
    sortingGMO: 7,
    sortingHK28: 2,
    sortingPB: 4,
    sortingSKY: 7,
    sortingWLGHK: 4,
    sortingBUNNY: 4,
  },
  {
    path: "lottery",
    title: "common.lottery",
    img: TopMenuLotteryPNG,
    img_PB: TopMenuLotteryPNG_PB,
    hoverImg: TopMenuLotteryHoverPNG,
    gameType: [GameTypeEnum.LOTTERYLOBBY],
    sorting: 5,
    sortingGMO: 6,
    sortingHK28: 7,
    sortingPB: 7,
    sortingSKY: 8,
    sortingWLGHK: 6,
    sortingBUNNY: 5,
  },
  {
    path: `slots`,
    title: "common.slot",
    img: TopMenuTigerPNG,
    img_PB: TopMenuTigerPNG_PB,
    hoverImg: TopMenuTigerHoverPNG,
    gameType: [GameTypeEnum.SLOT],
    sorting: 6,
    sortingGMO: 8,
    sortingHK28: 4,
    sortingPB: 1,
    sortingSKY: 5,
    sortingWLGHK: 7,
    sortingBUNNY: 6,
  },
  {
    path: `electron`,
    title: "common.electron",
    img: TopMenuSlotPNG,
    img_PB: TopMenuSlotPNG_PB,
    hoverImg: TopMenuSlotHoverPNG,
    gameType: [GameTypeEnum.TABLEGAME],
    sorting: 7,
    sortingGMO: 3,
    sortingHK28: 6,
    sortingPB: 5,
    sortingSKY: 6,
    sortingWLGHK: 8,
    sortingBUNNY: 7,
  },
  {
    path: `fish`,
    title: config.features.MenuItem_ShootFish
      ? "common.shootFish"
      : "common.fish",
    img: TopMenuFishPNG,
    img_PB: TopMenuFishPNG_PB,
    hoverImg: TopMenuFishHoverPNG,
    gameType: [GameTypeEnum.FISH],
    sorting: 8,
    sortingGMO: 4,
    sortingHK28: 5,
    sortingPB: 6,
    sortingSKY: 4,
    sortingWLGHK: 5,
    sortingBUNNY: 8,
  },
  {
    path: `cockfight`,
    title: "common.cockfight",
    gameType: [GameTypeEnum.COCKFIGHT],
    sorting: 9,
    sortingGMO: 9,
    sortingHK28: 9,
    sortingPB: 9,
    sortingSKY: 9,
    sortingWLGHK: 9,
    sortingBUNNY: 9,
    include: ["SM01", "AWC_COCKFIGHT"],
  },
];

export const SortedMenuList = MenuItemList.sort((a, b) => {
  if (config.features.MenuItem_Sorting_HK28) {
    return a.sortingHK28 > b.sortingHK28 ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_WLGHK) {
    return a.sortingWLGHK > b.sortingWLGHK ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_SKY) {
    return a.sortingSKY > b.sortingSKY ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_PB) {
    return a.sortingPB > b.sortingPB ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_GMO) {
    return a.sortingGMO > b.sortingGMO ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_PISO) {
    return a.sortingPISO > b.sortingPISO ? 1 : -1;
  } else if (config.features.MenuItem_Sorting_BUNNY) {
    return a.sortingBUNNY > b.sortingBUNNY ? 1 : -1;
  } else {
    return a.sorting > b.sorting ? 1 : -1;
  }
});
