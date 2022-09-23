<template>
  <div>{{ info }}</div>
</template>

<script setup lang="ts">
import { injectDependency } from "@/helpers/dependencyInjectionHelper";
import ProfileService from "@/services/profileService";
import { onMounted, ref } from "vue";

const props = defineProps({
  profileId: {
    type: Number,
    required: true,
  },
});

const profileService = injectDependency("profileService", ProfileService);

const info = ref();

onMounted(async () => {
  info.value = await profileService.getPlayer(props.profileId);
});
</script>
