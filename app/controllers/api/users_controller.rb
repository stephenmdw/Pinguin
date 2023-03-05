class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:show]
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    if @user.save
        login!(@user)
        render :show # have to create jbuilder file for this
    else
        render json: @user.errors.full_messages, status: 422
    end
  end

  # def show
  #   @user = User.find(params[:id])
  #   render :show
  # end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
