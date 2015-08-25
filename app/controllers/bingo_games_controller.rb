class BingoGamesController < ApplicationController
  require 'assets/bingo'
  before_action :logged_in_user, only: [:index, :update]

  def index
  	@bingo_games = BingoGame.where(user_id: current_user.id) || []
  end

  def show
    @current_game = BingoGame.find(params[:id])
  end

  def new
  	@BingoGame = BingoGame.new
  end

  def create
  	new_game = Bingo.new(game_params[:num_players].to_i)
  	new_game.distribute_cards(game_params[:cards_per_player].to_i)
  	game_info = {
  		num_players: game_params[:num_players].to_i,
  		cards_per_player: game_params[:cards_per_player].to_i,
  		call_cycle: game_params[:call_cycle].to_i * 1000,
  		players: new_game.players
  	}
  	bingo_game = BingoGame.create(game_info)
  	if ( bingo_game ) 
      flash[:success] = "Game successfully created."
  		redirect_to "/print-cards/#{bingo_game.id}"
  	else
      flash[:danger] = "There was an error creating your game."
  		redirect_to root_url
  	end
  end


  def update
    game = BingoGame.find(params[:id])
    game[:user_id] = current_user.id
    game[:called_numbers] = params[:called_numbers]
    if ( game.save )
      flash[:success] = "Your game was saved successfully."
      redirect_to bingo_game_path(params[:id])
    else
      flash[:danger] = "There was an error saving your game."
      redirect_to bingo_game_path(params[:id])
    end

  end

  def destroy
    if ( BingoGame.find(params[:id]).destroy ) 
      flash[:success] = "The game was successfully deleted."
      redirect_to bingo_games_path
    else
      flash[:danger] = "An error has occurred."
      redirect_to bingo_games_path
    end
  end
 

  def print_cards
    @current_game = BingoGame.find(params[:id])
    @players = @current_game.players
    @player_array = @players.map { |p| [p.name, "#{p.css_id}Card"] }
    @cards_per_player = @current_game.cards_per_player
  end


  private

  	def game_params
  		params.require(:bingo_game).permit(:num_players, :cards_per_player,
                                         :call_cycle, :called_numbers)
  	end

end
