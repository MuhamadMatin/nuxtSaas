<script setup lang="ts">
</script>

<template>
  <div>
    <Sidebar />
    <div class="flex flex-col ml-0 sm:ml-72 overflow-hidden duration-300 transition-all h-screen p-2">
      <!-- main content -->
      <Main>
        <slot />
      </Main>
    </div>
    <ProModal />
  </div>
</template>