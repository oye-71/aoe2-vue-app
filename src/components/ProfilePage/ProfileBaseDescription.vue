<template>
  <div class="profile-base" v-if="info">
    <img class="profile-pic" :src="info?.user?.avatarUrl" />
    <div class="profile-name">{{ info?.user?.userName }}</div>
    <div class="tiles-info tiles tiles-2">
      <div class="tile-card single-line">
        <span>Games (all modes)</span>
        <div>{{ info?.mpStatList?.totalMatches }}</div>
      </div>
      <div class="tile-card single-line">
        <span>Winrate</span>
        <div>{{ Math.round(winrate * 100) / 100 }} %</div>
      </div>
    </div>
    <div class="tiles-ratings tiles tiles-4">
      <div class="tile-card single-line">
        <span>RM 1v1</span>
        <div class="tile-info-two-lines" v-if="info?.users">
          <div class="tile-info-two-lines-main">{{ info.users[MatchType.RandomMap1v1]?.elo ?? "-" }}</div>
          <div class="tile-info-two-lines-sec" v-if="canDisplayWinRate(MatchType.RandomMap1v1)">
            Top {{ info.users[MatchType.RandomMap1v1]?.playerStanding }} %
          </div>
          <div class="tile-info-two-lines-sec" v-else-if="info.users[MatchType.RandomMap1v1]?.elo">Not ranked</div>
        </div>
      </div>
      <div class="tile-card single-line">
        <span>RM Team</span>
        <div class="tile-info-two-lines" v-if="info?.users">
          <div class="tile-info-two-lines-main">{{ info.users[MatchType.RandomMapTeam]?.elo ?? "-" }}</div>
          <div class="tile-info-two-lines-sec" v-if="canDisplayWinRate(MatchType.RandomMapTeam)">
            Top {{ info.users[MatchType.RandomMapTeam]?.playerStanding }} %
          </div>
          <div class="tile-info-two-lines-sec" v-else-if="info.users[MatchType.RandomMapTeam]?.elo">Not ranked</div>
        </div>
      </div>
      <div class="tile-card single-line">
        <span>EW 1v1</span>
        <div class="tile-info-two-lines" v-if="info?.users">
          <div class="tile-info-two-lines-main">{{ info.users[MatchType.EmpireWars1v1]?.elo ?? "-" }}</div>
          <div class="tile-info-two-lines-sec" v-if="canDisplayWinRate(MatchType.EmpireWars1v1)">
            Top {{ info.users[MatchType.EmpireWars1v1]?.playerStanding }} %
          </div>
          <div class="tile-info-two-lines-sec" v-else-if="info.users[MatchType.EmpireWars1v1]?.elo">Not ranked</div>
        </div>
      </div>
      <div class="tile-card single-line">
        <span>EW Team</span>
        <div class="tile-info-two-lines" v-if="info?.users">
          <div class="tile-info-two-lines-main">{{ info.users[MatchType.EmpireWarsTeam]?.elo ?? "-" }}</div>
          <div class="tile-info-two-lines-sec" v-if="canDisplayWinRate(MatchType.EmpireWarsTeam)">
            Top {{ info.users[MatchType.EmpireWarsTeam]?.playerStanding }} %
          </div>
          <div class="tile-info-two-lines-sec" v-else-if="info.users[MatchType.EmpireWarsTeam]?.elo">Not ranked</div>
        </div>
      </div>
    </div>
  </div>
  <BaseLoader v-else />
</template>

<script setup lang="ts">
import { injectDependency } from "@/helpers/dependencyInjectionHelper";
import ProfileService from "@/services/profileService";
import { onMounted, Ref, ref, computed } from "vue";
import { ProfileFullInfo } from "@/types/interfaces/Profile";
import BaseLoader from "@/components/BaseLoader.vue";
import { MatchType } from "@/types/enums/MatchType";

const props = defineProps({
  profileId: {
    type: Number,
    required: true,
  },
});

const profileService = injectDependency("profileService", ProfileService);

const info: Ref<ProfileFullInfo | null> = ref(null);

const winrate = computed(() => {
  if (info.value && info.value.mpStatList.totalMatches > 0) {
    return (info.value.mpStatList.totalWins / info.value.mpStatList.totalMatches) * 100;
  } else {
    return 0;
  }
});

onMounted(async () => {
  info.value = await profileService.getPlayerDetails(props.profileId);
  console.log(info.value);
});

function canDisplayWinRate(mt: MatchType): boolean {
  if (info?.value?.users) {
    return !!info.value.users[mt]?.elo && !!info.value.users[mt]?.playerStanding;
  } else return false;
}
</script>

<style lang="scss">
.profile-base {
  margin-top: 10px;
  display: grid;
  grid-gap: 20px;
  grid-template:
    "pic name info" 1fr
    "pic ratings ratings" 1fr / 160px 1fr 1fr;
  .profile-pic {
    width: 160px;
    height: 160px;
    border-radius: 10px;
    grid-area: pic;
    box-shadow: $base-shadow;
  }
  .tiles-info {
    grid-area: info;
  }
  .tiles-ratings {
    grid-area: ratings;
  }
  .profile-name {
    display: flex;
    padding: 5px;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
