<script setup lang="ts">
  import * as z from "zod"
  import type { FormSubmitEvent } from "@nuxt/ui";
  import type { FetchError } from "ofetch"

  definePageMeta({
    layout: "dashboard"
  });

  const schema = z.object({
    blogTopic: z.string().min(1, "Blog Topic required"),
    blogCategory: z.string(),
  })

  type Schema = z.output<typeof schema>;

  const state = reactive<Schema>({
    blogTopic: "",
    blogCategory: "",
  })

  const blogCategories = ref([
    "General", "Technology", "Bussiness", "Health", "Lifestyle", "Education", "Travel", "Food"
  ]);

  const isLoading = ref(false);
  const error = ref<AppError | null>(null);
  const content = ref("");

  const generateBlog = async (event: FormSubmitEvent<Schema>) =>{
    try {
      isLoading.value = true

      const data = await $fetch('/api/ai-tools/blog', {
        method: "POST",
        body: {
          blogTopic: event.data.blogTopic,
          blogCategory: event.data.blogCategory,
        }
      })

      if (data) {
        content.value = data
        state.blogTopic = ""
        state.blogCategory = event.data.blogCategory

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
        title="Blog Title Generator"
        description="Discover compelling and attention-grabbing blog titles instantly with AI-powered sugestions"
      />
      <UAlert v-if="error" color="error" variant="subtle" :title="error.statusCode + ''" :description="error.statusMessage" class="mb-2" />
      <div class="py-4 w-full max-w-full">
        <div class="flex flex-col space-y-2">
          <div>
            <u-card>
              <UForm :schema="schema" :state="state" class="space-y-4" @submit="generateBlog">
                <UFormField name="blogTopic" label="Blog Keyword">
                  <UInput v-model="state.blogTopic" class="w-full" />
                </UFormField>
                <UFormField name="blogCategory" label="Blog Catgeory">
                  <USelect v-model="state.blogCategory" :items="blogCategories" class="w-full"/>
                </UFormField>
                <UButton type="submit" label="Submit" color="neutral" />
              </UForm>
            </u-card>
          </div>
          <UCard :ui="{body: 'h-[calc(100dvh-350px)]'}" class="flex-1 overflow-y-auto">
            <div v-if="content" class="h-full">
              <MDC :value="content"/>
            </div>
            <div v-else-if="isLoading && !content" class="flex flex-col justify-center items-center">
              Generating Blog...''
            </div>
          </UCard>
        </div>
      </div>
    </u-container>
  </div>
</template>