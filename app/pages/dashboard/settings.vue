<script setup lang="ts">
  definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
  })

  useSeoMeta({
    title: 'Settings',
    description: 'Manage your account settings, billing, and subscription plan.',
    robots: 'noindex, nofollow',
  })

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
    <UCard>
      <h2 class="text-lg font-semibold flex gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </g>
        </svg>
        Billing
      </h2>
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
    </UCard>
  </UContainer>
</template>