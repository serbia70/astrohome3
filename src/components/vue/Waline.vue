<template>
  <div ref="waline" id="waline"></div>
</template>

<script setup lang="ts">
import { init } from "@waline/client";
import "@waline/client/dist/waline.css";
import { ref, onMounted, defineProps } from "vue";

interface Props {
  title: string;
}

const waline = ref(null);
const props = defineProps<Props>();

onMounted(() => {
  init({
    el: waline.value,
    serverURL: "https://waline.163168.xyz/",
    path: props.title, //区分评论路径
    dark: true,
  });
});
</script>

<style scoped>
#waline {
  width: 100%;
  max-width: 100ch;
}
</style>