<script setup lang="ts">

</script>

<template>
  <div>
    <navbar>
      <template #right>
        <ThemeToggle />
      </template>
    </navbar>
    <div class="min-h-screen flex flex-col items-center relative">
      <div class="flex flex-1 pt-16 w-full sm:w-auto">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>