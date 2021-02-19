const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/src/index.html",
});

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: "./client/src/index.js",
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                ["@babel/transform-class-properties"],
              ],
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-es2015",
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [htmlPlugin, new webpack.DefinePlugin(envKeys)],
  };
};
