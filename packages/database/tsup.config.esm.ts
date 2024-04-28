import { defineConfig } from 'tsup';

// const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  // clean: true,
  // dts: true,
  entry: ['src/core.ts'],
  format: ['esm'],
  minify: false,
  sourcemap: true,
});
