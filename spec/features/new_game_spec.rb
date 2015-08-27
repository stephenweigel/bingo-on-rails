require "rails_helper"

RSpec.feature "New Game", type: :feature do

	scenario "User creates a new game" do
		visit new_game_path
		expect(page).to have_text("New Bingo Game")
		fill_in "Number of Players", with: 3
		fill_in "Seconds between calls", with: 3
		click_button "Start Game"
		expect(page).to have_text("Print Cards")
	end

end
