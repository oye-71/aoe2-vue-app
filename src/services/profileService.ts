import { injectDependency } from "@/helpers/dependencyInjectionHelper";
import { keyToEnum } from "@/helpers/enumHelper";
import { MatchType } from "@/types/enums/MatchType";
import { MPMatchList, ProfileFullInfo, ProfileInfo } from "@/types/interfaces/Profile";
import QueryService from "./queryService";

export default class ProfileService {
  private _queryService: QueryService;

  constructor() {
    this._queryService = injectDependency("queryService", QueryService);
  }

  async getPlayerForMatchType(playerId: number, mt: MatchType = MatchType.RandomMap1v1): Promise<ProfileInfo> {
    const player = await this._queryService.getPlayerData({
      gameId: 0,
      gamertag: null,
      matchType: mt,
      playerNumber: 0,
      profileId: playerId.toString(),
    });
    return player;
  }

  async getPlayerMatchesForMatchType(
    playerId: number,
    mt: MatchType = MatchType.RandomMap1v1,
    page = 1,
    matchCount = 10
  ): Promise<MPMatchList> {
    const player = await this._queryService.getLatestMatchesData({
      matchType: mt,
      profileId: playerId.toString(),
      page: page,
      recordCount: matchCount,
    });
    return player;
  }

  async getPlayerDetails(playerId: number | string): Promise<ProfileFullInfo> {
    let fullplayer: ProfileFullInfo | undefined;
    if (typeof playerId == "string") {
      playerId = parseInt(playerId);
    }
    for (const enumValue in MatchType) {
      // TODO EDT make these queries synchronous to gain loading time
      const player = await this.getPlayerForMatchType(playerId, keyToEnum(enumValue, MatchType));
      const pMatches = await this.getPlayerMatchesForMatchType(playerId, keyToEnum(enumValue, MatchType));

      // Merge players profile for all four game modes
      if (!fullplayer) {
        fullplayer = player;
        fullplayer.users = {};
        fullplayer.users[keyToEnum<MatchType, typeof MatchType>(enumValue, MatchType)] = player.user;
      } else if (fullplayer.users) {
        fullplayer.users[keyToEnum<MatchType, typeof MatchType>(enumValue, MatchType)] = player.user;
        fullplayer.mpStatList.totalMatches += player?.mpStatList?.totalMatches ?? 0;
        fullplayer.mpStatList.totalWins += player?.mpStatList.totalWins ?? 0;
      }
      fullplayer.mpMatches.matchList.push(...pMatches?.matchList);
    }

    if (fullplayer) {
      // Sort matches by date descending
      fullplayer.mpMatches.matchList = fullplayer.mpMatches.matchList.sort((mA, mB) => {
        return new Date(mB.dateTime).getDate() - new Date(mA.dateTime).getDate();
      });
    }

    return fullplayer ?? ({} as ProfileFullInfo);
  }
}
