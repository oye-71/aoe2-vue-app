<template>
  <div>
    <div class="home-title">Leaderboards</div>
    <div class="tiles tiles-2" v-if="leaderboards.length > 0">
      <div class="tile-card" v-for="leaderboard of leaderboards">
        <div v-if="leaderboard">
          <h3 class="player-leader-head">{{ leaderboard.name }}</h3>
          <div class="player-leader" v-for="(leader, index) of leaderboard.items" @click="onClickPlayer(leader)">
            <span>{{ index + 1 }}. {{ leader.userName }}</span>
            <span>{{ leader.elo }}</span>
          </div>
        </div>
      </div>
    </div>
    <BaseLoader class="loader-center" v-else />
  </div>
  <div>
    <div class="home-title">Search</div>
    <input placeholder="Enter player name..." v-model="searchContent" />
    <button @click="onSearchPlayer">Search</button>
    <div v-if="searchResults">
      {{ JSON.stringify(searchResults.items) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import LeaderboardService from "@/services/leaderboardService";
import { injectDependency } from "@/helpers/dependencyInjectionHelper";
import { Leaderboard } from "@/types/interfaces/Leaderboard";
import router from "@/router";
import { MatchType } from "@/types/enums/MatchType";
import { LeaderboardPlayer } from "@/types/interfaces/Player";

const leaderboardService = injectDependency("leaderboardService", LeaderboardService);

const leaderboards: Ref<Leaderboard[]> = ref([]);
const searchContent: Ref<string | undefined> = ref();
const searchResults: Ref<Leaderboard | undefined> = ref();

onMounted(async () => {
  const leaderboardRM = await leaderboardService.getTop(5, MatchType.RandomMap1v1);
  const leaderboardRMTeam = await leaderboardService.getTop(5, MatchType.RandomMapTeam);
  const leaderboardEW = await leaderboardService.getTop(5, MatchType.EmpireWars1v1);
  const leaderboardEWTeam = await leaderboardService.getTop(5, MatchType.EmpireWarsTeam);
  leaderboards.value.push(leaderboardRM, leaderboardRMTeam, leaderboardEW, leaderboardEWTeam);
});

async function onClickPlayer(player: LeaderboardPlayer) {
  await router.push(`/profile/${player.rlUserId}`);
}

async function onSearchPlayer() {
  if (!searchContent.value) {
    console.error("Error search value empty");
  } else {
    searchResults.value = await leaderboardService.searchForPlayer(searchContent.value);
  }
}
</script>

<style lang="scss">
.home {
  display: grid;
  gap: 30px;
  grid-template-columns: calc(70% - 15px) calc(30% - 15px);
}

.player-leader-head {
  width: 100%;
  margin: 10px 0;
  text-align: center;
}
.player-leader {
  margin: 1px 0;
  padding: 4px 6px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: $bg-color;
    cursor: pointer;
  }
}
.loader-center {
  margin: 15vh 0 !important;
}
</style>
