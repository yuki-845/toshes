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
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
	  // TODO: ここに先ほど控えたhrefの中身を記載
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap",
          crossorigin: "",
        },
      ]
    }
  },

  css: [
    '@/assets/css/main.css',
  ],
  
  ssr: false,
  compatibilityDate: '2024-10-03',
})