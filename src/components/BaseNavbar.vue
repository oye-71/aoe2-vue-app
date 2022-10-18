<template>
  <nav class="nav">
    <div class="nav-container dark:nav-container-dark">
      <h3>
        <router-link to="/">Aoe2 Vue App</router-link>
      </h3>
      <ul class="nav-options">
        <li>
          <a @click="toggleDark()">{{ isDark ? "🌙" : "☀️" }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
  initialValue: "auto",
});
const toggleDark = useToggle(isDark);
</script>
