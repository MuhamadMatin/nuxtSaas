<script setup lang="ts">
const colorMode = useColorMode();
const route = useRoute();

const toUrl = computed(() => route.path.startsWith('/dashboard') ? '/dashboard' : '/');
</script>

<template>
  <NuxtLink :to="toUrl" class="flex items-center gap-2">
    <span class="font-bold text-xl flex items-center">
      <!-- <NuxtImg src="/logo.svg" class="w-6 h-6 mr-1"/> -->
      <NuxtImg src="/logo.svg" class="w-6 h-6 mr-1" :class="[colorMode.value === 'light' ? '' : 'invert-100']"/>
      NuxtSaAS
    </span>
  </NuxtLink>
</template>