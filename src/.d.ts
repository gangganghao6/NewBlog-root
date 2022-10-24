export {}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROJECT_PATH: string
      PORT: string
      VITE_CRYPTO_KEY: string
      PUBLIC_URL: string
      VITE_BACKEND_PORT: string
    }
  }
}
