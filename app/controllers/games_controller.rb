class GamesController < ApplicationController
  def new
  end

  def show
  	@setup = game_params
  end


  private

  	def game_params
  		params.require(:bingo).permit(:players, :game_speed)
  	end
end
