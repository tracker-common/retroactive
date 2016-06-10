#have ruby 2.3.0 installed
cd ../
npm install
cd ../../newproject
bundle install
rake db:create
rake db:migrate
./build_client.sh
rails s
