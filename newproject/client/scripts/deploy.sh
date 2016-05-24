#!/bin/bash

echo "DEPLOY!"
npm run build-prod
cf push -b staticfile_buildpack pivotskillz -m 64M
