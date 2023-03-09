class Api::BoardsController < ApplicationController
    # before_action :require_logged_in, only: [:index, :create, :destroy, :update]
    
    def index
        # debugger
        @boards = Board.all
        # render :index
    end

    def show
        @board = Board.find_by(id: params[:id])
        render :show
    end

    def create
        @board = Board.new(board_params)
        if @board
            @board.save
            render :show
        else
            render json: {error: "Board must include a title"}
        end
    end
    
    def destroy
        @board = Board.find(params[:id])
        @board.delete
    end

    def update
        @board.find(params[:id])
        if @board.update(board_params) 
            render :show
        else
            render json: {error: "Unable to update board"}
        end
    end

    private 

    def board_params
        params.require(:board).permit(:title, :description, :secret, :user_id)
        #do I add created at/updated at
    end
end
