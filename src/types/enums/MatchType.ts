export enum MatchType {
  RandomMap1v1 = "3",
  RandomMapTeam = "4",
  EmpireWars1v1 = "13",
  EmpireWarsTeam = "14",
}

export const MatchTypeFormat = new Map<string, string>([
  [MatchType.EmpireWars1v1, "Empire Wars 1v1"],
  [MatchType.EmpireWarsTeam, "Empire Wars Team"],
  [MatchType.RandomMap1v1, "Random Map 1v1"],
  [MatchType.RandomMapTeam, "Random Map Team"],
]);
