class CreateBingoGames < ActiveRecord::Migration
  def change
    create_table :bingo_games do |t|
      t.integer :user_id 
      t.integer :num_players
      t.integer :cards_per_player
      t.integer :call_cycle
      t.text :players, array: true, default: []

      t.timestamps null: false
    end
  end
end
