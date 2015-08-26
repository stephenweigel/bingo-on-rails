require 'test_helper'

class BingoGameTestTest < ActionDispatch::IntegrationTest

  test "invalid form submissions" do
  	get new_game_path
  	assert_template 'bingo_games/new'
  	assert_select 'form#new_bingo_game'
  	# Less than 2 players
  	assert_no_difference "BingoGame.count" do
  		post bingo_games_path, bingo_game: { num_players: 1,
  											 cards_per_player: 9,
  											 call_cycle: 3 }
  	end
  	assert_template 'bingo_games/new'
  	assert_select 'div#error_explanation'
  	# Less than 2 second call_cycle
  	assert_no_difference "BingoGame.count" do
  		post bingo_games_path, bingo_game: { num_players: 4,
  											 cards_per_player: 9,
  											 call_cycle: 1}
  	end
  	assert_template 'bingo_games/new'
  	assert_select 'div#error_explanation'

  end
  
  test "valid form submission" do
  	get new_game_path
  	assert_difference "BingoGame.count" do
  		post bingo_games_path, bingo_game: { num_players: 3,
  											 cards_per_player: 9,
  											 call_cycle: 3 }
  	end
  	follow_redirect!
  	assert_not flash.empty?
  	assert_template 'bingo_games/print_cards'
  	assert_select 'table.playerCard', count: 27
  	assert_select "a[href=?]", bingo_game_path
  end
end
