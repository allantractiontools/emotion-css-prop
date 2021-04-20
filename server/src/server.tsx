import React from "react";
import ReactDOMServer from "react-dom/server";
import styled, { ServerStyleSheet, css } from 'styled-components'
const express = require("express");

const app = express();

const StyledDiv = styled.div`border: 1px solid red;`

const App = () => {
  return (
    <>
      <StyledDiv />
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

  const ss = new ServerStyleSheet()
  const htmlString = ReactDOMServer.renderToString(ss.collectStyles(<App />))

  response.send(`
  <html>
  <head>${ss.getStyleTags()}</head>
  <body><div id="root">${htmlString}</div></body>
  </html>
  `);
});

app.listen(3005, () => {
  console.info("listening to 3005");
});
