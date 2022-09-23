export interface AoePlayer {
  userName: string;
  elo: number;
  avatarUrl: string;
}

export interface ProfilePlayer extends AoePlayer {
  userId: string;
  profileId: number;
  playerStanding: number;
  isHuman: boolean;
  team: number;
  civName: string | null;
  winLoss: string | null;
  matchReplayAvailable: boolean;
}

export interface LeaderboardPlayer extends AoePlayer {
  eloRating: number;
  gameId: string;
  losses: number;
  playerNumber: number | null;
  rank: number;
  rankIcon: string | null;
  rankLevel: string | null;
  region: string;
  rlUserId: number;
  userId: string | null;
  winPercent: number;
  winStreak: number;
  wins: number;
}
