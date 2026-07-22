<script setup lang="ts">
  import type { DropdownMenuItem } from '@nuxt/ui'
  import { sidebarRoutes } from '~~/constants/tools'

  const open = ref(false);
  const { logout } = useAuth();
  const route = useRoute();

  watch(() => route.fullPath, () => {
    open.value = false
  })

  const profileItems = ref<DropdownMenuItem[][]>([
    [
      {
        label: 'Profile',
        icon: 'i-lucide-user',
      },
      {
        label: 'Billing',
        icon: 'i-lucide-credit-card',
        to: "/dashboard/settings"
      },
      {
        label: 'Setting',
        icon: 'i-lucide-settings',
      },
      {
        label: 'Logout',
        icon: 'i-lucide-log-out',
        color: 'error',
        onSelect: async () => {
          await logout({
            redirectTo: "/auth/login"
          })
        }
      }
    ]
  ])
</script>

<template>
  <div class="sm:hidden fixed top-0 left-0 right-0 h-16 z-40 flex items-center justify-between px-4 border-b border-gray-300 dark:border-gray-800 backdrop-blur-md bg-white/70 dark:bg-gray-900/70">
    <Logo />
    <div class="flex items-center gap-2">
      <ThemeToggle />
      <UDrawer v-model="open" direction="left" :handle="false" :ui="{ header: 'flex items-center justify-between h-16 px-5', container: 'p-0 w-72 gap-0' }">
        <UButton icon="i-lucide-menu" color="neutral" variant="subtle" />

        <template #header>
          <Logo />
          <UButton color="neutral" variant="ghost" icon="i-lucide-x" @click="open = false" />
        </template>

        <template #body>
          <div class="flex flex-col h-full">
            <div class="flex-1 overflow-y-auto">
              <u-separator />
              <div class="px-3 py-4">
                <UNavigationMenu :items="sidebarRoutes" orientation="vertical" class="data-[orientation=vertical]:w-full" :ui="{label: 'py-2.5', link: 'py-3'}" />
              </div>
            </div>
            <UserGenerateCounter />
            <u-separator />
            <div class="p-3">
              <UDropdownMenu :items="profileItems" :ui="{content: 'w-64'}">
                <UButton
                  label="Account"
                  icon="i-lucide-user"
                  color="neutral"
                  variant="ghost"
                  trailing-icon="i-lucide-chevrons-up-down"
                  class="w-full justify-start"
                />
              </UDropdownMenu>
            </div>
          </div>
        </template>
      </UDrawer>
    </div>
  </div>

  <!-- Sidebar desktop -->
  <aside class="fixed top-0 left-0 hidden sm:flex sm:flex-col w-72 h-screen border-r border-gray-300 dark:border-gray-800">
    <div class="h-16 px-5 flex items-center justify-between">
      <Logo />
      <ThemeToggle />
    </div>
    <u-separator />
    <div class="flex-1 overflow-y-auto px-3 py-4">
      <UNavigationMenu :items="sidebarRoutes" orientation="vertical" class="data-[orientation=vertical]:w-full" :ui="{label: 'py-2.5', link: 'py-3'}" />
    </div>
    <UserGenerateCounter />
    <u-separator />
    <div class="p-3">
      <UDropdownMenu :items="profileItems" :ui="{content: 'w-64'}">
        <UButton
          label="Account"
          icon="i-lucide-user"
          color="neutral"
          variant="ghost"
          trailing-icon="i-lucide-chevrons-up-down"
          class="w-full justify-start"
        />
      </UDropdownMenu>
    </div>
  </aside>
</template>