class UserMailer < ApplicationMailer

  def account_activation(user)
    @user = user
    mail to: user.email, subject: "Bingo on Rails account activation"
  end

  def password_reset(user)
    @user = user
    mail to: user.email, subject: "Bingo on Rails password reset"
  end
end
