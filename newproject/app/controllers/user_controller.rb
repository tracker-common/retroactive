require 'uri'

class UserController < ActionController::Base
	def check
		@email = params[:email]


		#begin .. rescue == try .. catch
		begin
			@user = User.find(@email)
		rescue
			@user = 0
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
end