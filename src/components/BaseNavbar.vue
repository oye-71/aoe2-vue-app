<template>
  <nav class="nav">
    <div class="nav-container">
      <h3>
        <router-link to="/">Aoe2 Vue App</router-link>
      </h3>
      <ul class="nav-options">
        <li>
          <a @click="theme()">Light/Dark</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
function theme() {
  console.log("Theme");
}
</script>
