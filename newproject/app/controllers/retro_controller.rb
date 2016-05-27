
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
end