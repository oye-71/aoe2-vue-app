<template>
  <div class="loader">
    <div>{{ props.message }}</div>
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: false,
    default: "Loading",
  },
});
</script>

<style lang="scss">
.loader {
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 20px;
}
.lds-ellipsis div {
  position: absolute;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
  background: var(--bg-dark-red);
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
  background: var(--bg-light-red);
}
.lds-ellipsis div:nth-child(3) {
  left: 24px;
  animation: lds-ellipsis2 0.6s infinite;
  background: var(--bg-dark-orange);
}
.lds-ellipsis div:nth-child(4) {
  left: 40px;
  animation: lds-ellipsis3 0.6s infinite;
  background: var(--bg-light-orange);
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(16px, 0);
  }
}
</style>
