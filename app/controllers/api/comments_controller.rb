class Api::CommentsController < ApplicationController
    wrap_parameters include: Comment.attribute_names + ['pinId', 'commenterId']
    
    def index 
        @comments = Comment.all 
        render :index
    end
    
    def show 
        @comment = Comment.find(params[:id])        
        @user = User.find_by(id: @comment.commenter_id)
        render :show 
    end
    
    def create 
        @comment = Comment.new(comment_params)
        @comment.commenter_id = current_user.id
        @user = User.find(@comment.commenter_id)
        if @comment.save
            render :show 
        else 
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        if @comment 
            @comment.destroy
        else
            render json: {errors: 'comment not found'}
        end
    end

    def update
        @comment = Comment.find(params[:id])
        if @comment.update(comment_params)
            @user = User.find_by(id: @comment.commenter_id)
            render :show
        else 
            render json: {errors: "Couldn't update comment"}, status: 422
        end
    end

    private 

    def comment_params
        params.require(:comment).permit(:body, :pin_id, :commenter_id)
    end
    
end
