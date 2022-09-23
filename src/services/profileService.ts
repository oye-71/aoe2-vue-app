import { injectDependency } from "@/helpers/dependencyInjectionHelper";
import QueryService from "./queryService";

export default class ProfileService {
  private _queryService: QueryService;

  constructor() {
    this._queryService = injectDependency("queryService", QueryService);
  }

  async getPlayer(playerId: number) {
    const player = await this._queryService.getPlayerData({
      gameId: 0,
      gamertag: null,
      matchType: "3",
      playerNumber: 0,
      profileId: playerId.toString(),
    });
    return player;
  }
}
