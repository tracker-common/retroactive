class RetroItem
  include Mongoid::Document
  field :text, type: String
  field :column, type: Integer
  embedded_in :retro
end
