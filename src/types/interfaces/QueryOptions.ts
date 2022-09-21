export interface LeaderboardOptions {
  count: number;
  matchType: string; // Todo as enum
  page: number;
  region: string; // Todo as enum
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
  matchType: string; // Todo as enum
  playerNumber: number;
  profileId: string;
}
