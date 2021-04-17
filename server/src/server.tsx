import React from "react";
import ReactDOMServer from "react-dom/server";
import styled, { ServerStyleSheet, css } from "styled-components";

const express = require("express");

const app = express();

const Label = styled.label<{ css?: any }>`
  color: blue;
`;

app.get("*", (request, response) => {
  response.send(
    ReactDOMServer.renderToString(
      <>
        <Label
          css={css`
            color: red;
          `}
        >
          blue
        </Label>
        <Label>red</Label>
      </>
    )
  );
});

app.listen(3002, () => {
  console.info("listening to 3002");
});
