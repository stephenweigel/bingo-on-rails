class UserMailer < ApplicationMailer

  def account_activation(user)
    @user = user
    mail to: user.email, subject: "Bingo on Rails account activation"
  end

  def password_reset(user)
    @greeting = "Hi"

    mail to: "to@example.org"
  end
end
