import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "react-youtube-light",
      fileName: (format) => `index.${format}.js`,
      formats: ["umd", "es"]
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          'react/jsx-runtime': 'ReactJsxRuntime',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
