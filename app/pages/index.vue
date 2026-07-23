<script setup lang="ts">
  import { aiTools } from "~~/constants/tools"
  import { aiReviews } from "~~/constants/reviews"
  import { faqItems } from "~~/constants/faq"

  useSeoMeta({
    title: 'AI-Powered Creative Tools',
    description: 'Create amazing content with AI-powered tools. Generate articles, code, blog posts, remove image backgrounds, and more all in one platform.',
    ogTitle: 'NuxtSaaS — AI-Powered Creative Tools',
    ogDescription: 'Create amazing content with AI-powered tools. Generate articles, code, blog posts, remove image backgrounds, and more all in one platform.',
    twitterTitle: 'NuxtSaaS — AI-Powered Creative Tools',
    twitterDescription: 'Create amazing content with AI-powered tools. Generate articles, code, blog posts, remove image backgrounds, and more.',
  })
</script>

<template>
  <div class="h-full">
    <navbar>
      <template #right>
        <ThemeToggle />
      </template>
    </navbar>
    <!-- hero -->
    <UContainer>
      <div class="flex flex-col items-center justify-center text-center py-32 sm:py-48 lg:py-56">
        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight">
          Create Amazing AI Tools
        </h1>
        <p class="mt-4 text-lg text-(--ui-text-dimmed) max-w-xl">
          Lunch modern websites and apps with beautiful components, built-in dark mode and effortless Nuxt 4 integration
        </p>
        <div class="mt-6">
          <div class="flex gap-4 flex-wrap">
            <UButton icon="i-lucide-arrow-up-right" to="/dashboard" size="lg" color="primary">
              Get Started
            </UButton>
            <UButton icon="i-lucide-rocket" to="/dashboard" color="neutral" variant="outline" :ui="{ leadingIcon:'text-primary' }">
              Explore Tools
            </UButton>
          </div>
        </div>
        <div class="mt-6 flex flex-wrap items-center gap-4">
          <UAvatarGroup>
            <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canc" />
            <UAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
            <UAvatar src="https://github.com/noook.png" alt="Neil Richter" />
          </UAvatarGroup>
          <p>Loved by 10k+ people</p>
        </div>
      </div>
    </UContainer>
    <!-- tools -->
    <UContainer>
      <div class="flex flex-col items-center justify-center text-center mb-10 sm:mb-20">
        <h2 class="text-center text-2xl font-bold md:text-4xl">Explore the power of AI</h2>
        <p class="text-center font-light text-muted-foreground text-sm md:text-lg">
          Everything you need to create, enhance and optimize your content with cutting-edge AI technology
        </p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UCard v-for="tool in aiTools" :key="tool.title" class="h-full" :ui="{ body: 'h-full' }">
          <div class="flex flex-col space-y-2 h-full">
            <div class="flex-1">
              <UButton :icon="tool.icon" size="md" color="primary" variant="subtle" />
              <h6 class="font-semibold my-4">{{ tool.title }}</h6>
              <p class="text-(--ui-text-dimmed)">{{ tool.description }}</p>
            </div>
            <div class="mt-auto">
              <UButton :to="tool.path" trailing-icon="i-lucide-arrow-right" size="md">{{ tool.btnText }}</UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
    <!-- testimoni -->
    <UContainer class="mt-32 sm:mt-48 lg:mt-56 mb-40">
      <div class="flex flex-col items-center justify-center text-center mb-10 sm:mb-20">
        <h2 class="text-center text-2xl font-bold md:text-4xl">Loved by customers</h2>
        <p class="text-center font-light text-muted-foreground text-sm md:text-lg">
          Checkout the review, what our existing customers says about our tools and product
        </p>
      </div>
      <div class="column-1 md:columns-2 lg:columns-3 gap-8 space-y-8 scroll-mt-[calc(var(--header-height)+140px+128px+96px)] mt-12">
        <div v-for="review in aiReviews" :key="review.title">
          <UCard class="h-full" :ui="{ body: 'h-full' }">
            <p>{{ review.review }}</p>
            <template #footer>
              <div class="flex items-center gap-3">
                <UAvatar size="xl" :src="review.url" />
                <div>
                  <h6 class="text-lg font-bold">{{ review.user }}</h6>
                  <p class="text-sm">{{ review.designation }}</p>
                </div>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </UContainer>
    <!-- accordion -->
    <UContainer class="mb-32">
      <div class="flex flex-col items-center justify-center text-center mb-10 sm:mb-16">
        <h2 class="text-center text-2xl font-bold md:text-4xl">Frequently asked questions</h2>
        <p class="text-center font-light text-muted-foreground text-sm md:text-lg">
          Everything you need to know before getting started
        </p>
      </div>
      <div class="max-w-2xl mx-auto">
        <UAccordion :items="faqItems" />
      </div>
    </UContainer>
  </div>
</template>