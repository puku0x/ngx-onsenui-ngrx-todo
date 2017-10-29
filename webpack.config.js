const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  // Plugins
  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), './src/index.html'),
      filename: path.join(process.cwd(), './www/index.html'),
    }),
    new webpack.ProvidePlugin({
      ons: 'onsenui',
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(process.cwd(), './src'), {}
    ),
  ];

  // PostCSS
  const postcssPlugins = () => {
    autoprefixer
  }

  // Build config
  const config = {
    entry: {
      'main': ['./src/polyfills.ts', './src/main.ts'],
      'styles': ['./src/styles.scss'],
    },
    output: {
      path: path.join(process.cwd(), 'www'),
      filename: '[name].bundle.js',
      chunkFilename: '[id].chunk.js'
    },
    devtool: false,
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: plugins,
    module: {
      rules: [
        {
          include: path.join(process.cwd(), './src/styles.scss'),
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: postcssPlugins
              }
            },
            'sass-loader'
          ]
        }, {
          test: /\.component\.scss$/,
          use: [
            'raw-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: postcssPlugins
              }
            },
            'sass-loader'
          ]
        }, {
          test: /\.html$/,
          use: ['html-loader']
        }, {
          test: /\.(eot|svg)$/,
          use: ['file-loader?name=[name].[ext]']
        }, {
          test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
          use: ['url-loader?name=[name].[ext]']
        }, {
          test: /\.ts$/,
          use: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
      ]
    }
  }

  return config;
}
