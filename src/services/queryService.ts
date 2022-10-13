import { MatchListOptions, LeaderboardOptions, PlayerInfoOptions } from "@/types/interfaces/QueryOptions";
import axios, { AxiosResponse } from "axios";

export default class QueryService {
  private aoeBaseUrl: string;
  private steamBaseUrl: string;
  private steamApiKey: string;

  constructor() {
    this.aoeBaseUrl = "https://api.ageofempires.com/api/v2/ageii/"; // Todo ajouter cette valeur dans un fichier de config
    this.steamBaseUrl = "http://api.steampowered.com/"; // Todo ajouter cette valeur dans un fichier de config
    this.steamApiKey = "D87A62DFE6A77951C0F15563B4381500"; // Todo ajouter cette valeur dans un fichier de config
  }

  private handleResponse(response: AxiosResponse, optionalErrMessage?: string) {
    if (response.status === 200) {
      return response.data;
    } else {
      // Todo ajouter une remontée des erreurs
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

  async getLatestMatchesData(options: MatchListOptions) {
    const req = await axios.post(this.aoeBaseUrl + "GetMPMatchList", options);
    return this.handleResponse(req);
  }

  // TODO
  async getPlayerSteamDetails(options: any) {
    const req = await axios.get(
      this.steamBaseUrl + "/ISteamUser/Get",
      Object.assign(options, { apiKey: this.steamApiKey })
    );
    return this.handleResponse(req);
  }
}
