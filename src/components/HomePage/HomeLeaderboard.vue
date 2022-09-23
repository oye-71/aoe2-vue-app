<template>
  <div class="tiles" v-if="leaderboards.length > 0">
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
  <BaseLoader v-else />
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import LeaderboardService from "@/services/leaderboardService";
import { injectDependency } from "@/helpers/dependencyInjectionHelper";
import { Leaderboard, LeaderboardPlayer } from "@/types/interfaces/Leaderboard";
import router from "@/router";

const leaderboardService = injectDependency("leaderboardService", LeaderboardService);

const leaderboards: Ref<Leaderboard[]> = ref([]);

onMounted(async () => {
  const leaderboardRM = await leaderboardService.getTop10RM();
  const leaderboardRMTeam = await leaderboardService.getTop10RMTeam();
  const leaderboardEW = await leaderboardService.getTop10EW();
  const leaderboardEWTeam = await leaderboardService.getTop10EWTeam();
  leaderboards.value.push(leaderboardRM, leaderboardRMTeam, leaderboardEW, leaderboardEWTeam);
});

async function onClickPlayer(player: LeaderboardPlayer) {
  await router.push(`/profile/${player.rlUserId}`);
}
</script>

<style lang="scss">
.player-leader-head {
  width: 100%;
  margin: 10px 0;
  text-align: center;
}
.player-leader {
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
</style>
