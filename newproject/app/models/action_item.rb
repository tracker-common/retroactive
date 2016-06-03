class ActionItem
  include Mongoid::Document
  field :text, type: String
  field :retro_item_id, type: String
  field :tracker_status, type: String
  field :tracker_action_id, type: Integer
  embedded_in :retro
end
