<template>
  <ProfileBaseDescription :profile-id="props.profileId" />
</template>

<script setup lang="ts">
import ProfileBaseDescription from "@/components/ProfilePage/ProfileBaseDescription.vue";
const props = defineProps({
  profileId: {
    type: Number,
    required: true,
  },
});
</script>
