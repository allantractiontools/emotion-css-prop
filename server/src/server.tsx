import React from "react";
import ReactDOMServer from "react-dom/server";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";

const express = require("express");

const app = express();

const App = () => {
  return (
    <>
      <div
        css={css`
          color: red;
        `}
      >
        blue
      </div>
    </>
  );
};

app.get("*", (_, response) => {
  const key = "custom";
  const cache = createCache({ key });
  const { extractCritical, renderStylesToString } = createEmotionServer(cache);

  let element = (
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  );
  console.log(ReactDOMServer.renderToString(element));

  let { html, css, ids } = extractCritical(
    ReactDOMServer.renderToString(element)
  );

  response.send(`
  <html>
  <head><style data-emotion="${key} ${ids.join(" ")}">${css}</style></head>
  <body><div id="root">${html}</div></body>
  </html>
  `);
});

app.listen(3005, () => {
  console.info("listening to 3002");
});
