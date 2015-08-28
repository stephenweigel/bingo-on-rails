require "rails_helper"

RSpec.feature "User Signup", type: :feature do

	scenario "invalid signup information" do
		visit signup_path
		expect { click_button "Create my account" }.to change{User.count}.by(0)
		expect(page).to have_selector('div#error_explanation')
		expect(page).to have_selector('div.field_with_errors')
	end

	scenario "valid signup information with account activation" do
		# Sign up
		visit signup_path
		fill_in 'Name', with: "John Doe"
		fill_in 'Email', with: "johndoe@example.com"
		fill_in 'Password', with: "password"
		fill_in 'Confirmation', with: "password"
		expect {click_button "Create my account"}.to change{User.count}.by(1)
		expect(page).to have_content('Please check your email')
		expect(ActionMailer::Base.deliveries.size).to eq(1)

		# Try to log in before activation
		log_in
		expect(page).to have_content('activation link')

		# Try to log in after activation
		User.find_by(email: "johndoe@example.com").update_attribute(:activated, 
																	  true)
		log_in
		expect(page).to_not have_content('activation link')

	end

	def log_in
		visit login_path
		fill_in "Email", with: "johndoe@example.com"
		fill_in "Password", with: "password"
		click_button "Log in"
	end

end