const root = require("app-root-path").path;
const path = require("path");

module.exports = {
  entry: `${root}/server/src/server.tsx`,
  target: "node",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
              plugins: ["babel-plugin-styled-components"],
            },
          },
          "ts-loader",
        ],
      },
    ],
  },
};
