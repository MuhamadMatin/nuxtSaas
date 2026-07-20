<script setup lang="ts">
definePageMeta({
  layout: "dashboard"
});

const { upgradeToPro } = useAuth();
const { data: userData, status } = await useFetch('/api/user', {
  key: "userData"
});
const isPro = computed(() => !!userData.value?.subcription)

const subctiptionMessage = computed(() => {
  if (!isPro.value) {
    return "You're currently in free plan" 
  }

  const endDate = userData.value?.subcription && userData.value?.subcription.endsAt ? new Date(userData.value?.subcription.endsAt).toDateString() : new Date(userData.value?.subcription?.currentPeriodEnd).toDateString();
  if (userData.value?.subcription?.cancelAtPeriodEnd) {
    return `you're currently on Pro plan, but it will cancelled on ${endDate}`
  }
  return `you're currently on Pro plan. Next billing date: ${endDate}`
})
</script>

<template>
  <UContainer class="h-[calc(100dvh-88px)] flex flex-col py-4">
    <PageHeading title="Settings" description="Manage account" />
    <div class="flex flex-col space-y-4">
      <p class="text-sm text-muted-foreground">{{ subctiptionMessage }}</p>
      <div class="flex gap-4">
        <UButton v-if="userData && isPro" :disabled="status === 'pending'" :to="userData.customerPortalUrl">
          Manage Subcription
        </UButton>
        <UButton v-else icon="lucide:zap" color="error" @click="upgradeToPro">
          Upgrade
        </UButton>
      </div>
    </div>
  </UContainer>
</template>