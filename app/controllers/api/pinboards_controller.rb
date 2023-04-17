class Api::PinboardsController < ApplicationController
    wrap_parameters include: Pinboard.attribute_names + ['pinId', 'boardId']

    # def show 
    #     @pinboard = Pinboard.find_by(pin_id: pinboard_params[:pin_id], board_id: pinboard_params[:board_id] )
    #     render :show
    # end
    
    def create
        @pinboard = Pinboard.new(pinboard_params)
        @pin = Pin.find_by(id: pinboard_params[:pin_id])
        if @pinboard.save
            render json: {message: 'added pin to board'}
        else
            render json: @pinboard.errors.full_messages, status: 422
        end
    end
    
    def destroy 
        @pinboard = Pinboard.find_by(pin_id: params[:pin_id], board_id: params[:board_id])
        if @pinboard
            @pinboard.destroy
            return @pinboard.id
        else
            render json: {errors: "couldn't delete association"}
        end
    end

    private

    def pinboard_params
        params.require(:pinboard).permit(:pin_id, :board_id)
    end
end
