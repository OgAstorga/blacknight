const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || "localhost";

module.exports = {
  // Environment mode
  mode: "development",

  // Entry point of app
  entry: resolveAppPath("src"),

  devServer: {
    contentBase: resolveAppPath("public"),
    hot: true,
    host,
    port: 3000,
    publicPath: "/",
  },

  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath("public/index.html"),
    }),
  ],
};
