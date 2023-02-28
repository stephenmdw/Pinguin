class Api::BoardsController < ApplicationController
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
        @board = Board.find_by(params[:id])
        @board.delete
    end

    def update
        
    end

    private 

    def board_params
        params.require(:board).permit(:title, :description, :secret, :user_id)
        #do I add created at/updated at
    end
end
