<script setup lang="ts">
useSeoMeta({
  title: "Legal",
  description: "Legal documents and policies. Everything about how we operate, and your rights as a user.",
  ogTitle: "Legal - NuxtSaaS",
  ogDescription: "Legal documents and policies. Everything about how we operate, and your rights as a user.",
})

const documents = [
  {
    icon: "i-lucide-shield",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal data.",
    to: "/privacy",
  },
  {
    icon: "i-lucide-file-text",
    title: "Terms of Service",
    description: "The rules and guidelines for using our platform.",
    to: "/terms",
  },
]
</script>

<template>
  <UContainer class="py-16 sm:py-24">
    <div class="max-w-2xl mx-auto text-center mb-12">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight">Legal</h1>
      <p class="mt-3 text-(--ui-text-dimmed)">Everything about how we operate, and your rights as a user.</p>
    </div>

    <div class="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
      <NuxtLink v-for="doc in documents" :key="doc.to" :to="doc.to">
        <UCard class="h-full transition-shadow">
          <UButton :icon="doc.icon" size="md" color="primary" variant="subtle" square class="mb-4" />
          <h3 class="font-semibold mb-1">{{ doc.title }}</h3>
          <p class="text-sm text-(--ui-text-dimmed)">{{ doc.description }}</p>
        </UCard>
      </NuxtLink>
    </div>
  </UContainer>
</template>