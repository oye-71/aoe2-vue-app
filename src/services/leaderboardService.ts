import QueryService from "./queryService";
import { inject } from "vue";

export default class LeaderboardService {
  private _queryService: QueryService;

  constructor() {
    this._queryService = inject("queryService", new QueryService());
  }

  async getTop100RM() {
    return await this._queryService.getLeaderboard({
      count: 100,
      matchType: "3",
      page: 1,
      region: "7",
      searchPlayer: "",
    });
  }
}
