<script setup lang="ts">
useSeoMeta({
  title: "About Us",
  description: "Learn about our mission to make AI tools accessible to everyone.",
  ogTitle: "About Us - NuxtSaaS",
  ogDescription: "Learn about our mission to make AI tools accessible to everyone.",
})

const values = [
  {
    icon: "i-lucide-zap",
    title: "Fast by default",
    description: "Every tool is built to give you results in seconds, not minutes.",
  },
  {
    icon: "i-lucide-shield-check",
    title: "Privacy first",
    description: "Your prompts and files are never used to train models or sold to third parties.",
  },
  {
    icon: "i-lucide-heart",
    title: "Built for creators",
    description: "We design every feature around real workflows, not just flashy demos.",
  },
]
</script>

<template>
  <UContainer class="py-16 sm:py-24">
    <div class="max-w-2xl mx-auto text-center">
      <h1 class="text-3xl sm:text-5xl font-bold tracking-tight">
        We're building the AI toolkit we always wanted
      </h1>
      <p class="mt-4 text-lg text-(--ui-text-dimmed)">
        A small team obsessed with making AI genuinely useful for everyday work not just another chatbot.
      </p>
    </div>

    <div class="mt-16 grid sm:grid-cols-3 gap-6">
      <UCard v-for="value in values" :key="value.title">
        <UButton :icon="value.icon" size="md" color="primary" variant="subtle" square class="mb-4" />
        <h3 class="font-semibold mb-2">{{ value.title }}</h3>
        <p class="text-sm text-(--ui-text-dimmed)">{{ value.description }}</p>
      </UCard>
    </div>

    <div class="mt-20 max-w-2xl mx-auto text-center">
      <h2 class="text-2xl font-bold">Our story</h2>
      <p class="mt-4 text-(--ui-text-dimmed) leading-relaxed">
        We started this project after getting frustrated switching between a dozen different AI apps just to
        write an article, clean up a photo, or debug a snippet of code. So we built one place that does it all 
        fast, affordable, and without the clutter.
      </p>
    </div>
  </UContainer>
</template>