FactoryGirl.define do
	factory :admin_user, class: User do
		name "John Doe"
		email "johndoe@example.com"
		password "password"
		admin true
		activated true
	end

	factory :non_admin_user, class: User do
		name "Jane Doe"
		email "janedoe@example.com"
		password "password"
		admin false
		activated true
	end

end