<script setup lang="ts">
  import { aiTools } from '~~/constants/tools';

  definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
  })
</script>

<template>
  <UContainer>
    <div class="py-4 text-center">
      <PageHeading title="Explore the power of AI" description="Chat with the smartest AI - Experience the power of AI"/>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink v-for="tool in aiTools" :key="tool.path" :to="tool.path">
        <UCard class="h-full">
          <div class="mb-4 flex items-center">
            <UIcon :name="tool.icon" class="mr-2 text(--ui-primary)" />
            <p class="font-semibold">{{ tool.title }}</p>
          </div>
          <p class="text-(--ui-text-dimmed)">{{ tool.description }}</p>
        </UCard>
      </NuxtLink>
    </div>
  </UContainer>
</template>