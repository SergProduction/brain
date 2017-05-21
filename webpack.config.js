var path = require("path");

module.exports = {
  entry: {
    game: ["./index.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/public/",
    filename: "[name].js"
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 9000,
    watchContentBase: true
  }
};