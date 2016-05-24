require 'json'
class WelcomeController < ApplicationController
  def index
    client = Mongo::Client.new('mongodb://retroactive_app:P1votal_FS@ds025792.mlab.com:25792/CloudFoundry_tpvig3j7_3th6669f')

    documents = client["Retros"].find()
    documents.each do |document|
      #=> Yields a BSON::Document.
      puts document;
      json_obj = document;
      data_json = JSON.parse(document.to_json, object_class: OpenStruct);
      @data = data_json.date
      @date = /(?<month>[A-Za-z]{3})\s(?<day>[0-9]{0,2})\s(?<year>[0-9]{4})/.match(@data);
      puts "HELLO I AM HERE \n\n\n\n"
      puts @month
    end

    def converMonthToNum
      
    end
  end
end