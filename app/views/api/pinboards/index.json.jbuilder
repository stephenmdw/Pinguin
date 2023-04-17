@pinboards.each do |pinboard|
    json.set! pinboard.id do 
        json.extract! pinboard, :id, :pin_id, :board_id
    end
end