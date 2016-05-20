class WelcomeController < ApplicationController
  def index
  	@count = Counter.find(0);
  end

  def increment
  	@count = Counter.find(0)
  	puts "step 1 \n"
  	#@count.count = @count.count +1;
  	puts @count.count.to_s
  	@count.count += 1;
  	puts "step 2 \n"
  	@count.save();
  	puts "step 3 \n"
  	render json: @count;
  end
end
