const root = require("app-root-path").path;
const nodeExternals = require("webpack-node-externals");
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
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                "@emotion/babel-preset-css-prop",
              ],
              plugins: [
                [
                  "@emotion",
                  {
                    // sourceMap is on by default but source maps are dead code eliminated in production
                    sourceMap: true,
                    autoLabel: "dev-only",
                    labelFormat: "[local]",
                    cssPropOptimization: true,
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
          "ts-loader",
        ],
      },
    ],
  },
};
