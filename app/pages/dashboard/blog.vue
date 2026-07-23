<script setup lang="ts">
  import * as z from "zod"
  import type { FormSubmitEvent } from "@nuxt/ui";
  import type { FetchError } from "ofetch"

  definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
  })

  useSeoMeta({
    title: 'Blog Title Generator',
    description: 'Discover compelling and attention-grabbing blog titles instantly with AI-powered suggestions.',
    robots: 'noindex, nofollow',
  })

  const { toggleModal } = useProModal();

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
        title="Blog Title Generator"
        description="Discover compelling and attention-grabbing blog titles instantly with AI-powered sugestions"
        class="mt-16 md:mt-4"
      />
      <UAlert v-if="error" color="error" variant="subtle" :title="error.statusCode + ''" :description="error.statusMessage" class="mb-2" />
      <div class="py-4 w-full max-w-full">
        <div class="flex flex-col space-y-2 lg:gap-4">
          <UCard class="w-full h-fit lg:w-md">
            <UForm :schema="schema" :state="state" class="space-y-4" @submit="generateBlog">
              <UFormField name="blogTopic" label="Blog Keyword">
                <UInput v-model="state.blogTopic" class="w-full" />
              </UFormField>
              <UFormField name="blogCategory" label="Blog Catgeory">
                <USelect v-model="state.blogCategory" :items="blogCategories" class="w-full"/>
              </UFormField>
              <span class="flex justify-end">
                <UButton :loading="isLoading" type="submit" label="Submit" color="neutral" />
              </span>
            </UForm>
          </UCard>
          <UCard :ui="{body: 'h-[calc(100dvh-465px)]'}" class="overflow-y-auto mt-2 w-full lg:mt-0">
            <div v-if="content" class="h-full">
              <MDC :value="content"/>
            </div>
            <div v-else-if="isLoading && !content" class="flex flex-col justify-center items-center">
              Generating Blog... 
            </div>
          </UCard>
        </div>
      </div>
    </u-container>
  </div>
</template>