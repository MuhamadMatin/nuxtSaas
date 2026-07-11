<script setup lang="ts">
  interface HeadingProps{
    title: string;
    description: string;
  }
  defineProps<HeadingProps>()
</script>

<template>
  <div class="mb-8 space-y-1">
    <h2 class="text-2xl font-bold">
      {{ title }}
    </h2>
    <div class="text-muted font-light text-sm md:text-lg">
      {{ description }}
    </div>
  </div>
</template>