@boards.each do |board|
    json.set! board.id do
        json.extract! board, :id, :title, :description, :secret, :user_id, :created_at, :updated_at
    end
end