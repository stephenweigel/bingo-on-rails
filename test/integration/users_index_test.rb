require 'test_helper'

class UsersIndexTest < ActionDispatch::IntegrationTest
  def setup
  	@admin = users(:stephen)
    @non_admin = users(:kerry)
  end

  test "admin can view user index including pagination and delete links" do
  	log_in_as(@admin)
  	get users_path
  	assert_template 'users/index'
  	assert_select 'div.pagination'
    first_page_of_users = User.paginate(page: 1)
  	User.paginate(page: 1).each do |user|
  		assert_select 'a[href=?]', user_path(user), text: user.name
      unless user == @admin
        assert_select 'a[href=?]', user_path(user), text: 'delete'
      end
  	end
    assert_difference 'User.count', -1 do
      delete user_path(@non_admin)
    end
  end

  test "non-admin users get redirected to the root_url when trying to view user index" do
    log_in_as(@non_admin)
    get users_path
    assert_redirected_to root_url
  end

  test "non logged-in users get redirected to the login_url when trying to view user index" do
    get users_path
    assert_redirected_to login_url
  end
end
