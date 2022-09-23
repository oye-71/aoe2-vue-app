import QueryService from "./queryService";
import { Leaderboard } from "@/types/interfaces/Leaderboard";
import { injectDependency } from "@/helpers/dependencyInjectionHelper";
import { MatchType, MatchTypeFormat } from "@/types/enums/MatchType";

export default class LeaderboardService {
  private _queryService: QueryService;

  constructor() {
    this._queryService = injectDependency("queryService", QueryService);
  }

  async getTop(count = 10, mt: MatchType = MatchType.RandomMap1v1): Promise<Leaderboard> {
    const leaderboard: Leaderboard = await this._queryService.getLeaderboard({
      count: count,
      matchType: mt,
      page: 1,
      region: "7",
      searchPlayer: "",
    });
    leaderboard.items = leaderboard.items.slice(0, count);
    leaderboard.name = MatchTypeFormat.get(mt);
    return leaderboard;
  }
}
