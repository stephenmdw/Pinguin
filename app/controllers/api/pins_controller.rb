class Api::PinsController < ApplicationController
    # before_action :require_logged_in, only: [:create, :destroy, :update]
    wrap_parameters include: Pin.attribute_names + ['altText', 'destinationLink', 'photo']

    def index
        # debugger
        @pins = Pin.all
    end

    def show
        @pin = Pin.find(params[:id])
        @user = User.find_by(id: @pin.user_id)
        # debugger
        render :show
    end

    def create
        # debugger    
        pin_params2 = {}
        pin_params.each do |k, v|
            unless k == 'photo'
                pin_params2[k] = v
            end
        end

        if pin_params[:photo] == "null"
            pin_params2[:photo] = nil
        else 
            pin_params2[:photo] = pin_params[:photo]
        end

        @pin = Pin.new(pin_params2)
        @pin.user_id = current_user.id
        if @pin.save
            render :show
        else
            render json: @pin.errors.full_messages, status: 422
            # render json: {errors: 'Pin requires a title and photo'}, status: 422
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
