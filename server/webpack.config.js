/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'node',
  entry: './src/server.ts',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'server.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.bundle\.ts$/,
        use: {
          loader: 'bundle-loader',
          options: {
            name: '[name]',
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.scss$/,
        use: 'null-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })],
};
