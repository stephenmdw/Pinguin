json.pin do
    json.extract! @pin, :id, :title, :description, :alt_text, :destination_link, :created_at, :updated_at, :user_id, :board_ids
    json.photoUrl @pin.photo.url
end

#do block creates object