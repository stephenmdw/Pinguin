class Api::BoardsController < ApplicationController
    # before_action :require_logged_in, only: [:index, :create, :destroy, :update]
    wrap_parameters include: Board.attribute_names + ['userId']

    def index
        # debugger
        @boards = Board.all
        # render :index
    end

    def show
        @board = Board.find_by(id: params[:id])
        @user = User.find_by(id: @board.user_id)
        render :show
    end

    def create
        @board = Board.new(board_params)
        if @board.save
            render :show
        else
            render json: {error: "Board must include a title"}, status: 422
        end
    end
    
    def destroy
        @board = Board.find(params[:id])
        @board.delete
    end

    def update
        @board = Board.find(params[:id])
        @user = User.find_by(id: @board.user_id)
        if @board.update(board_params) 
            render :show
        else
            render json: {error: "Unable to update board"}
        end
    end

    private 

    def board_params
        params.require(:board).permit(:title, :secret, :user_id)
        #do I add created at/updated at
    end
end
