class RetroItem
  include Mongoid::Document
  field :text, type: String
  field :column, type: Integer
  field :action_item_id, type: String
  embedded_in :retro
end
