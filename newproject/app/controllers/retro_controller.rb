
class RetroController < ActionController::Base
	def create
		@newRet = Retro.new
		@newRet.project_id = params[:id]
		@newRet.project_name = params[:name]
		@newRet.created_on = DateTime.now.to_date
		@newRet.retro_items = nil;
		@newRet.save

		render json: @newRet
	end

	def get
		id = params[:retroId]
		retro = Retro.find(id)
		render json: retro
	end

	def addItem
		id = params[:retroId]
		retro = Retro.find(id)
		column = params[:column].to_i
		text = params[:text]
		# @additem = RetroItem.new
		# @additem.text = text
		# @additem.retro_id = retro._id
		# @additem.save
		#retro.items[column].unshift(@additem)
		retro.retro_items.build(text: text, column: column)
		retro.save

		render json: retro
	end

	def editItem
		retro_id = params[:retroId]
		id = params[:item]
		retro = Retro.find(retro_id)
		item = retro.retro_items.find(id)

		text = params[:text]
		# @additem = RetroItem.new
		# @additem.text = text
		# @additem.retro_id = retro._id
		# @additem.save
		#retro.items[column].unshift(@additem)
		item.text = text
		item.save
		retro.save

		render json: retro
	end


	def newAction
		retro_id = params[:retroId]
		retro_item_id = params[:item]
		retro = Retro.find(retro_id)
		retro_item = retro.retro_items.find(retro_item_id)


		text = params[:text]

		action_item = retro.action_items.build(text: text, retro_item_id: retro_item_id)
		retro_item.action_item_id = action_item._id

		retro_item.save
		retro.save

		render json: retro
	end
end