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
    domains: [
      'github.com', 
      'res.cloudinary.com',
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
    ],
  },
})