/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import path from 'path';
import { RollupOptions } from 'rollup';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import deleteFiles from 'rollup-plugin-delete';
import copyFiles from 'rollup-plugin-copy';
import glob from 'glob';
import fs from 'fs';

const SOURCE_DIR = path.join(__dirname, './src');
const OUTPUT_DIR = path.resolve(__dirname, '../../dist/packages/utkonos-styles');

fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });

const files = glob.sync('./*.scss', { cwd: SOURCE_DIR });

export default files.map(
  (file) =>
    ({
      input: path.join(SOURCE_DIR, file),
      output: {
        dir: OUTPUT_DIR,
        sourcemap: true,
      },
      plugins: [
        postcss({
          extensions: ['.css', '.scss'],
          extract: `${path.parse(file).name}.css`,
          modules: false,
          sourceMap: true,
          plugins: [postcssImport()],
        }),
        // Сборка всех стилей должна происходить в последний момент
        copyFiles({
          targets: [
            {
              src: path.join(SOURCE_DIR, 'fonts/*'),
              dest: path.join(OUTPUT_DIR, 'fonts'),
            },
          ],
          verbose: true,
          hook: 'writeBundle',
        }),
        copyFiles({
          targets: [
            {
              src: './package.json',
              dest: OUTPUT_DIR,
            },
          ],
          verbose: true,
          hook: 'writeBundle',
        }),
        copyFiles({
          targets: [
            {
              src: './*.md',
              dest: OUTPUT_DIR,
            },
          ],
          verbose: true,
          hook: 'writeBundle',
        }),
        deleteFiles({
          targets: path.join(OUTPUT_DIR, '*.js{,.map}'),
          verbose: true,
          hook: 'closeBundle',
          force: true,
        }),
      ],
    } as RollupOptions),
);
