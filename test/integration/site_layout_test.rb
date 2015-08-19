require 'test_helper'

class SiteLayoutTest < ActionDispatch::IntegrationTest
  
  def setup
  	@admin = users(:stephen)
  	@non_admin = users(:kerry)
  end


  test "layout links" do
  	get root_path
  	assert_template 'static_pages/home'
  	assert_select "a[href=?]", root_path, count: 2
  	assert_select "a[href=?]", about_path
  	assert_select "a[href=?]", help_path
  end

  test "admin should see users index link" do
  	log_in_as(@admin)
  	get root_path
  	assert_select "a[href=?]", users_path
  end

  test "non-admin should not see users index link" do
  	log_in_as(@non_admin)
  	get root_path
  	assert_select "a[href=?]", users_path, count: 0
  end

end
