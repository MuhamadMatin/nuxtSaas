<script setup lang="ts">
const socialLinks = [
  { icon: "i-simple-icons-instagram", label: "Instagram", to: "https://instagram.com" },
  { icon: "i-simple-icons-facebook", label: "Facebook", to: "https://facebook.com" },
  { icon: "i-simple-icons-x", label: "X", to: "https://x.com" },
  { icon: "i-simple-icons-discord", label: "Discord", to: "https://discord.com" },
]

const linkColumns = [
  {
    title: "Products",
    links: [
      { label: "Conversation", to: "/dashboard/conversation" },
      { label: "Code Generation", to: "/dashboard/code" },
      { label: "Article Writer", to: "/dashboard/article" },
      { label: "Blog Title", to: "/dashboard/blog" },
      { label: "Background Removal", to: "/dashboard/remove-background" },
      { label: "Object Removal", to: "/dashboard/remove-object" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
]
</script>

<template>
  <footer class="border-t border-(--ui-border) overflow-hidden">
    <UContainer class="py-16">
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-12">
        <!-- Brand -->
        <div>
          <NuxtLink to="/" class="inline-flex items-center gap-2">
            <Logo />
          </NuxtLink>

          <p class="mt-4 text-(--ui-text-dimmed) leading-relaxed">
            The fastest way to build, ship, and scale your own suite of AI-powered tools.
          </p>

          <div class="mt-6 flex items-center gap-2">
            <UButton v-for="social in socialLinks" :key="social.label" :icon="social.icon" :to="social.to" target="_blank" color="neutral" variant="subtle" size="md" square :aria-label="social.label"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div v-for="column in linkColumns" :key="column.title">
            <h3 class="text-sm font-semibold">{{ column.title }}</h3>
            <ul class="mt-4 space-y-3">
              <li v-for="link in column.links" :key="link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-(--ui-text-dimmed) hover:text-(--ui-text) transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-6 border-t border-(--ui-border) flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-(--ui-text-dimmed)">
        <span>&copy; {{ new Date().getFullYear() }} NuxtSaAS</span>
        <NuxtLink to="/legal" class="hover:text-(--ui-text) transition-colors">Legal</NuxtLink>
        <NuxtLink to="/status" class="hover:text-(--ui-text) transition-colors">Status</NuxtLink>
      </div>
    </UContainer>

    <!-- wordmark -->
    <div class="select-none -mb-4 sm:-mb-6 lg:-mb-8">
      <p class="text-center font-black text-(--ui-primary) leading-none tracking-tighter whitespace-nowrap" style="font-size: clamp(4rem, 16vw, 11rem);">
        NuxtSaAS
      </p>
    </div>
  </footer>
</template>