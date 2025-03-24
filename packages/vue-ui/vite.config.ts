import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		outDir: "es",
		minify: true,
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
				dir: "dist",
			},
		},
		lib: {
			entry: "./src/index.ts",
			fileName: "index",
			name: "@narcecl/vue",
		},
	},
	plugins: [
		vue(),
		dts({
			insertTypesEntry: true,
			include: ['src/**/*.vue', 'src/**/*.ts'],
			outDir: 'dist',
		}),
	],
});