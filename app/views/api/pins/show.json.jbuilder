json.pin do
    json.extract! @pin, :id, :title, :description, :alt_text, :destination_link, :created_at, :updated_at
end