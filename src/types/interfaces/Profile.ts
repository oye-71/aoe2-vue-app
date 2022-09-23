import { ProfileMatch } from "./Match";
import { ProfilePlayer } from "./Player";

export interface ProfileInfo {
  careerStats: CareerStats;
  mpStatList: MPStatList;
  user: ProfilePlayer;
  mpMatches: MPMatchList;
}

export interface ProfileFullInfo extends ProfileInfo {
  users?: ProfilePlayer[];
}

export interface CareerStats {
  totalGames: number;
}

export interface MPStatList {
  totalMatches: number;
  totalWins: number;
  currentWinStreak: number;
}

export interface MPMatchList {
  totalMatches: number;
  matchList: ProfileMatch[];
}
