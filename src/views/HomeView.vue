<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div>Fetch aoe returned :</div>
    <div v-if="leaderboard">
      <div v-for="leader of leaderboard.items">{{ leader.userName }} - {{ leader.elo }} elo</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";
import { inject, onMounted, ref } from "vue";
import LeaderboardService from "@/services/leaderboardService";

const aoeService: LeaderboardService = inject("leaderboardService", new LeaderboardService());

const leaderboard = ref();

onMounted(async () => {
  leaderboard.value = await aoeService.getTop100RM();
});
</script>
