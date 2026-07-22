<script setup lang="ts">
import * as z from "zod"
import type { FormSubmitEvent } from "@nuxt/ui"
import type { FetchError } from "ofetch"

useSeoMeta({
  title: "Contact Us",
  description: "Get in touch with our team.",
})

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: "",
  email: "",
  message: "",
})

const isLoading = ref(false)
const isSent = ref(false)
const error = ref<AppError | null>(null)

const sendMessage = async (event: FormSubmitEvent<Schema>) => {
  try {
    isLoading.value = true
    error.value = null

    await $fetch("/api/contact", {
      method: "POST",
      body: event.data,
    })

    isSent.value = true
  } catch (e) {
    const err = e as FetchError
    error.value = getError(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UContainer class="py-16 sm:py-24">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center p-4">
          <h1 class="text-xl font-semibold">Get in touch</h1>
          <p class="text-sm text-(--ui-text-dimmed) mt-1">
            Questions, feedback, or partnership ideas — we'd love to hear from you.
          </p>
        </div>
      </template>

      <div class="space-y-4">
        <UAlert
          v-if="error"
          color="error"
          variant="subtle"
          :title="error.statusCode + ''"
          :description="error.statusMessage"
        />

        <template v-if="!isSent">
          <UForm :schema="schema" :state="state" class="space-y-4" @submit="sendMessage">
            <UFormField label="Name" name="name" required>
              <UInput v-model="state.name" placeholder="Your name" class="w-full" />
            </UFormField>
            <UFormField label="Email" name="email" required>
              <UInput v-model="state.email" placeholder="Your email" class="w-full" />
            </UFormField>
            <UFormField label="Message" name="message" required>
              <UTextarea v-model="state.message" :rows="5" placeholder="How can we help?" class="w-full" />
            </UFormField>
            <UButton type="submit" color="primary" block :loading="isLoading">
              Send message
            </UButton>
          </UForm>
        </template>

        <div v-else class="text-center py-6">
          <UButton icon="i-lucide-check" color="success" variant="subtle" square size="lg" class="mb-4" />
          <h3 class="font-semibold">Message sent!</h3>
          <p class="text-sm text-(--ui-text-dimmed) mt-1">We'll get back to you within 1-2 business days.</p>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>