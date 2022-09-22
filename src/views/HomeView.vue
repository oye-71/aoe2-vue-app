<template>
  <div class="home">
    <div>Fetch aoe returned :</div>
    <div v-if="leaderboard">
      <div v-for="leader of leaderboard.items">{{ leader.userName }} - {{ leader.elo }} elo</div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from "vue";
import LeaderboardService from "@/services/leaderboardService";
const aoeService: LeaderboardService = inject("leaderboardService", new LeaderboardService());

const leaderboard = ref();

onMounted(async () => {
  leaderboard.value = await aoeService.getTop100RM();
});
</script>
