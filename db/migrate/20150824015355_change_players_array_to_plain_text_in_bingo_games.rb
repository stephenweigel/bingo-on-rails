class ChangePlayersArrayToPlainTextInBingoGames < ActiveRecord::Migration
  def change
  	remove_column :bingo_games, :players
  	add_column :bingo_games, :players, :text
  end
end
