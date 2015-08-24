class GamesController < ApplicationController
	require 'assets/bingo'

  def new
  end

  def print_cards
  	bingo = ::Bingo.new(game_params[:players].to_i)
    session[:current_game] = bingo
  	bingo.distribute_cards(game_params[:cards].to_i)
  	@cards_per_player = game_params[:cards].to_i
  	@players = bingo.players
  	@player_array =  @players.map { |p| [p.name, "#{p.css_id}Card"] }
  end

  def show
    @current_game = session[:current_game]
    session[:current_game] = nil
  end


  private

  	def game_params
  		params.require(:bingo).permit(:players, :cards, :game_speed)
  	end

end
