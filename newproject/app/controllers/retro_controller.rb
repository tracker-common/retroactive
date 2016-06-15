
class RetroController < ActionController::Base
	def create
		@newRet = Retro.new
		@newRet.project_id = params[:id]
		@newRet.project_name = params[:name]
		@newRet.created_on = DateTime.now
		@newRet.retro_items = nil
		@newRet.version = 0
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
		retro.retro_items.build(text: text, column: column)
		retro.version += 1
		retro.save

		render json: retro
	end

	def editItem
		retro_id = params[:retroId]
		id = params[:item]
		retro = Retro.find(retro_id)
		item = retro.retro_items.find(id)

		text = params[:text]
		item.text = text
		item.save
		retro.version += 1
		retro.save

		render json: retro
	end

	def editAction
		retro_id = params[:retroId]
		id = params[:item]
		retro = Retro.find(retro_id)
		item = retro.action_items.find(id)

		text = params[:text]
		item.text = text
		item.save
		retro.version += 1
		retro.save

		render json: retro
	end


	def newAction
		retro_id = params[:retroId]
		retro_item_id = params[:item]
		retro = Retro.find(retro_id)
		retro_item = retro.retro_items.find(retro_item_id)


		text = params[:text]
		tracker_id = params[:tracker_action_id]

		action_item = retro.action_items.build(text: text, retro_item_id: retro_item_id, tracker_action_id: tracker_id)
		retro_item.action_item_id = action_item._id

		retro_item.save
		action_item.save
		retro.version += 1
		retro.save

		render json: action_item
	end

	def deleteAction
		retro_id = params[:retroId]
		actionItemId = params[:item]


		ret = Retro.find(retro_id)
		actionItem = ret.action_items.find(actionItemId)

		begin
		#set the reto_item's associated action item to null
			retroItem = ret.retro_items.where(action_item_id: actionItemId).first
			retroItem.action_item_id = nil
			retroItem.save

		rescue
		end

		actionItem.delete
		ret.version += 1
		ret.save

		render status: 200, json: {}
	end

	def deleteRetroItem
		retro_id = params[:retroId]
		retro_item_id = params[:item]
		ret = Retro.find(retro_id)
		ret.version += 1
		ret.save
		retro_item = ret.retro_items.find(retro_item_id)

		retro_item.delete

		render status: 200, json: {}

	end

	def delete
		retro_id = params[:retroId]
		ret = Retro.find(retro_id)
		ret.delete
		render status: 200, json: {}
	end

	def addVote
		@retro_id = params[:retroId]
		@ret = Retro.find(@retro_id)
		
		@email = params[:email]
		@user = User.where(email: @email).first
		
		@itemId = params[:item]
		@item = @ret.retro_items.find(@itemId)

		#Look for a vote with the current username

		@votes = @item.votes.where(user_email: @email)
		
		if(@votes.size > 0)
			render json: @ret.retro_items
		else
			@item.votes.build(user_email: @user.email)
			@item.save
			@ret.version += 1
			@ret.save
			render json: @ret.retro_items
		end

		
	end

	def removeVote
		@retro_id = params[:retroId]
		@ret = Retro.find(@retro_id)
		
		@email = params[:email]
		@user = User.where(email: @email).first
		
		@itemId = params[:item]
		@item = @ret.retro_items.find(@itemId)

		#Look for a vote with the current username

		@item.votes.where(user_email: @email).delete
		@item.reload
		puts "Count: " + @item.votes.where(user_email: @email).length.to_s

		@ret.reload
		@ret.version += 1
		@ret.save

		render json: @ret.retro_items
	end

	def getVersion
		retro = Retro.find(params[:retroId])

		returnObject = {
			"version" => retro.version
		}

		render json: returnObject
	end
end