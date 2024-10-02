// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: './live2d.min.js'
        },
        {
          src: './live2dcubismcore.min.js'
        }
      ]
    }
  }, 
  ssr: false,
})