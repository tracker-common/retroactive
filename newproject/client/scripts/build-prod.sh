#!/bin/bash

rm build/index.html
rm build/favicon.png
rm build/app.css

cp index.prod.html build/index.html
cp favicon.png build/favicon.png
cp app/app.css build/app.css

webpack --config webpack.production.config.js

cp build/bundle.js ../app/assets/javascripts/bundle.js
