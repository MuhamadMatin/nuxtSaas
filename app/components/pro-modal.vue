<script setup lang="ts">
  import { aiTools } from '~~/constants/tools';

  const { isOpen, toggleModal } = useProModal();
  const { upgradeToPro } = useAuth();
</script>

<template>
  <UModal v-model:open="isOpen" title="Upgrade To Pro">
    <template #body>
      <div class="p-4">
        <div class="text-center flex flex-col space-y-2">
          <NuxtLink v-for="tool in aiTools" :key="tool.path" :to="tool.path">
            <UCard class="" :ui="{ body: 'p-3' }">
              <div class="flex items-center justify-between full-witdh">
                <div class="flex items-center gap-x-4">
                  <UButton :icon="tool.icon" size="md" color="primary" variant="subtle" />
                  <div class="font-semibold">
                    {{ tool.title }}
                  </div>
                </div>
                <Icon name="lucide:check" class="w-5 h-5 text-primary" />
              </div>
            </UCard>
          </NuxtLink>
        </div>
        <UButton icon="lucide:zap" color="error" class="w-full justify-center mt-4" @click="upgradeToPro">
          Upgrade
        </UButton>
      </div>
    </template>
  </UModal>
</template>
