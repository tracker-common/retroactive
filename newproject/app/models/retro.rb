class Retro
  include Mongoid::Document
  embeds_many :retro_items, cascade_callbacks: true
  embeds_many :action_items, cascade_callbacks: true
  field :project_name, type: String
  field :project_id, type: Integer
  field :created_on, type: Date
end
