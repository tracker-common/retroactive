class RetroItem
  include Mongoid::Document
  embeds_many :votes,  cascade_callbacks: true
  field :text, type: String
  field :column, type: Integer
  field :action_item_id, type: String
  field :created_on, type: DateTime
  embedded_in :retro
end
