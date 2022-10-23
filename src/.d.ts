export {}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PROJECT_PATH: string
      // @ts-ignore
      PORT: number
      VITE_CRYPTO_KEY: string
      PUBLIC_URL: string
    }
  }
}