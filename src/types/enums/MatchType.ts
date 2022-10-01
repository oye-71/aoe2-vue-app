export enum MatchType {
  RandomMap1v1 = "3",
  RandomMapTeam = "4",
  EmpireWars1v1 = "13",
  EmpireWarsTeam = "14",
}

export const MatchTypeFormat = new Map<string, { simpleLabel: string; detailedLabel: string }>([
  [MatchType.EmpireWars1v1, { simpleLabel: "EW 1v1", detailedLabel: "Empire Wars 1v1" }],
  [MatchType.EmpireWarsTeam, { simpleLabel: "EW Team", detailedLabel: "Empire Wars Team" }],
  [MatchType.RandomMap1v1, { simpleLabel: "RM 1v1", detailedLabel: "Random Map 1v1" }],
  [MatchType.RandomMapTeam, { simpleLabel: "RM Team", detailedLabel: "Random Map Team" }],
]);
