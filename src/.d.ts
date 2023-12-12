export {}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      VITE_CRYPTO_KEY: string
      VITE_SERVER_PORT: string
      VITE_PUBLIC_URL: string
    }
  }
}
