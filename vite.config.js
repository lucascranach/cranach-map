import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    // You can access the environment variables using `env`
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        base: path.resolve(__dirname, "./src/base"),
        components: path.resolve(__dirname, "./src/components"),
        helpers: path.resolve(__dirname, "./src/helpers"),
        hooks: path.resolve(__dirname, "./src/hooks"),
        store: path.resolve(__dirname, "./src/store"),
      },
    },
    server: {
      port: 8080,
    },
    base: "/map",
  }
})
