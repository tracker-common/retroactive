cd ./client
rm node_modules/react-tabs/lib/helpers/styles.js
rm node_modules/react-modal-dialog/lib/ModalDialog.js
rm node_modules/react-modal-dialog/lib/CloseCircle.js
cp build/styles.js node_modules/react-tabs/lib/helpers/styles.js
cp build/ModalDialog.js node_modules/react-modal-dialog/lib/ModalDialog.js
cp build/CloseCircle.js node_modules/react-modal-dialog/lib/CloseCircle.js
./scripts/build-prod.sh
cd ..