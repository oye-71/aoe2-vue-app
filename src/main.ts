import { createApp, provide } from "vue";
import App from "./App.vue";
import router from "./router";
import LeaderboardService from "./services/leaderboardService";
import QueryService from "./services/queryService";

const queryService = new QueryService();
const leaderboardService = new LeaderboardService();

provide("queryService", queryService);
provide("leaderboardService", leaderboardService);

createApp(App).use(router).mount("#app");
