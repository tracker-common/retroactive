
class RetroController < ActionController::Base
	def create
		@newRet = Retro.new
		@newRet.project_id = params[:id]
		@newRet.project_name = params[:name]
		@newRet.created_on = DateTime.now.to_date
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
end