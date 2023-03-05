@pins.each do |pin|
    json.set! pin.id do
        json.extract! pin, :id, :title, :description, :alt_text, :destination_link

        json.photoUrl pin.photo.url
    end
end