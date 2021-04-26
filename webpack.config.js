const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './client/source/index.html'
});

module.exports = {
  entry: './client/source/index.tsx',
  output: {
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }      
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.mjs', '.tsx', '.ts', '.js'],
  },  
  plugins: [htmlPlugin]
};