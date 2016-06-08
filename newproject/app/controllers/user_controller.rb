require 'uri'

class UserController < ActionController::Base
	def check
		@email = params[:email]

		#begin .. rescue == try .. catch
		begin
			@user = User.find(@email)
		rescue
			if (@email == nil)
				#maybe wrong??
				render 403
			else
				@user = 0
			end
		end

		if(@user == 0)
			@newUser = User.new
			@newUser.email = @email
			@newUser.tracker_token = nil
			@newUser._id = @email
			@newUser.save
			render json: @newUser
		else
			render json: @user
		end
	end

	def editToken
		@email = params[:email]
		@token = params[:token]

		@user = User.find(@email)

		@user.tracker_token = @token
		@user.save

		render json: @user
	end

	def getProjects
		projects = params[:projectIds]

		projects = projects.split(",")

		#the object to return
		return_obj = []

		projects.each do |project_id|
			#each project
			return_proj = {}

			return_proj[:project_id] = project_id

			begin
				retros = Retro.where(project_id: project_id).order(created_on: :asc)
			rescue
				retros = []
			end

			return_proj[:retros] = retros

			return_obj.push(return_proj)
		end

		render json: return_obj
	end
end