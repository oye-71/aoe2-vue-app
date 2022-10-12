import { MatchType } from "../enums/MatchType";

export interface LeaderboardOptions {
  count?: number;
  matchType?: MatchType;
  page?: number;
  region?: string; // Todo as enum
  searchPlayer: string;
}

export interface GlobalStatsOptions {
  gameMode: string; // Todo as enum
  isRanked: boolean;
  mapSize: string; // Todo as enum
  matchSize: string; // Todo as enum
}

export interface PlayerInfoOptions {
  gameId: number;
  gamertag: string | null;
  matchType: MatchType;
  playerNumber: number;
  profileId: string;
}

export interface MatchListOptions {
  profileId: string;
  page: number;
  recordCount: number;
  matchType: MatchType;
}
