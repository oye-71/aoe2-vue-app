<template>
  <div>
    <div class="home-title">Leaderboards</div>
    <div class="tiles tiles-2" v-if="leaderboards.length > 0">
      <div class="tile-card" v-for="leaderboard of leaderboards">
        <div v-if="leaderboard">
          <h3 class="player-leader-head">{{ leaderboard.name }}</h3>
          <div class="player-leader" v-for="(leader, index) of leaderboard.items" @click="onClickPlayer(leader)">
            <span>
              <span :class="['top-' + (index + 1), { top: index < 3 }]">{{ index + 1 }}.</span>
              {{ leader.userName }}
            </span>
            <span>{{ leader.elo }}</span>
          </div>
        </div>
      </div>
    </div>
    <BaseLoader class="loader-center" v-else />
  </div>
  <div class="search-tab">
    <div class="home-title">Search</div>
    <div class="input-w-btn">
      <input placeholder="Enter player name..." v-model="searchContent" />
      <button @click="onSearchPlayer">Search</button>
    </div>
    <div class="search-results">
      <div v-if="searchResults">Found {{ searchResults.count }} player{{ searchResults.count > 1 ? "s" : "" }}</div>
      <div class="tiles" v-if="searchResults">
        <div class="tile-card" v-for="item in searchResults.items">
          <div class="player-leader" @click="onClickPlayer(item)">
            <span>
              <span :class="['top-' + item.rank, { top: item.rank < 3 }]">{{ item.rank }}.</span>
              {{ item.userName }}
            </span>
            <span>{{ item.elo }}</span>
          </div>
        </div>
      </div>
      <BaseLoader class="loader-center" v-else-if="isLoadingSearch" />
      <div v-else-if="searchHasBeenDone">No result.</div>
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
import BaseLoader from "../BaseLoader.vue";

const leaderboardService = injectDependency("leaderboardService", LeaderboardService);

const leaderboards: Ref<Leaderboard[]> = ref([]);
const searchContent: Ref<string | undefined> = ref();
const searchResults: Ref<Leaderboard | undefined> = ref();
const isLoadingSearch: Ref<boolean> = ref(false);
const searchHasBeenDone: Ref<boolean> = ref(false);

onMounted(async () => {
  // TODO EDT make these queries synchronous to gain loading time
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
  searchResults.value = undefined;
  if (!searchContent.value) {
    console.error("Error search value empty");
  } else {
    searchHasBeenDone.value = true;
    isLoadingSearch.value = true;
    searchResults.value = await leaderboardService.searchForPlayer(searchContent.value);
  }
  isLoadingSearch.value = false;
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
    background-color: var(--bg-color);
    cursor: pointer;
  }

  .top {
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 5px;
    &.top-1 {
      color: var(--font-color);
      background-color: transparentize(gold, 0.33);
    }
    &.top-2 {
      color: var(--font-color);
      background-color: transparentize(silver, 0.33);
    }
    &.top-3 {
      color: var(--font-color);
      background-color: transparentize(coral, 0.33);
    }
  }
}
.loader-center {
  margin: 10vh 0 !important;
}
.search-tab {
  display: flex;
  flex-direction: column;

  .search-results {
    margin-top: 12px;
    display: flex;
    gap: 12px;
    flex-direction: column;
  }
}
</style>
