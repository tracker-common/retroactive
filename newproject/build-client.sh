cd ./client
rm node_modules/react-tabs/lib/helpers/styles.js
cp build/styles.js node_modules/react-tabs/lib/helpers/styles.js
./scripts/build-prod.sh
cd ..