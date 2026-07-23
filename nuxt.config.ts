// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/mdc',
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    tursoDatabaseUrl: "",
    tursoAuthToken: "",
    githubClientId: "",
    githubClientSecret: "",
    googleClientId: "",
    googleClientSecret: "",
    geminiApi: "",
    cloudinaryCloudName: "", 
    cloudinaryApiKey: "", 
    cloudinaryApiSecret: "",
    polarAccessToken: "",
    polarServer: "",
    polarProductId: "",
    polarWebhookSecret: "",
    public : {
      appEnv: "",
    }
  },
  image: {
    domains: ['github.com', 'res.cloudinary.com'],
  },
})