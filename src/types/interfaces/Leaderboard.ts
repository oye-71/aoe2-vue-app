import { LeaderboardPlayer } from "@/types/interfaces/Player";

export interface Leaderboard {
  name?: string;
  count: number;
  items: LeaderboardPlayer[];
}
