#have ruby 2.3.0 installed
cd ../
npm install
npm install webpack -g
cd ../../newproject
gem install bundler
bundle install
rake db:create
rake db:migrate
./build_client.sh
rails s
