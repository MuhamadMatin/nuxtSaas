<script setup lang="ts">
  import * as z from "zod"
  import type { FormSubmitEvent } from "@nuxt/ui";
  import type { FetchError } from "ofetch"

  definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
  })

  useSeoMeta({
    title: 'AI Article Writer',
    description: 'Craft well-structured and engaging articles on any subject using advanced AI writing assistance.',
    robots: 'noindex, nofollow',
  })

  const { toggleModal } = useProModal();

  const schema = z.object({
    articleTopic: z.string().min(1, "Article Topic required"),
    articleLength: z.number(),
  })

  type Schema = z.output<typeof schema>;

  const state = reactive<Schema>({
    articleTopic: "",
    articleLength: 500,
  })

  const articleItems = ref([
    {
      label: "Short (500-800 words)",
      value: 800
    },
    {
      label: "Medium (800-1200 words)",
      value: 1200
    },
    {
      label: "Long (1200+ words)",
      value: 1600
    },
  ]);

  const isLoading = ref(false);
  const error = ref<AppError | null>(null);
  const content = ref("");

  const generateArticle = async (event: FormSubmitEvent<Schema>) =>{
    try {
      isLoading.value = true

      const data = await $fetch('/api/ai-tools/article', {
        method: "POST",
        body: {
          articleTopic: event.data.articleTopic,
          articleLength: event.data.articleLength,
        }
      })

      if (data) {
        content.value = data
        state.articleTopic = ""
        state.articleLength = event.data.articleLength ?? 500

        await refreshNuxtData('userData');
      }
    } catch (e) {
      const err = e as FetchError
      if (err.statusCode === 401) {
        navigateTo("/auth/login");
      }
      if (err.statusCode === 403) {
        toggleModal(true);
      }
      error.value = getError(err)
    } finally {
      isLoading.value = false;
    }
  }
</script>

<template>
  <div>
    <u-container class="h-[calc(100dvh-33px)] flex flex-col">
      <PageHeading 
        title="AI Article Writer"
        description="Craft well-structure and engaging articles on any subject using advanced AI writing assitence"
        class="mt-16 md:mt-4"
      />
      <UAlert v-if="error" color="error" variant="subtle" :title="error.statusCode + ''" :description="error.statusMessage" class="mb-2" />
      <div class="py-4 w-full max-w-full">
        <div class="flex flex-col space-y-2 lg:gap-4">
          <UCard class="w-full h-fit lg:w-md">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="generateArticle">
              <UFormField name="articleTopic" label="Article Topic">
                <UInput v-model="state.articleTopic" class="w-full" />
              </UFormField>
              <UFormField name="articleLength" label="Article Length">
                <USelect v-model="state.articleLength" :items="articleItems" class="w-full"/>
              </UFormField>
              <span class="flex justify-end">
                <UButton :loading="isLoading" type="submit" label="Submit" color="neutral" />
              </span>
            </UForm>
          </UCard>
          <UCard :ui="{body: 'h-[calc(100dvh-470px)]'}" class="overflow-y-auto mt-2 w-full lg:mt-0">
            <div v-if="content" class="h-full">
              <MDC :value="content"/>
            </div>
            <div v-else-if="isLoading && !content" class="flex flex-col justify-center items-center">
              Generating Article...
            </div>
          </UCard>
        </div>
      </div>
    </u-container>
  </div>
</template>