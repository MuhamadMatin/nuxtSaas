<script setup lang="ts">
import { MAX_FREE_GENERATE } from '~/utils/utils/user-limit';
import { useAuth } from '~/composables/useAuth'

const { upgradeToPro } = useAuth();
const { data: userData, status } = await useFetch('/api/user', {
  key: "userData"
});
const isPro = computed(() => !!userData.value?.subcription)

const progress = computed(() => {
  if (userData.value) {
    return (userData.value.userLimiCount / MAX_FREE_GENERATE) * 100;
  }  
  return 0
})
</script>

<template>
  <div v-if="status != 'pending' && !isPro" class="mt-auto">
    <u-separator />
    <div class="px-3">
      <div class="py-6 px-2">
        <div class="text-sm mb-4 space-y-2">
          <p>{{ userData ? userData.userLimitCount : 0 }} / {{ MAX_FREE_GENERATE }} Generate</p>
          <u-progress v-model="progress" />
        </div>
        <UButton icon="lucide:zap" color="error" class="w-full justify-center" @click="upgradeToPro" >
          Upgrade
        </UButton>
      </div>
    </div>
  </div>
</template>