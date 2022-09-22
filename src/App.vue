<template>
  <BaseNavbar></BaseNavbar>
  <router-view />
  <BaseFooter></BaseFooter>
</template>

<script setup lang="ts">
import BaseNavbar from "./components/BaseNavbar.vue";
import BaseFooter from "./components/BaseFooter.vue";
</script>

<style lang="scss" src="@/assets/style/main.scss"></style>
