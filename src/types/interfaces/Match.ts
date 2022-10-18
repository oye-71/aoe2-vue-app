import { CivType } from "../enums/CivType";

export interface ProfileMatch {
  gameId: string;
  profileId: number;
  userName: string | null;
  avatarUrl: string | null;
  dateTime: string;
  matchLength: number;
  playerCount: number;
  victoryResultID: number;
  mapType: string;
  civilizationID: CivType;
  civilization: string;
  winLoss: string;
}
