class Vote
  include Mongoid::Document
  field :user_email, type: String
end
