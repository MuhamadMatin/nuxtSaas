<script setup lang="ts">
  import { sidebarRoutes } from '~~/constants/tools'
  const open = ref(false);
</script>

<template>
  <nav class="fixed h-16 top-0 right-0 left-0 sm:left-64 border-b border-gray-300 dark:border-gray-800 backdrop-blur-md bg-white/70 dark:bg-gray-900/70">
    <u-container class="flex h-full items-center justify-between sm:justify-end">
      <!-- <slot /> -->
      <UDrawer v-model="open" direction="left" :handle="false" :ui="{ header: 'flex items-center justify-between h-16 px-5', container:'p-0 w-72 gap-0' }">
        <UButton color="neutral" variant="subtle" trailing-icon="i-lucide-menu" class="sm:hidden" />
        
        <template #header>
          <Logo />
          <UButton color="neutral" variant="ghost" trailing-icon="lucide:chevron-first" @open="open = false" />
        </template>
        <template #body>
          <div class="flex flex-col">
            <div class="flex-1 overflow-y-auto">
              <u-separator />
              <div class="px-3 py-4">
                <UNavigationMenu :items="sidebarRoutes" orientation="vertical" class="data-[orientation=vertical]:w-full" :ui="{label: 'py-2.5', link: 'py-3'}" />
              </div>
            </div>
          </div>
        </template>
      </UDrawer>
      <ThemeToggle />
    </u-container>
  </nav>
</template>