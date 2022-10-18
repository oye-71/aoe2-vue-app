<template>
  <div class="profile-base" v-if="info">
    <img class="profile-pic" :src="info?.user?.avatarUrl" />
    <div class="profile-name">{{ info?.user?.userName }}</div>
    <div class="tiles-info tiles tiles-2">
      <div class="tile-card single-line">
        <span>Games (all modes)</span>
        <div class="tile-info-two-lines">
          <div class="tile-info-two-lines-main">{{ info?.mpStatList?.totalMatches }}</div>
          <div class="tile-info-two-lines-sec">Winrate {{ Math.round(winrate * 10) / 10 }} %</div>
        </div>
      </div>
      <div class="tile-card single-line">
        <span>Streak</span>
        <div class="chips-streak">
          <div
            :class="['chip-streak', 'chip-streak-' + match.winLoss.toLowerCase()]"
            v-for="match of info?.mpMatches.matchList.slice(0, 5)">
            {{ match.winLoss.slice(0, 1) }}
          </div>
        </div>
      </div>
    </div>
    <div class="tiles-ratings tiles tiles-4">
      <div class="tile-card single-line" v-for="mt of MatchType">
        <span>{{ MatchTypeFormat.get(mt)?.simpleLabel }}</span>
        <div class="tile-info-two-lines" v-if="info?.users">
          <div class="tile-info-two-lines-main">{{ info.users[mt]?.elo ?? "-" }}</div>
          <div class="tile-info-two-lines-sec" v-if="canDisplayWinRate(mt)">
            Top {{ info.users[mt]?.playerStanding }} %
          </div>
          <div class="tile-info-two-lines-sec" v-else-if="info.users[mt]?.elo">Not ranked</div>
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
import { MatchType, MatchTypeFormat } from "@/types/enums/MatchType";

const props = defineProps({
  profileId: {
    type: String,
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
    "pic ratings ratings" 1fr / 160px 1fr 2fr;
  .profile-pic {
    width: 160px;
    height: 160px;
    border-radius: 10px;
    grid-area: pic;
    box-shadow: var(--base-shadow);
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

.chips-streak {
  display: flex;
  gap: 6px;
  .chip-streak {
    border-radius: 6px;
    padding: 5px;
    width: 26px;
    text-align: center;
    color: white;
    &.chip-streak-win {
      background-color: var(--bg-green);
    }
    &.chip-streak-loss {
      background-color: var(--bg-dark-red);
    }
  }
}
</style>
