<script setup lang="ts">
  import ProModal from '~/components/pro-modal.vue';
  import Sidebar from '~/components/sidebar.vue';
</script>

<template>
  <div>
    <Sidebar />
    <div class="flex flex-col ml-0 sm:ml-72 overflow-hidden duration-300 transition-all h-screen p-2">
      <!-- navbar -->
      <Navbar />
      <!-- main content -->
      <Main>
        <slot />
      </Main>
    </div>
  </div>
  <ProModal />
</template>