export interface ProfileMatch {
  gameId: string;
  profileId: number;
  userName: string | null;
  avatarUrl: string | null;
  dateTime: Date;
  matchLength: number;
  playerCount: number;
  victoryResultID: number;
  mapType: string;
  civilizationID: number;
  civilization: string;
  winLoss: string;
}
