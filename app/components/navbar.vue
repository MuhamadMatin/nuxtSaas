<script setup lang="ts">

</script>

<template>
  <nav class="fixed h-16 left-0 right-0 top-0 z-50 bg-white dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
    <UContainer class="flex h-full items-center justify-between">
      <Logo />
      <slot name="center" />
      <slot name="right" />
    </UContainer>
  </nav>
</template>
