<script setup lang="ts">
import { MAX_FREE_GENERATE } from '~/utils/utils/user-limit';

const { data: userData, status } = await useFetch('/api/user', {
  key: "userData"
});

const progress = computed(() => {
  if (userData.value) {
    return (userData.value.userLimiCount / MAX_FREE_GENERATE) * 100;
  }  
  return 0
})
</script>

<template>
  <div v-if="status != 'pending'" class="mt-auto">
    <u-separator />
    <div class="px-3">
      <div class="py-6 px-2">
        <div class="text-sm mb-4 space-y-2">
          <p>{{ userData ? userData.userLimitCount : 0 }} / {{ MAX_FREE_GENERATE }} Generate</p>
          <u-progress v-model="progress" />
        </div>
        <UButton icon="lucide:zap" color="error" class="w-full justify-center">
          Upgrade
        </UButton>
      </div>
    </div>
  </div>
</template>