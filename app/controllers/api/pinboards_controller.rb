class Api::PinboardsController < ApplicationController
    def create
        @pinboard = Pinboard.new(pinboard_params)
        @pin = Pin.find_by(id: pinboard_params[:pin_id])
        if @pinboard.save
            @pin
            render :show
        else
            render json: @pinboard.errors.full_messages, status: 422
        end
    end
    
    def destroy 
        @pinboard = Pinboard.find_by(id: params[:id])
        if @pinboard
            @pinboard.destroy
        else
            render json: {errors: `couldn't delete association`}
        end
    end

    private

    def pinboard_params
        params.require(:pinboard).permit(:pin_id, :board_id)
    end
end
