<script setup lang="ts">
  import { sidebarRoutes } from '~~/constants/tools'
</script>

<template>
  <aside class="fixed top-0 left-0 transition-all duration-300 hidden sm:block w-72">
    <div class="flex flex-col border-r border-gray-300 dark:border-gray-800 min-h-screen">
      <div class="h-16 px-5 flex items-center">
        <Logo />
      </div>
      <div class="flex-1 overflow-y-auto">
        <u-separator />
        <div class="px-3 py-4">
          <UNavigationMenu :items="sidebarRoutes" orientation="vertical" class="data-[orientation=vertical]:w-full" :ui="{label: 'py-2.5', link: 'py-3'}" />
        </div>
      </div>
      <UserGenerateCounter />
    </div>
  </aside>
</template>