export interface LeaderboardPlayer {
  avatarUrl: string;
  elo: number;
  eloRating: number;
  gameId: string;
  losses: number;
  playerNumber: number | null;
  rank: number;
  rankIcon: string | null;
  rankLevel: string | null;
  region: string;
  rlUserId: number;
  userId: number | null;
  userName: string;
  winPercent: number;
  winStreak: number;
  wins: number;
}

export interface Leaderboard {
  name?: string;
  count: number;
  items: LeaderboardPlayer[];
}
