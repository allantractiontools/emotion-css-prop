const root = require("app-root-path").path;
const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: `${root}/server/src/server.jsx`,
  target: "node",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".jsx", ".js"],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
              plugins: [
                [
                  "babel-plugin-styled-components",
                  {
                    cssProp: true,
                    ssr: true,
                    displayName: true,
                    fileName: false,
                    transpileTemplateLiterals: false,
                  },
                ],
                //  [
                //   require.resolve("babel-plugin-css-prop"),
                //   {
                //     displayName: true,
                //     fileName: false,
                //     ssr: true,
                //     cssProp: true,
                //     transpileTemplateLiterals: false,
                //   },
                // ],
                // [
                //   require.resolve("babel-plugin-styled-components"),
                //   {
                //     displayName: true,
                //     fileName: false,
                //     ssr: true,
                //     cssProp: true,
                //     transpileTemplateLiterals: false,
                //   },
                // ],
              ],
            },
          },
          // "ts-loader",
        ],
      },
    ],
  },
};
