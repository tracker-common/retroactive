#!/bin/bash

rm build/index.html
rm build/favicon.png
rm build/app.css

cp index.dev.html build/index.html
cp favicon.png build/favicon.png
cp app/app.css build/app.css


webpack-dev-server --devtool eval --progress --colors --hot --content-base build
