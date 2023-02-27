class Api::SessionsController < ApplicationController
  
  before_action :require_logged_in, only: [:destroy]
  before_action :require_logged_out, only: [:create]
  
  def show
    if current_user
      @user = current_user
      render `api/users/show`
      # render json: current_user
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])
    # @user = User.find_by_credentials(params[:credential], params[:password])
    if @user
      login!(@user)
      render 'api/users/show'
      # render json: @user
    else
      render json: { errors: ['The provided credentials were invalid.'] }, status: 422
    end
  end

  # def create
  #   # byebug 
  #   @user = User.find_by_credentials(params[:user][:credential], params[:session][:password])

  #   if @user
  #     login!(@user)
  #     render 'api/users/show'
  #     # render json: @user
  #   else
  #     render json: { errors: ['The provided credentials were invalid.'] }, status: 422
  #   end
  # end

  def destroy
    logout!
    # head :no_content
    render json: { messaage: 'success' }
  end

  # def user_params
  #   params.require(:user).permit(:email, :username, :password)
  # end
  
end
