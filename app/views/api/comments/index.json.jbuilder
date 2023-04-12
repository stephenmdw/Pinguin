@comments.each do |comment|
    json.set! comment.id do
        json.extract! comment, :id, :body, :commenter_id, :pin_id
        json.user do 
            json.username comment.commenter.username
        end
    end
end