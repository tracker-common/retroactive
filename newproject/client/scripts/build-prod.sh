#!/bin/bash

rm build/index.html
rm build/app.css

cp index.prod.html build/index.html
cp app/app.css build/app.css

webpack --config webpack.production.config.js

cp build/bundle.js ../app/assets/javascripts/bundle.js
