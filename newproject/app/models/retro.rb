class Retro
  include Mongoid::Document
  field :project_name, type: String
  field :project_id, type: Integer
  field :created_on, type: Date

end
