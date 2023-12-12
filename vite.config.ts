import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { getLocalIp } from './src/utils'
import dotenv from 'dotenv'

dotenv.config({
  path: '.env'
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 1024,
      algorithm: 'gzip',
      ext: '.gz'
    })
  ],
  server: {
    host: getLocalIp(),
    port: parseInt(process.env.VITE_PORT),
    // https: {
    //   cert: fs.readFileSync(join(localConfig.projectPath, 'keys/cert.crt')),
    //   key: fs.readFileSync(join(localConfig.projectPath, 'keys/cert.key'))
    // }
    proxy: {
      '/api': {
        target: `http://${getLocalIp()}:${process.env.VITE_SERVER_PORT}`, // 目标地址
        changeOrigin: true // 是否换源
      }
    }
  },
  build: {
    sourcemap: true,
    target: ['es2015', 'chrome58', 'firefox58', 'safari11']
  },
  // define: {
  //   'import.meta.env.VITE_PUBLIC_IP': JSON.stringify(`http://${getNetworkIp()}:${process.env.VITE_SERVER_PORT}`),
  // },
  base: './'
})
