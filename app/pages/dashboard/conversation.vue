<script setup lang="ts">
  import * as z from "zod"
  import type { FormSubmitEvent } from "@nuxt/ui";
  import type { FetchError } from "ofetch"

  definePageMeta({
    layout: "dashboard"
  });

  const schema = z.object({
    userPrompt: z.string().min(1, "Prompt required"),
  })

  type Schema = z.output<typeof schema>;

  type Message = {
    role: "user" | "system",
    content: string
  }

  const state = reactive<Schema>({
    userPrompt: ""
  })

  const messages = ref<Message[]>([])

  const isLoading = ref(false);
  const error = ref<AppError | null>(null)

  const sendMessage = async (event: FormSubmitEvent<Schema>) =>{
    try {
      isLoading.value = true
      messages.value.push({
        role: "user",
        content: event.data.userPrompt.trim()
      })

      const data = await $fetch('/api/ai-tools/conversation', {
        method: "POST",
        body: {
          messages: messages.value
        }
      })

      if (data) {
        messages.value.push({
          role: "system",
          content: data
        })

        state.userPrompt = ""

        await refreshNuxtData('userData');
      }
    } catch (e) {
      const err = e as FetchError
      error.value = getError(err)
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <div>
    <u-container class="h-[calc(100dvh-88px)] flex flex-col py-4">
      <PageHeading 
        title="Conversation"
        description="Engage neutral, intelligent conversations with AI for brainstroming, questions or casual chat"
      />
      <UAlert v-if="error" color="error" variant="subtle" :title="error.statusCode + ''" :description="error.statusMessage" class="mb-2" />

      <!-- chat -->
      <u-card variant="subtle" class="flex-1 overflow-y-auto space-y-4 px-4 py-2">
        <div class="flex flex-col gap-4">
          <div v-for="(msg, index) in messages" :key="index" class="flex items-start space-x-2" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
            <div class="flex items-start space-x-2">
              <UButton size="sm" variant="soft" class="rounded-full" :icon="msg.role === 'user' ? 'lucide:user' : 'lucide:cpu'" :color="msg.role === 'user' ? 'primary' : 'success'" />
            </div>
            <u-card :ui="{body: 'p-3 sm:p-3'}">
              <div class="text-sm max-w-prose">
                <MDC :value="msg.content" />
              </div>
            </u-card>
          </div>
        </div>
      </u-card>

      <!-- chat form -->
      <div class="pt-4">
        <u-form :schema="schema" :state="state" class="space-x-4" @submit="sendMessage">
          <div class="flex space-x-2 w-full">
            <u-form-field class="flex-1" name="userPrompt">
              <u-textarea v-model="state.userPrompt" :rows="1" class="w-full" />
            </u-form-field>
            <u-button type="submit" icon="lucide:arrow-up" color="primary"></u-button>
          </div>
        </u-form>
      </div>
    </u-container>
  </div>
</template>