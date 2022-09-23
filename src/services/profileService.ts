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
      if (!fullplayer) {
        fullplayer = player;
        fullplayer.users = [player.user];
      } else {
        fullplayer.users?.push(player.user);
      }
    }
    return fullplayer ?? ({} as ProfileFullInfo);
  }
}
