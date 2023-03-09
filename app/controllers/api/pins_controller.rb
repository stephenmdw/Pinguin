class Api::PinsController < ApplicationController
    # before_action :require_logged_in, only: [:create, :destroy, :update]
    wrap_parameters include: Pin.attribute_names + ['altText', 'destinationLink', 'photo']

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
            render json: @pin.errors.full_messages, status: 422
        end
    end

    def destroy
        @pin = Pin.find(params[:id])
        if @pin 
            @pin.destroy
        else
            render json: {errors: 'pin not found'}
        end
    end

    def update
        @pin = Pin.find_by(id: params[:id])
        if @pin.update(pin_params)
            render :show
        else
            render json: {errors: "couldn't update pin"}, status: 422
        end
    end

    private 

    def pin_params
        params.require(:pin).permit(:title, :description, :alt_text, :destination_link, :photo, :board_id)
    end
end
