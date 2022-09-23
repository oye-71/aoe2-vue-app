import QueryService from "./queryService";
import { Leaderboard } from "@/types/interfaces/Leaderboard";
import { injectDependency } from "@/helpers/dependencyInjectionHelper";

export default class LeaderboardService {
  private _queryService: QueryService;

  constructor() {
    this._queryService = injectDependency("queryService", QueryService);
  }

  async getTop10RM(): Promise<Leaderboard> {
    const leaderboard: Leaderboard = await this._queryService.getLeaderboard({
      count: 10,
      matchType: "3",
      page: 1,
      region: "7",
      searchPlayer: "",
    });
    leaderboard.items = leaderboard.items.slice(0, 10);
    leaderboard.name = "Random Match 1v1";
    return leaderboard;
  }

  async getTop10RMTeam(): Promise<Leaderboard> {
    const leaderboard: Leaderboard = await this._queryService.getLeaderboard({
      count: 10,
      matchType: "4",
      page: 1,
      region: "7",
      searchPlayer: "",
    });
    leaderboard.items = leaderboard.items.slice(0, 10);
    leaderboard.name = "Random Match Team";
    return leaderboard;
  }

  async getTop10EW(): Promise<Leaderboard> {
    const leaderboard: Leaderboard = await this._queryService.getLeaderboard({
      count: 10,
      matchType: "13",
      page: 1,
      region: "7",
      searchPlayer: "",
    });
    leaderboard.items = leaderboard.items.slice(0, 10);
    leaderboard.name = "Empire Wars 1v1";
    return leaderboard;
  }

  async getTop10EWTeam(): Promise<Leaderboard> {
    const leaderboard: Leaderboard = await this._queryService.getLeaderboard({
      count: 10,
      matchType: "14",
      page: 1,
      region: "7",
      searchPlayer: "",
    });
    leaderboard.items = leaderboard.items.slice(0, 10);
    leaderboard.name = "Empire Wars Team";
    return leaderboard;
  }
}
