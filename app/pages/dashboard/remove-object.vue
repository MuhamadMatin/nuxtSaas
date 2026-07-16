<script setup lang="ts">
  import * as z from "zod"
  import type { FormSubmitEvent } from "@nuxt/ui";
  import type { FetchError } from "ofetch"

  definePageMeta({
    layout: "dashboard"
  });

  const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
  const MIN_DIMENSIONS = { width: 200, height: 200 }
  const MAX_DIMENSIONS = { width: 4096, height: 4096 }
  const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  const schema = z.object({
    image: z
      .instanceof(File, {
        message: 'Please select an image file.'
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Please upload a valid image file (JPEG, PNG, or WebP).'
      })
      .refine(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => {
              const img = new Image()
              img.onload = () => {
                const meetsDimensions =
                  img.width >= MIN_DIMENSIONS.width &&
                  img.height >= MIN_DIMENSIONS.height &&
                  img.width <= MAX_DIMENSIONS.width &&
                  img.height <= MAX_DIMENSIONS.height
                resolve(meetsDimensions)
              }
              img.src = e.target?.result as string
            }
            reader.readAsDataURL(file)
          }),
        {
          message: `The image dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height} pixels.`
        }
      ),
    object: z.string().min(1, "Object to remove is required")
  })

  type Schema = z.output<typeof schema>;

  const state = reactive<Partial<Schama>>({
    image: undefined,
    object: ""
  })

  const isLoading = ref(false);
  const error = ref<AppError | null>(null);
  const imageUrl = ref("");

  const removeObject = async (event: FormSubmitEvent<Schema>) =>{
    try {
      isLoading.value = true

      const formData = new FormData();
      if (event.data.image instanceof File) {
        formData.append("image", event.data.image)
      }
      formData.append("object", event.data.object)
      const data = await $fetch('/api/cloudinary-tools/remove-object', {
        method: "POST",
        body: formData,
      })

      if (data) {
        imageUrl.value = data

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
        title="Object Removal"
        description="Easily erase unwanted elements from your photos using our precise AI object remover"
      />
      <UAlert v-if="error" color="error" variant="subtle" :title="error.statusCode + ''" :description="error.statusMessage" class="mb-2" />
      <div class="py-4 w-full max-w-full">
        <div class="flex flex-wrap gap-5">
          <div>
            <u-card>
              <UForm :schema="schema" :state="state" class="space-y-4 w-96" @submit="removeObject">
                <UFormField label="Describe object to remove" name="object">
                  <UInput v-model="state.object" class="w-full" />
                </UFormField>
                <UFormField name="image" label="Image" description="JPG, GIF or PNG. 2MB Max.">
                  <UFileUpload v-model="state.image" accept="image/*" class="min-h-48" />
                </UFormField>
                <UButton type="submit" label="Submit" color="neutral" />
              </UForm>
            </u-card>
          </div>
          <UCard :ui="{body: 'p-3 h-full'}" class="flex-1 max-w-[300px]">
            <div v-if="imageUrl" class="h-full">
              <NuxtImg :src="imageUrl" custom v-slot="{ src, isLoaded, imgAttrs }">
                <img
                  v-if="isLoaded"
                  v-bind="imgAttrs"
                  :src="src"
                  class="w-full h-full object-contain"
                />
                <USkeleton v-else class="w-full h-full" />
              </NuxtImg>
            </div>
            <div v-else-if="isLoading && !imageUrl" class="flex flex-col justify-center items-center w-full h-full">
              <USkeleton class="w-full h-full" />
            </div>
          </UCard>
        </div>
      </div>
    </u-container>
  </div>
</template>