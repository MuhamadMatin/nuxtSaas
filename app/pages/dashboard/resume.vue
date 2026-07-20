<script setup lang="ts">
  import * as z from "zod"
  import type { FormSubmitEvent } from "@nuxt/ui";
  import type { FetchError } from "ofetch"

  definePageMeta({
    layout: "dashboard"
  });

  const { toggleModal } = useProModal();

  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  const ACCEPTED_FILE_TYPES = ['application/pdf']

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  const schema = z.object({
    resume: z
      .instanceof(File, {
        message: 'Please select a pdf file.'
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `The pdf is too large. Please choose an pdf smaller than ${formatBytes(MAX_FILE_SIZE)}.`
      })
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
        message: 'Please upload a valid file (PDF).'
      }),
  })

  type Schema = z.output<typeof schema>;

  const state = reactive<Partial<Schama>>({
    contentResume: undefined,
  })

  const isLoading = ref(false);
  const error = ref<AppError | null>(null);
  const contentResume = ref("");

  const reviewResume = async (event: FormSubmitEvent<Schema>) =>{
    try {
      isLoading.value = true

      const formData = new FormData();
      if (event.data.resume instanceof File) {
        formData.append("resume", event.data.resume)
      }
      const data = await $fetch('/api/ai-tools/resume', {
        method: "POST",
        body: formData,
      })

      if (data) {
        contentResume.value = data

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
    <u-container class="h-[calc(100dvh-88px)] flex flex-col py-4">
      <PageHeading 
        title="Resume Reviewer"
        description="Enhance your resume with AI-powered insight to boost your chances of getting hire"
      />
      <UAlert v-if="error" color="error" variant="subtle" :title="error.statusCode + ''" :description="error.statusMessage" class="mb-2" />
      <div class="py-4 w-full max-w-full">
        <div class="flex flex-col space-y-4">
          <div class="w-full">
            <u-card>
              <UForm :schema="schema" :state="state" class="space-y-4" @submit="reviewResume">
                <UFormField name="resume" label="resume" description="PDF. 5MB Max.">
                  <UFileUpload v-model="state.resume" accept=".pdf" class="min-h-48" />
                </UFormField>
                <UButton type="submit" label="Submit" color="neutral" />
              </UForm>
            </u-card>
          </div>
          <UCard :ui="{body: 'p-3 h-full'}" class="flex-1 max-w-[300px]">
            <div v-if="contentResume" class="h-full">
              <MDC :value="contentResume"/>
            </div>
            <div v-else-if="isLoading && !contentResume" class="flex flex-col justify-center items-center w-full h-full">
              <!-- <USkeleton class="w-full h-full" /> -->
               Review your resume...
            </div>
          </UCard>
        </div>
      </div>
    </u-container>
  </div>
</template>