class User 
	include Mongoid::Document
	field :email, type: String
	field :tracker_token, type: String
	field :_id, type: String, default: ->{ email }
end
