import { injectDependency } from "@/helpers/dependencyInjectionHelper";
import { keyToEnum } from "@/helpers/enumHelper";
import { MatchType } from "@/types/enums/MatchType";
import { ProfileFullInfo, ProfileInfo } from "@/types/interfaces/Profile";
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

  async getPlayerDetails(playerId: number): Promise<ProfileFullInfo> {
    let fullplayer: ProfileFullInfo | undefined;
    for (const enumValue in MatchType) {
      const player = await this.getPlayerForMatchType(playerId, keyToEnum(enumValue, MatchType));

      // Merge players profile for all four game modes
      if (!fullplayer) {
        fullplayer = player;
        fullplayer.users = {};
        fullplayer.users[keyToEnum<MatchType, typeof MatchType>(enumValue, MatchType)] = player.user;
      } else if (fullplayer.users) {
        fullplayer.users[keyToEnum<MatchType, typeof MatchType>(enumValue, MatchType)] = player.user;
        fullplayer.mpStatList.totalMatches += player?.mpStatList?.totalMatches ?? 0;
        fullplayer.mpStatList.totalWins += player?.mpStatList.totalWins ?? 0;
        fullplayer.mpMatches.matchList.push(...player?.mpMatches.matchList);
      }

      // Sort matches by date descending
      fullplayer.mpMatches.matchList = fullplayer.mpMatches.matchList.sort((mA, mB) => {
        return new Date(mB.dateTime).getDate() - new Date(mA.dateTime).getDate();
      });
    }
    return fullplayer ?? ({} as ProfileFullInfo);
  }
}
