import { GlobalStatsOptions, LeaderboardOptions, PlayerInfoOptions } from "@/types/interfaces/QueryOptions";
import axios, { AxiosResponse } from "axios";

export default class QueryService {
  private aoeBaseUrl: string;

  constructor() {
    this.aoeBaseUrl = "https://api.ageofempires.com/api/v2/ageii/"; // Todo ajouter cette valeur automatiquuement dans un fichier de config
  }

  private handleResponse(response: AxiosResponse, optionalErrMessage?: string) {
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(optionalErrMessage ?? "Error while processing request");
    }
  }

  async getLeaderboard(options: LeaderboardOptions) {
    const req = await axios.post(this.aoeBaseUrl + "Leaderboard", options);
    return this.handleResponse(req);
  }

  async getPlayerData(options: PlayerInfoOptions) {
    const req = await axios.post(this.aoeBaseUrl + "GetMPFull", options);
    return this.handleResponse(req);
  }
}
