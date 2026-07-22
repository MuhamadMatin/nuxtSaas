<script setup lang="ts">
useSeoMeta({
  title: "Terms of Service",
  description: "The rules and guidelines for using our platform. Read before using our services.",
  ogTitle: "Terms of Service - NuxtSaaS",
  ogDescription: "The rules and guidelines for using our platform. Read before using our services.",
})

const lastUpdated = "July 22, 2026"
</script>

<template>
  <UContainer class="py-16 sm:py-24">
    <div class="max-w-2xl mx-auto prose dark:prose-invert prose-headings:font-semibold">
      <h1 class="!mb-2">Terms of Service</h1>
      <p class="text-sm text-(--ui-text-dimmed) !mt-0">Last updated: {{ lastUpdated }}</p>

      <h2>1. Acceptance of terms</h2>
      <p>
        By creating an account or using our services, you agree to be bound by these Terms. If you do not
        agree, please do not use the platform.
      </p>

      <h2>2. Use of the service</h2>
      <p>
        You agree to use our AI tools only for lawful purposes. You may not use the service to generate content
        that is illegal, harmful, infringing, or that violates the rights of others.
      </p>

      <h2>3. Free trial and subscriptions</h2>
      <p>
        Free accounts are limited to a set number of generations per month. Paid subscriptions unlock unlimited
        or higher usage limits, billed in advance on a recurring basis until cancelled.
      </p>

      <h2>4. Content ownership</h2>
      <p>
        You retain ownership of the content you submit and the output generated for you, subject to the
        underlying AI provider's own usage policies.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        The service is provided "as is" without warranties of any kind. We are not liable for indirect,
        incidental, or consequential damages arising from your use of the platform.
      </p>

      <h2>6. Changes to these terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the service after changes take effect
        constitutes acceptance of the revised Terms.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about these Terms? Reach out via our
        <NuxtLink to="/contact">contact page</NuxtLink>.
      </p>
    </div>
  </UContainer>
</template>