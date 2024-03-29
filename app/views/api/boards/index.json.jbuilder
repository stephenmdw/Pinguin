@boards.each do |board|
    json.set! board.id do
        json.extract! board, :id, :title, :description, :secret, :user_id, :created_at, :updated_at
        # json.pins board.pins, :id, :title
        json.pins do 
        board.pins.each do |pin|
            json.set! pin.id do
                json.extract! pin, :id, :title, :description, :alt_text, :destination_link, :user_id, :board_ids
                json.photoUrl pin.photo.url
            end
        end
    end
    end
end