class Api::PinsController < ApplicationController
    before_action :require_logged_in, only: [:create, :destroy, :update]
    def index
        @pin = Pin.all
    end

    def show
        @pin = Pin.find_by(params[:id])
        render :show
    end

    def create
        @pin = Pin.new(pin_params)
        if @pin
            @pin.save
            render :show
        else
            render json: {errors: 'you fucked up boi'}
        end
    end

    def destroy
        @pin = Pin.find_by(params[:id])
        if @pin 
            delete @pin
        else
            render json: {errors: 'pin not found'}
        end
    end

    def update
        @pin = Pin.find_by(params[:id])
        if @pin.update(pin_params)
            render :show
        else
            render json: {errors: "couldn't update pin"}
        end
    end

    private 

    def pin_params
        require(:pin).permit(:title, :description, :alt_text, :destination_link)
        #do i need to include created_at, updated_at, user_id, and board_id?
    end
end
