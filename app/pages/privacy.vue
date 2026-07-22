<script setup lang="ts">
useSeoMeta({
  title: "Privacy Policy",
  description: "How we collect, use, and protect your personal data.",
})

const lastUpdated = "July 22, 2026"
</script>

<template>
  <UContainer class="py-16 sm:py-24">
    <div class="max-w-2xl mx-auto prose dark:prose-invert prose-headings:font-semibold">
      <h1 class="!mb-2">Privacy Policy</h1>
      <p class="text-sm text-(--ui-text-dimmed) !mt-0">Last updated: {{ lastUpdated }}</p>

      <h2>1. Information we collect</h2>
      <p>
        We collect information you provide directly, such as your name and email when you create an account,
        along with content you submit to our AI tools (prompts, images, documents) solely to generate your
        requested output.
      </p>

      <h2>2. How we use your information</h2>
      <p>
        We use your information to operate and improve the service, process your requests through our AI
        providers, manage billing, and communicate important updates. We do not sell your personal data to
        third parties.
      </p>

      <h2>3. Data sharing</h2>
      <p>
        We share data only with service providers necessary to run the platform (e.g. hosting, database,
        payment processing, and AI model providers), each bound by their own data protection obligations.
      </p>

      <h2>4. Data retention</h2>
      <p>
        We retain account data for as long as your account is active. You may request deletion of your account
        and associated data at any time by contacting us.
      </p>

      <h2>5. Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, or delete your personal data, and
        to object to certain processing. Contact us to exercise these rights.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about this policy? Reach out via our
        <NuxtLink to="/contact">contact page</NuxtLink>.
      </p>
    </div>
  </UContainer>
</template>