import { provide, inject } from "vue";
import LeaderboardService from "@/services/leaderboardService";
import QueryService from "@/services/queryService";
import ProfileService from "@/services/profileService";

/**
 * Provides all the dependencies needed for the vue app to run
 */
export function provideDependencies(): void {
  const queryService = new QueryService();
  const leaderboardService = new LeaderboardService();
  const profileService = new ProfileService();

  provide("queryService", queryService);
  provide("leaderboardService", leaderboardService);
  provide("leaderboardService", profileService);
}

/**
 * Returns provided dependency, if non existent instanciates new.
 * @param depName Name of the provided dependency
 * @param depType Type of the provided dependency
 */
export function injectDependency<T>(depName: string, depType: new () => T): T {
  return inject(depName, new depType());
}
