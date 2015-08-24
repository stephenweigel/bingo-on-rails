class AddCalledNumbersToBingoGame < ActiveRecord::Migration
  def change
    add_column :bingo_games, :called_numbers, :text
  end
end
