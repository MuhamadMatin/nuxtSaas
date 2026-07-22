<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { useAuth } from '~/composables/useAuth'

useSeoMeta({
  title: 'Login',
  description: 'Sign in to your NuxtSaaS account to access AI-powered creative tools and dashboard.',
  robots: 'noindex, nofollow',
})

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: '',
  password: '',
})

const { signIn } = useAuth();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { error } = await signIn.email({
    email: event.data.email,
    password: event.data.password,
    callbackURL: "/dashboard",
  });

  console.log(error);
}
</script>

<template>
  <UContainer class="flex items-center justify-center sm:p-4 sm:min-w-160">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center p-4">
          <h1 class="text-xl font-semibold">
            Welcome
          </h1>
        </div>
      </template>
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <UButton color="neutral" variant="outline" icon="ri:google-fill" class="justify-center" :loading="false" :disabled="false"
            @click="signIn.social({
                provider: 'google',
                callbackURL: '/dashboard',
            })">
            Google
          </UButton>
          <UButton color="neutral" variant="outline" icon="mdi:github" class="justify-center" :loading="false" :disabled="false" 
            @click="signIn.social({
              provider: 'github',
              callbackURL: '/dashboard',
            })">
            Github
          </UButton>
        </div>
        <USeparator label="Or"/>

        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Email" name="email" required>
            <UInput v-model="state.email" placeholder="Your email" class="w-full" />
          </UFormField>
          <UFormField label="Password" name="password" required>
            <UInput v-model="state.password" type="password" placeholder="Password" class="w-full" />
          </UFormField>
          <UButton type="submit" color="primary" block>
            Submit
          </UButton>
        </UForm>
        <div class="text-center text-sm">
          Don't Have Account
          <UButton variant="link" color="primary" :disabled="false" to="/auth/register" class="-ml-2">
            Create Now
          </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>