class Api::PinsController < ApplicationController
    before_action :require_logged_in, only: [:create, :destroy, :update]
    wrap_parameters include: Pin.attribute_names + ['altText', 'destinationLink'] + [:photo]

    def index
        # debugger
        @pins = Pin.all
    end

    def show
        @pin = Pin.find(params[:id])
        # debugger
        render :show
    end

    def create
        # debugger
        @pin = Pin.new(pin_params)
        @pin.user_id = current_user.id
        if @pin.save
            render :show
        else
            render json: {errors: 'you fucked up boi'}
        end
    end

    def destroy
        @pin = Pin.find(params[:id])
        if @pin 
            delete @pin
        else
            render json: {errors: 'pin not found'}
        end
    end

    def update
        @pin = Pin.find(params[:id])
        if @pin.update(pin_params)
            render :show
        else
            render json: {errors: "couldn't update pin"}
        end
    end

    private 

    def pin_params
        params.require(:pin).permit(:title, :description, :alt_text, :destination_link, :photo)
    end
end
