const postcss = require('rollup-plugin-postcss');
const url = require('@rollup/plugin-url');
const cssUrl = require('postcss-url');
const svgr = require('@svgr/rollup');

module.exports = (config) => {
  const { plugins } = config;

  return {
    ...config,
    plugins: [
      ...plugins.filter((p) => p.name !== 'postcss'),

      // импорт файлов как dataURI
      url({ exclude: '**/*.svg' }),
      // Чтобы импорты SVG работали через ReactComponent
      url({ emitFiles: false, include: '**/*.svg' }),
      // Импорт svg как компонентов React
      svgr({
        ref: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                },
              },
            },
            'removeXMLNS',
          ],
        },
      }),
      // Обработка стилей
      postcss({
        extensions: ['.css', '.scss'],
        extract: true,
        modules: false,
        sourceMap: true,
        plugins: [
          // Инлайним все assets
          cssUrl({
            url: 'inline',
          }),
        ],
      }),
    ],
  };
};
