require "rails_helper"

RSpec.feature "User Login", type: :feature do

	scenario "log in with invalid information" do
		visit root_path
		click_link 'Log in'
		expect(page.current_path).to eq login_path
		click_button 'Log in'
		expect(page.current_path).to eq login_path
		expect(page).to have_content("Invalid email/password")
	end

	scenario "log in with valid information followed by logout" do
		valid_login
		expect(page.current_path).to eq bingo_games_path
		expect(page).to_not have_link('Log in', login_path)
		expect(page).to have_link('Log out', logout_path)

		# log out
		click_link "Log out"
		expect(page.current_path).to eq root_path
		expect(page).to have_link('Log in', login_path)
		expect(page).to_not have_link('Log out', logout_path)
	end

	def valid_login
		user = FactoryGirl.create(:non_admin_user)
		visit root_path
		click_link "Log in"
		fill_in "Email", with: user.email
		fill_in "Password", with: user.password
		click_button "Log in"
	end

end