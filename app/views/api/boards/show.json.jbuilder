json.board do
    json.extract! @pin, :id, :title, :description, :secret, :user_id, :created_at, :updated_at
end