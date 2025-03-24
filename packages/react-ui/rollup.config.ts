/* eslint-disable import/no-anonymous-default-export */
import { dts } from 'rollup-plugin-dts';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve, { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from "@rollup/plugin-typescript";

const externalDependencies = [
    'classnames',
    'react-dom',
    'react',
];

const resolveExtensions = ['js', 'jsx', 'ts', 'tsx'];

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: 'dist/index.js',
                format: "cjs",
            },
            {
                file: 'dist/index.mjs',
                format: "es",
            },
        ],
        external: externalDependencies,
        plugins: [
            commonjs(),
            image(),
            json(),
            nodeResolve(),
            peerDepsExternal(),
            postcss({
                // @ts-ignore
                use: {
                    sass: {
                        silenceDeprecations: ['legacy-js-api']
                    }
                },
                minimize: true,
                modules: true
            }),
            resolve({ extensions: resolveExtensions }),
            terser(),
            typescript({ declaration: false }),
        ],
    }, 
    {
        input: "src/index.ts",
        output: [
            {
                file: 'dist/index.d.ts',
                format: "es",
            },
        ],
        plugins: [
            dts(),
            resolve({ extensions: resolveExtensions }),
            typescriptPaths({ preserveExtensions: true }),
        ],
    }
];