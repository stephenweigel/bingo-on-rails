require "rails_helper"

RSpec.feature "User Index", type: :feature do

	scenario "admin can view user index including pagination and delete links" do
		admin = FactoryGirl.create(:admin_user)
		visit login_path
		fill_in "Email", with: admin.email
		fill_in "Password", with: admin.password
		click_button "Log in"
		visit users_path
		expect(page.current_path).to eq users_path
		User.paginate(page: 1).each do |user|
			expect(page).to have_link(user.name, user_path(user))
			unless user == admin
				expect(page).to have_link('delete', user_path(user))
			end
		end

	end

	scenario "non-admin users get redirected to the root_url" do
		non_admin = FactoryGirl.create(:non_admin_user)
		visit login_path
		fill_in "Email", with: non_admin.email
		fill_in "Password", with: non_admin.password
		click_button "Log in"
		visit users_path
		expect(page.current_path).to eq root_path
	end

	scenario "non-logged-in users get redirect to the login_url" do
		visit users_path
		expect(page.current_path).to eq login_path
	end

end